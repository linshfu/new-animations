/* global Phaser */

import Distr from '../objs/Distr'
import Soccer from '../objs/Soccer'
import CardGroup from '../objs/CardGroup'
import Countdown from '../objs/Countdown'

export default class Main extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'main', {
      fill: 'white'
    })

    this.isDrawing = false

    // distr
    this.game.distrFirstHost = new Distr(this.game, 20, 150, 0xb83636, this.game.opt.distr.host)
    this.game.add.existing(this.game.distrFirstHost)

    this.game.distrFirstGuest = new Distr(this.game, 650, 150, 0x4d79ca, this.game.opt.distr.guest)
    this.game.add.existing(this.game.distrFirstGuest)

    // ball
    this.ball = new Soccer(this.game, this.game.world.centerX, 100)
    this.game.add.existing(this.ball)

    // CardGroup
    this.cardGroupHost = new CardGroup(this.game, 0, 0)
    this.game.add.existing(this.cardGroupHost)

    this.cardGroupGuest = new CardGroup(this.game, 400, 0)
    this.game.add.existing(this.cardGroupGuest)

    // Countdown
    this.countdown = new Countdown(this.game, 400, 0)
    this.game.add.existing(this.countdown)
  }

  drawing(res) {
    if (this.isDrawing) return

    this.ball.alpha = 0
    this.cardGroupHost.drawingFirst(res.host)
    this.cardGroupGuest.drawingFirst(res.guest).then(() => {
      console.log(res)
      this.state.start('RoundingTime')
    })

    this.isDrawing = true
  }

  countingDown(sec) {
    this.countdown.timingStarts(sec).then(() => {
      this.ball.start()
    })
    this.ball.stop()
  }
}
