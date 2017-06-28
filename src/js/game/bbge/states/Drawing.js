/* global Phaser */

import Actors from '../objs/Actors'
import Lake from '../objs/Lake'

export default class Drawing extends Phaser.State {
  create() {
    this.game.add.sprite(187, 120, 'ladder')

    // stone
    this.game.add.sprite(115, 132, 'stone_big')
    this.game.add.sprite(410, 242, 'stone_small')

    // lake
    this.lake = new Lake(this.game, 60, 148)
    this.game.world.add(this.lake)

    // bg
    this.game.add.sprite(0, 0, 'game_bg')
    this.game.add.sprite(187, 120, 'footsteps')
    this.game.add.sprite(115, 132, 'stone_big_top')

    this.actors = new Actors(this.game, this.game.opt.lang)

    this.game.distribution.updateAll({
      odd: 0,
      even: 0
    })
  }
}
