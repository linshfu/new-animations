/* global Phaser */

export default class Lake extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'lake_wave')

    this.sound = {
      lake1: this.game.add.audio('lake_1'),
      lake2: this.game.add.audio('lake_2')
    }

    const graphics = new Phaser.Graphics(this.game, 0, 0)
    graphics.beginFill(0xa8d9d3)
    graphics.drawRect(0, 10, 460, 160)
    this.addChild(graphics)

    this.animations.add('run')
    this.animations.play('run', 15, true)
  }

  showFront() {
    return new Promise((resolve) => {
      const tween = this.game.add.tween(this)
      tween.to({ y: 257 }, 3000, Phaser.Easing.Cubic.Out)
      tween.onComplete.addOnce(() => {
        resolve()
      })
      tween.start()

      this.sound.lake1.play()
    })
  }

  showAll() {
    return new Promise((resolve) => {
      const tween = this.game.add.tween(this)
      tween.to({ y: 320 }, 1000, Phaser.Easing.Cubic.Out)
      tween.onComplete.addOnce(() => {
        resolve()
      })
      tween.start()

      this.sound.lake2.play()
    })
  }
}
