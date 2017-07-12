/* global Phaser */

import Distr from '../objs/Distr'
import Soccer from '../objs/Soccer'
import CardGroup from '../objs/CardGroup'

export default class Main extends Phaser.State {
  create() {
    this.isDrawing = false

    // distr
    this.game.distrFirstHost = new Distr(this.game, 12, 225, 0xb83636, this.game.opt.distr.home)
    this.game.add.existing(this.game.distrFirstHost)

    this.game.distrFirstGuest = new Distr(this.game, 514, 225, 0x4d79ca, this.game.opt.distr.away)
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

  showMoneyPart() {
    this.money = this.game.add.sprite(151, 6, 'money')
    const shining = this.money.animations.add('shine')
    shining.onComplete.add(() => {
      if (this.money.left === 151) {
        this.money.left = 508
        shining.play(4, false)
      } else {
        this.money.visible = false
      }
    })
    shining.play(4, false)
  }

  showMoney() {
    this.showMoneyPart()

    this.game.time.events.loop(3000, () => {
      this.showMoneyPart()
    })
  }

  update() {
    if (this.game.cd.isCountingdown) {
      this.ball.stop()
    } else {
      this.ball.start()
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
