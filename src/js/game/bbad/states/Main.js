/* global Phaser */

import Distr from '../objs/Distr'

export default class Main extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'main', {
      fill: 'white'
    })

    this.game.distrFirstMaster = new Distr(this.game, 20, 200, 0xb83636, this.game.opt.distr.master)
    this.game.add.existing(this.game.distrFirstMaster)

    this.game.distrFirstGuest = new Distr(this.game, 200, 200, 0x4d79ca, this.game.opt.distr.guest)
    this.game.add.existing(this.game.distrFirstGuest)
  }
}
