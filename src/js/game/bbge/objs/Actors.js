/* global Phaser */

import path from './path'
import Line from './line'

export default class Actors extends Phaser.Group {
  constructor(game, lang) {
    super(game)

    this.lang = lang
    this.waved = false
    this.isRunning = false

    this.sound = {
      crowed_reciprocal: this.game.add.audio('crowed_reciprocal'),
      crowed_reciprocal_right: this.game.add.audio('crowed_reciprocal_right'),
      crowed_reciprocal_left: this.game.add.audio('crowed_reciprocal_left'),
      crowed_opening: this.game.add.audio('crowed_opening'),
      eggshell: this.game.add.audio('eggshell'),
      egg_fall: this.game.add.audio('egg_fall')
    }

    this.sound.crowed_reciprocal_right.allowMultiple = true
    this.sound.crowed_reciprocal_left.allowMultiple = true

    this.begins = {
      left: new Phaser.Sprite(this.game, path.begin.left.x, path.begin.left.y, 'chick_one_hand'),
      right: new Phaser.Sprite(this.game, path.begin.right.x, path.begin.right.y, 'chick_one_hand')
    }

    this.eggshell = {
      left: new Phaser.Sprite(this.game, path.begin.left.x, path.begin.left.y - 3, 'eggshell'),
      right: new Phaser.Sprite(this.game, path.begin.right.x, path.begin.right.y - 3, 'eggshell')
    }

    this.baskets = {
      odd: new Phaser.Sprite(this.game, 196, 338, `${this.lang}_basket_blue`),
      even: new Phaser.Sprite(this.game, 383, 338, `${this.lang}_basket_red`)
    }

    this.begins.left.animations.add('wave')
    this.begins.left.animations.play('wave', 20, true)

    this.begins.right.animations.add('wave')
    this.begins.right.animations.play('wave', 20, true)

    this.eggshell.left.animations.add('fall')
    this.eggshell.right.animations.add('fall')

    this.eggshellLeftTween = this.game.add.tween(this.eggshell.left)
    this.eggshellRightTween = this.game.add.tween(this.eggshell.right)

    this.eggshellLeftTween.onLoop.addOnce(() => {
      this.eggshellRightTween.start()
    })
    this.eggshellLeftTween.onLoop.add(() => {
      this.sound.crowed_reciprocal_left.play('', 0, 1, false, false)
    })
    this.eggshellRightTween.onLoop.add(() => {
      this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
        this.sound.crowed_reciprocal_right.play('', 0, 1, false, false)
      })
    })

    this.eggshellLeftTween.to({
      y: 106
    }, 1000, Phaser.Easing.Exponential.Out, false, 0, -1, true)
    this.eggshellRightTween.to({
      y: 106
    }, 1000, Phaser.Easing.Exponential.Out, false, 0, -1, true)

    this.eggshellLeftTween.start()

    this.actors = new Phaser.Group(this.game)
    this.actors.addMultiple([
      this.begins.left,
      this.begins.right,
      this.eggshell.left,
      this.eggshell.right
    ])
    this.actors.setAll('pivot.x', 55)
    this.actors.setAll('pivot.y', 85)

    this.baskets.odd.anchor.x = 0.5
    this.baskets.even.anchor.x = 0.5

    // line
    this.lineBorder = new Line(this.game, 'line', '#df6c35', 10)
    const lineBorder = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData('line'))
    this.line = new Line(this.game, 'line2', '#fa7d00', 5)
    const line = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData('line2'))

    this.addMultiple([
      lineBorder,
      line,
      this.actors,
      this.eggshell.left,
      this.eggshell.right,
      this.baskets.odd,
      this.baskets.even
    ])
  }

  wavedHands(res) {
    Object.keys(this.eggshell).forEach((way) => {
      this.begins[way].animations.stop()
    })
    this.begins[res.start].loadTexture('chick_two_hand')
    this.begins[res.start].animations.currentAnim.onLoop.add(() => {
      this.sound.crowed_opening.play()
    })
    this.begins[res.start].animations.play('wave', 20, true)
    this.actors.setChildIndex(this.begins[res.start], 1)
    this.waved = true
  }

  eggshellTweenStop() {
    this.eggshellLeftTween.stop()
    this.eggshellRightTween.stop()
  }

  start(res) {
    this.eggshellTweenStop()
    Object.keys(this.eggshell).forEach((way) => {
      this.eggshell[way].y = path.begin[way].y - 3
    })
    this.eggshell[res.start].animations.play('fall', 20)
    this.actors.setChildIndex(this.begins[res.start], 1)

    this.sound.eggshell.play()

    this.wavedHands(res)
  }

  async run(res) {
    if (this.isRunning) return false

    this.isRunning = true

    this.line.onUpdatePos((x, y) => {
      this.begins[res.start].x = x
      this.begins[res.start].y = y
    })

    this.line.start(path.begin[res.start], path[`${res.start}${res.stairs}`])
    await this.lineBorder.start(path.begin[res.start], path[`${res.start}${res.stairs}`])
    await this.fall(res)
    this.isRunning = false

    return new Promise((resolve) => {
      resolve()
    })
  }

  fall(res) {
    return new Promise((resolve) => {
      // basket top 338
      const basketTween = this.game.add.tween(this.baskets[res.end])
      basketTween.to({ y: [340, 338] }, 500, Phaser.Easing.Sinusoidal.Out)
      basketTween.start()

      // chick top 352
      const chickTween = this.game.add.tween(this.begins[res.start])
      chickTween.to({ y: [354, 352] }, 500, Phaser.Easing.Sinusoidal.Out)
      chickTween.start()

      this.sound.egg_fall.onStop.addOnce(() => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      this.sound.egg_fall.play('', 0, 3)
    })
  }
}
