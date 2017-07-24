/* global Phaser */

export default class Soccer extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game
    this.left = x
    this.top = y
    this.index = 0

    this.isBouncing = true

    const pedestal = new Phaser.Sprite(this.game, 0, 85, 'soccer_pedestal')
    pedestal.anchor.set(0.5, 0)

    this.shadow = new Phaser.Sprite(this.game, 0, 95, 'soccer_shadow')
    this.shadow.anchor.set(0.5)

    this.ball = new Phaser.Sprite(this.game, 0, 0, 'soccer_ball')
    this.ball.anchor.set(0.5, 0)

    const tweenData = { y: 0, scale: 0.75 }
    const tween1 = this.game.add.tween(tweenData)
    tween1.to({ y: 33, scale: 1 }, 1000, Phaser.Easing.Bounce.Out)
    const data1 = tween1.generateData(60)

    const tween2 = this.game.add.tween(tween1.properties)
    tween2.to(tweenData, 750, Phaser.Easing.Quartic.Out)
    const data2 = tween2.generateData(40)

    this.data = data1.concat(data2)

    this.addMultiple([pedestal, this.shadow, this.ball])
  }

  stop() {
    this.isBouncing = false
  }

  start() {
    this.isBouncing = true
  }

  update() {
    if (this.isBouncing) {
      this.ball.y = this.data[this.index].y
      this.shadow.scale.x = this.data[this.index].scale
      this.index++

      if (this.index === this.data.length) {
        this.index = 0
      }
    }
  }
}
