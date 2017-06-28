/* global Phaser */

import Lake from '../objs/Lake'
import path from '../objs/path'
import Actors from '../objs/Actors'
import Decor from '../objs/Decor'
import Distribution from '../objs/Distribution'

export default class Rounding extends Phaser.State {
  init(res) {
    this.res = res
  }

  create() {
    if (!this.game.sounds) {
      this.game.sounds = {
        bgm: this.game.add.audio('bgm'),
        bgm20: this.game.add.audio('bgm20')
      }

      this.game.sound.setDecodedCallback([
        this.game.sounds.bgm,
        this.game.sounds.bgm20
      ], this.playBGM, this)
    }

    const ladder = this.game.add.sprite(187, 120, 'ladder')
    this.stairLayer = this.game.add.group()
    this.stairLayer.add(ladder)

    // stone
    this.game.add.sprite(115, 132, 'stone_big')
    this.game.add.sprite(410, 242, 'stone_small')

    // lake
    this.lake = new Lake(this.game, 60, 257)
    this.game.world.add(this.lake)

    // bg
    this.game.add.sprite(0, 0, 'game_bg')
    this.game.add.sprite(187, 120, 'footsteps')
    this.game.add.sprite(115, 132, 'stone_big_top')

    // decor
    if (!this.game.decor) {
      this.game.decor = new Decor(this.game)
      this.game.stage.addChildAt(this.game.decor, this.game.stage.children.length)
    }

    // chick
    if (!this.game.actors) {
      this.game.actors = new Actors(this.game, this.game.opt.lang)
      this.game.stage.addChildAt(this.game.actors, this.game.stage.children.length)
    }

    if (!this.game.actors.wave) this.game.actors.wavedHands(this.res)

    this.game.actors.eggshellTweenStop()

    Object.keys(this.game.actors.eggshell).forEach((way) => {
      this.game.actors.eggshell[way].y = path.begin[way].y - 3
    })
    this.game.actors.eggshell[this.res.start].loadTexture('chick_egg_fall')

    // distr
    if (!this.game.distribution) {
      this.game.distribution = new Distribution(this.game)
      this.game.stage.addChild(this.game.distribution)
    }
  }

  shutdown() {
    this.game.info.gameInProgress = false
  }

  playBGM() {
    this.game.sounds.bgm.loopFull()
  }

  end() {
    this.game.endCallback(this)
  }

  async play(res) {
    if (parseInt(res.stairs, 10) === 4) {
      this.stairLayer.add(this.game.add.sprite(201, 274, 'stair'))
    }

    this.game.info.gameInProgress = true

    await this.lake.showAll()

    await this.game.actors.run(res)

    return new Promise((resolve) => {
      resolve(this.end())
    })
  }
}
