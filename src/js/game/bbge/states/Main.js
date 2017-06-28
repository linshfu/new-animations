/* global Phaser */

import Distribution from '../objs/Distribution'
import Actors from '../objs/Actors'
import Lake from '../objs/Lake'
import Decor from '../objs/Decor'

export default class Main extends Phaser.State {
  init() {
    if (this.game.actors) {
      this.game.actors.destroy()
      this.game.decor.destroy()
      this.game.distribution.destroy()
    }
    this.game.sound.stopAll()
  }

  create() {
    this.game.sounds = {
      bgm: this.game.add.audio('bgm'),
      bgm20: this.game.add.audio('bgm20')
    }

    this.game.sound.setDecodedCallback([
      this.game.sounds.bgm,
      this.game.sounds.bgm20
    ], this.playBGM, this)

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

    // decor
    this.game.decor = new Decor(this.game)
    this.game.stage.addChildAt(this.game.decor, this.game.stage.children.length)

    // chick
    this.game.actors = new Actors(this.game, this.game.opt.lang)
    this.game.stage.addChildAt(this.game.actors, this.game.stage.children.length)

    // distr
    this.game.distribution = new Distribution(this.game)
    this.game.stage.addChild(this.game.distribution)

    if (!this.game.readied) this.game.readyCallback(this)
    this.game.readied = true
  }

  playBGM() {
    this.game.sounds.bgm.loopFull()
  }

  async play(res) {
    this.game.actors.start(res)
    await this.lake.showFront()

    return new Promise((resolve) => {
      resolve(this.state.start('Rounding', true, false, res))
    })
  }
}
