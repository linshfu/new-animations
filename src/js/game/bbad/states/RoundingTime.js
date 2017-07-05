/* global Phaser */

import { get } from 'lodash'
import CardGroup from '../objs/CardGroup'
import Scoreboard from '../objs/Scoreboard'

export default class RoundingTime extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'RoundingTime', {
      fill: 'white'
    })

    this.isDrawing = false

    // CardGroup
    this.cardGroupHost = new CardGroup(this.game, 0, 0, this.game.result.host)
    this.game.add.existing(this.cardGroupHost)

    this.cardGroupGuest = new CardGroup(this.game, 400, 0, this.game.result.guest)
    this.game.add.existing(this.cardGroupGuest)

    // Scoreboard
    this.scoreboard = new Scoreboard(this.game, 254, -118)
    this.game.add.existing(this.scoreboard)

    this.resultImg = this.game.add.sprite(0, this.game.height, null)
  }

  showScoreboard(res) {
    return new Promise((resolve) => {
      this.scoreboard.setHostScore(get(res, 'host.shootresult'))
      this.scoreboard.setGuestScore(get(res, 'guest.shootresult'))

      const tween = this.game.add.tween(this.scoreboard).to({ y: 250 }, 250, Phaser.Easing.Exponential.Out)
      tween.onComplete.add(() => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
      tween.start()
    })
  }

  showResult(res) {
    return new Promise((resolve) => {
      this.resultImg.loadTexture(`${get(this.game, 'opt.lang')}_result_${res}`)

      const tween = this.game.add.tween(this.resultImg).to({ y: this.game.height - this.resultImg.height }, 250, Phaser.Easing.Exponential.Out)
      tween.onComplete.add(() => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      tween.start()
    })
  }

  async drawing(res) {
    if (this.isDrawing) return

    await this.cardGroupHost.drawingSecond(res.host)
    await this.cardGroupGuest.drawingSecond(res.guest)
    await this.showScoreboard(res)
    await this.showResult(get(res, 'winresult'))
    this.game.state.start('Main')

    this.isDrawing = true
  }
}
