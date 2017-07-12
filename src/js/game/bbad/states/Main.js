/* global Phaser */

import Distr from '../objs/Distr'
import Soccer from '../objs/Soccer'
import CardGroup from '../objs/CardGroup'

export default class Main extends Phaser.State {
  create() {
    this.isDrawing = false

    // distr
    this.game.distrFirstHost = new Distr(this.game, 12, 225, 0xb83636)
    this.game.add.existing(this.game.distrFirstHost)

    this.game.distrFirstGuest = new Distr(this.game, 514, 225, 0x4d79ca)
    this.game.add.existing(this.game.distrFirstGuest)

    // ball
    this.ball = new Soccer(this.game, this.game.world.centerX, 95)
    this.game.add.existing(this.ball)

    // CardGroup
    this.cardGroupHost = new CardGroup(this.game, 82, 86)
    this.game.add.existing(this.cardGroupHost)

    this.cardGroupGuest = new CardGroup(this.game, 438, 86)
    this.game.add.existing(this.cardGroupGuest)

    this.showMoney()
  }

  showMoney() {
    this.money = this.game.add.sprite(151, 6, 'money')
    const shining = this.money.animations.add('shine')
    shining.play(8, true)
    this.game.time.events.loop(750, () => {
      if (this.money.left === 151) {
        this.money.left = 508
      } else {
        this.money.left = 151
      }
    })
  }

  update() {
    if (this.game.cd.isCountingdown) {
      this.ball.stop()
      this.money.alpha = 0
    } else {
      this.ball.start()
      this.money.alpha = 1
    }
  }

  drawing(res) {
    if (this.isDrawing) return

    this.game.result = res
    this.ball.visible = false
    this.money.visible = false

    this.game.distrFirstHost.visible = false
    this.game.distrFirstGuest.visible = false

    this.cardGroupHost.drawingFirst(res.home)
    this.cardGroupGuest.drawingFirst(res.away).then(() => {
      this.state.start('RoundingTime')
    })

    this.isDrawing = true
  }
}
