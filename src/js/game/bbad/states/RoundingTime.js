/* global Phaser */

import { get } from 'lodash'
import CardGroup from '../objs/CardGroup'
import Scoreboard from '../objs/Scoreboard'
import CoinFlip from '../objs/CoinFlip'
import DistrRounding from '../objs/DistrRounding'

export default class RoundingTime extends Phaser.State {
  create() {
    this.game.cd.hide()
    this.isDrawing = false

    // CardGroup
    this.cardGroupHost = new CardGroup(this.game, 82, 86, this.game.result.home)
    this.game.add.existing(this.cardGroupHost)

    this.cardGroupGuest = new CardGroup(this.game, 438, 86, this.game.result.away)
    this.game.add.existing(this.cardGroupGuest)

    // Scoreboard
    this.scoreboard = new Scoreboard(this.game, 254, -118)
    this.game.add.existing(this.scoreboard)

    // CoinFlip
    this.coinFlip = new CoinFlip(this.game, 319, 150)
    this.game.add.existing(this.coinFlip)

    // DistrRounding
    this.distr = new DistrRounding(this.game, 250, 227, {
      home: 33, draw: 33, away: 33
    })
    this.game.add.existing(this.distr)

    this.resultImg = this.game.add.sprite(0, this.game.height, null)
  }

  showScoreboard(res) {
    return new Promise((resolve) => {
      this.scoreboard.setHostScore(get(res, 'home.shootresult'))
      this.scoreboard.setGuestScore(get(res, 'away.shootresult'))

      const tween = this.game.add.tween(this.scoreboard).to({ y: 186 }, 250, Phaser.Easing.Exponential.Out)
      tween.onComplete.add(() => {
        setTimeout(() => {
          resolve()
        }, 1500)
      })
      tween.start()
    })
  }

  hideScoreboard() {
    this.scoreboard.visible = false
  }

  showResult(res) {
    return new Promise((resolve) => {
      const mapping = {
        tie: 'draw',
        home: 'home',
        away: 'away'
      }
      this.resultImg.loadTexture(`${get(this.game, 'opt.lang')}_result_${mapping[res]}`)

      const tween = this.game.add.tween(this.resultImg).to({ y: this.game.height - this.resultImg.height }, 250, Phaser.Easing.Exponential.Out)
      tween.onComplete.add(() => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
      tween.start()
    })
  }

  async drawing(res) {
    if (this.isDrawing) return

    const firstkick = get(res, 'firstkick')

    this.distr.visible = false
    this.game.cd.hide()

    await this.coinFlip.flip(firstkick)

    if (firstkick === 'away') {
      await this.cardGroupGuest.drawingSecond(res.away)
      await this.cardGroupHost.drawingSecond(res.home)
    } else {
      await this.cardGroupHost.drawingSecond(res.home)
      await this.cardGroupGuest.drawingSecond(res.away)
    }

    await this.showScoreboard(res)
    this.hideScoreboard()
    await this.showResult(get(res, 'winresult'))

    this.isDrawing = true
  }
}
