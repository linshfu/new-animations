/* global Phaser */

export default class Line extends Phaser.BitmapData {
  constructor(game, key, color, width) {
    super(game, key, game.width, game.height)

    this.game = game
    this.key = key
    this.color = color
    this.width = width

    this.sound = {
      opening: this.game.add.audio('opening')
    }

    this.ctx.beginPath()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.width
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'

    this.onUpdatePosCB = () => {}

    this.game.cache.addBitmapData(this.key, this)
  }

  onUpdatePos(callback) {
    this.onUpdatePosCB = callback
  }

  start(begin, path) {
    this.startPos = begin
    this.pos = path
    this.ctx.moveTo(this.startPos.x, this.startPos.y)

    return new Promise((resolve) => {
      const tweenAry = this.pos.map((v) =>
        this.lineTween(v)
      )
      tweenAry.forEach((v, i, list) => {
        if (i === list.length - 1) {
          v.onComplete.addOnce(() => {
            resolve()
          })
        }
        v.chain(list[i + 1])
      })
      tweenAry[0].start()

      this.game.sounds.bgm.stop()
      this.game.sounds.bgm20.stop()
      this.sound.opening.play()
    })
  }

  lineTween({ x, y, duration }) {
    const tween = this.game.add.tween({})
    tween.to({}, duration, Phaser.Easing.Exponential.InOut)
    tween.onUpdateCallback((t, v) => {
      const X = (this.startPos.x + (x * v)) || this.startPos.x
      const Y = (this.startPos.y + (y * v)) || this.startPos.y
      this.clear()
      this.ctx.lineTo(X, Y)
      this.ctx.stroke()
      this.onUpdatePosCB(X, Y)
    })
    tween.onComplete.addOnce(() => {
      this.startPos = {
        x: this.startPos.x + (x || 0),
        y: this.startPos.y + (y || 0)
      }
    })

    return tween
  }
}
