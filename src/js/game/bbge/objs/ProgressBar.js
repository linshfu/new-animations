/* global Phaser */

class Rect extends Phaser.BitmapData {
  constructor(game, key, width, height, color) {
    super(game, key, width, height)

    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.rect(0, 0, width, height)
    this.ctx.closePath()
    this.ctx.fill()

    game.cache.addBitmapData(key, this)
    return game.cache.getBitmapData(key)
  }
}

class Semicircular extends Phaser.BitmapData {
  constructor(game, key, width, height, color, dire = 'left') {
    super(game, key, width, height)

    this.ctx.beginPath()
    this.ctx.fillStyle = color
    if (dire === 'left') this.ctx.arc(width, width, width, Math.PI * 0.5, Math.PI * 1.5)
    if (dire === 'right') this.ctx.arc(0, width, width, Math.PI * 1.5, Math.PI * 0.5)
    this.ctx.closePath()
    this.ctx.fill()

    game.cache.addBitmapData(key, this)
    return game.cache.getBitmapData(key)
  }
}

export default class ProgressBar extends Phaser.Sprite {
  constructor(game, x, y, key, options) {
    super(game, x, y, key)

    this.opt = options
    this.minWidth = this.opt.height

    const numStyle = {
      font: 'Normal 12px "Microsoft JhengHei", Arial',
      fill: '#ffffff',
      align: 'right'
    }

    if (!this.opt) { throw new Error('缺少必要屬性') }

    // this.semicircularLeft = new Phaser.Sprite(this.game, 0, 0, new Semicircular(
    //   this.game, 'semicircularLeft', this.opt.height / 2, this.opt.height, this.opt.color
    // ))

    const rect = new Rect(this.game, 'rect',
      (this.opt.width - this.opt.height) / 2, this.opt.height, this.opt.color)
    const semicircular = new Semicircular(this.game, 'semicircularRight',
      this.opt.height / 2, this.opt.height, this.opt.color, 'right')

    this.rect = new Phaser.Sprite(this.game, 0, 0, rect)
    this.semicircularRight = new Phaser.Sprite(this.game, this.rect.right, 0, semicircular)
    this.num = new Phaser.Text(this.game, this.semicircularRight.left, 2.5, '50%', numStyle)
    this.num.resolution = window.devicePixelRatio

    // this.addChild(this.semicircularLeft)
    this.addChild(this.semicircularRight)
    this.addChild(this.rect)
    this.addChild(this.num)

    this.children.forEach((sprite) => {
      sprite.anchor.setTo(0, 0.5)
    })

    this.num.anchor.x = 1
  }

  updateDistr(data) {
    if (typeof data !== 'number' || !this.game) return

    if (data) {
      this.num.alpha = 1
    } else {
      this.num.alpha = 0
    }

    this.num.setText(`${data}%`)

    const fullWidth = () => {
      return (this.opt.width * data / 100) - this.opt.height
    }

    const semicirRightPos = () => {
      const pos = this.semicircularRight.left = this.rect.width
      this.num.x = pos
      return pos
    }

    const introTween = this.game.add.tween(this.rect)
    introTween.to({ width: fullWidth() }, 500, Phaser.Easing.Exponential.Out)
    introTween.onUpdateCallback(() => {
      semicirRightPos()
    }, this)

    // 消除落差
    introTween.onComplete.add(() => {
      semicirRightPos()
    })

    introTween.start()
  }
}
