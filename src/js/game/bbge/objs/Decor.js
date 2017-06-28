/* global Phaser */

import DecorChick4 from './DecorChick4'
export default class Decor extends Phaser.Group {
  constructor(game) {
    super(game)

    const flower1 = new Phaser.Sprite(this.game, 70, 52, 'flower1')
    flower1.animations.add('sway')
    flower1.animations.play('sway', 15, true)

    const flower2 = new Phaser.Sprite(this.game, 492, 40, 'flower2')
    flower2.animations.add('sway')
    flower2.animations.play('sway', 15, true)

    const flower3 = new Phaser.Sprite(this.game, 439, 344, 'flower3')
    flower3.animations.add('sway')
    flower3.animations.play('sway', 15, true)

    const decorChick1 = new Phaser.Sprite(this.game, 440, 135, 'decorChick1')
    decorChick1.animations.add('run')
    decorChick1.animations.play('run', 18, true)

    const decorChick1a = new Phaser.Sprite(this.game, -118, 192, 'decorChick1')
    decorChick1a.animations.add('run')
    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      decorChick1a.animations.play('run', 24, true)
    })

    // const decorChick2 = new DecorChick2(this.game, 60, 214)
    // const decorChick3 = new DecorChick3(this.game, 60, 247)
    const decorChick4 = new DecorChick4(this.game, 92, 247)

    const decorChick5 = new Phaser.Sprite(this.game, 30, 312, 'decorChick5')
    decorChick5.animations.add('run')
    decorChick5.animations.play('run', 20, true)

    const decorChick6 = new Phaser.Sprite(this.game, 492, 84, 'decorChick6')
    decorChick6.animations.add('run')
    decorChick6.animations.play('run', 20, true)

    const decorChick7 = new Phaser.Sprite(this.game, 424, 189, 'decorChick7')
    decorChick7.animations.add('run')
    decorChick7.animations.play('run', 24, true)

    const leaf1 = new Phaser.Sprite(this.game, 393, 153, 'leaf')
    const leaf2 = new Phaser.Sprite(this.game, 138, 284, 'leaf')
    leaf2.angle = -45

    const leaf3 = new Phaser.Sprite(this.game, 114, 150, 'leaf')
    leaf3.angle = 90
    leaf3.scale.set(0.7)

    this.addMultiple([leaf1, leaf2, leaf3, flower1, flower2, flower3, decorChick1,
    decorChick1a, decorChick4, decorChick5, decorChick6, decorChick7])
  }
}
