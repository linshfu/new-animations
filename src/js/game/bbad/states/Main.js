/* global Phaser */

import ProgressBar from '../objs/ProgressBar'

export default class Main extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'main', {
      fill: 'white'
    })

    this.game.distr = new ProgressBar(this.game, 2, 100, this.game.opt.distr.odd)
    this.game.add.existing(this.game.distr)
  }
}
