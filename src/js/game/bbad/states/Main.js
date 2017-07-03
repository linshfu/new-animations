/* global Phaser */

import Distr from '../objs/Distr'
import Soccer from '../objs/Soccer'
import Poker from '../objs/Poker'

export default class Main extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'main', {
      fill: 'white'
    })

    // distr
    this.game.distrFirstMaster = new Distr(this.game, 20, 150, 0xb83636, this.game.opt.distr.master)
    this.game.add.existing(this.game.distrFirstMaster)

    this.game.distrFirstGuest = new Distr(this.game, 650, 150, 0x4d79ca, this.game.opt.distr.guest)
    this.game.add.existing(this.game.distrFirstGuest)

    // ball
    this.ball = new Soccer(this.game, this.game.world.centerX, 100)
    this.game.add.existing(this.ball)

    // poker
    this.poker = new Poker(this.game, 300, 200)
    this.game.add.existing(this.poker)
  }
}
