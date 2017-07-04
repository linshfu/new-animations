/* global Phaser */

export default class Countdown extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game
    this.isCountingdown = false

    const mask = new Phaser.Graphics(this.game, 0, 0)
    mask.beginFill(0x333333, 0.5)
    mask.drawRect(0, 0, this.game.width, this.game.height)

    const handLayer = new Phaser.Group(this.game)
    handLayer.left = x
    handLayer.top = y

    const bg = new Phaser.Sprite(this.game, 0, 0, 'countdown_hand')
    this.numImg = new Phaser.Sprite(this.game, 64, 94, 'countdown_num_5')
    handLayer.addMultiple([bg, this.numImg])

    this.addMultiple([mask, handLayer])

    this.hide()
  }

  show() {
    this.alpha = 1
  }

  hide() {
    this.alpha = 0
  }

  timingStarts(n = 5) {
    return new Promise((resolve) => {
      if (this.isCountingdown) return

      this.show()

      this.num = parseInt(n, 10)

      this.numImg.loadTexture(`countdown_num_${this.num}`)

      this.timer = new Phaser.Timer(this.game)
      this.game.time.add(this.timer)
      this.timer.repeat(Phaser.Timer.SECOND, this.num, this.updateCounter, this)
      this.timer.onComplete.add(() => {
        this.hide()
        this.isCountingdown = false
        resolve()
      })
      this.timer.start()
      this.isCountingdown = true
    })
  }

  updateCounter() {
    if (!(this.num - 1)) return
    this.numImg.loadTexture(`countdown_num_${this.num - 1}`)
    this.num --
  }
}
