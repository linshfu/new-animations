/* global Phaser */

export default class DecorChick2 extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, null)


    this.anim1st()
  }

  anim1st() {
    this.loadTexture('decorChick2_a')
    const anim = this.animations.add('run1')
    anim.onComplete.add(() => {
      this.anim2nd()
    })
    this.animations.play('run1', 24)
  }

  anim2nd() {
    this.loadTexture('decorChick2_b')
    const anim = this.animations.add('run2')
    anim.onComplete.add(() => {
      this.anim1st()
    })
    this.animations.play('run2', 24)
  }
}
