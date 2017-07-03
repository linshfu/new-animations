/* global Phaser */

export default class Soccer extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game
    this.left = x
    this.top = y
    this.index = 0

    this.ball = new Phaser.Sprite(this.game, 0, 0, 'soccer_ball')
    this.ball.scale.set(0.5)
    this.ball.anchor.set(0.5)

    this.game.behaviorPlugin.enable(this.ball)
    this.ball.behaviors.set('bouncing', this.behaviorBall())

    this.addMultiple([this.ball])
  }

  pause() {
    this.ball.behaviors.pause('bouncing')
  }

  resume() {
    this.ball.behaviors.resume('bouncing')
  }

  behaviorBall() {
    const tweenData = { y: 0 }
    const tween1 = this.game.add.tween(tweenData)
    tween1.to({ y: 150 }, 1000, Phaser.Easing.Bounce.Out)
    const data1 = tween1.generateData(60)

    const tween2 = this.game.add.tween(tween1.properties)
    tween2.to(tweenData, 750, Phaser.Easing.Quartic.Out)
    const data2 = tween2.generateData(40)

    const data = data1.concat(data2)

    return {
      options: {
        data
      },

      update: (el, opts) => {
        el.y = opts.data[this.index].y
        this.index++

        if (this.index === opts.data.length) {
          this.index = 0
        }
      }
    }
  }
}
