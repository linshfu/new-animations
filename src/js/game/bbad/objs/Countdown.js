/* global Phaser */

export default class Countdown extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game
    this.isCountingdown = false

    const handLayer = new Phaser.Group(this.game)
    handLayer.left = x
    handLayer.top = y

    this.bg = new Phaser.Sprite(this.game, 0, 0, 'countdown_hand')
    this.numImg = new Phaser.Sprite(this.game, 93, 107, 'countdown_num_5')
    handLayer.addMultiple([this.bg, this.numImg])

    this.addMultiple([handLayer])

    this.hide()
  }

  show() {
    this.alpha = 1
  }

  hide() {
    this.alpha = 0
  }

  press() {
    setTimeout(() => {
      this.bg.loadTexture('countdown_hand2')
    }, 250)
    setTimeout(() => {
      this.bg.loadTexture('countdown_hand')
    }, 500)
  }

  timingStarts(n = 5) {
    return new Promise((resolve) => {
      if (this.isCountingdown) return

      this.show()

      this.press()

      this.num = parseInt(n, 10)

      this.numImg.loadTexture(`countdown_num_${this.num}`)

      this.timer = new Phaser.Timer(this.game)
      this.game.time.add(this.timer)
      this.timer.repeat(Phaser.Timer.SECOND, this.num, this.updateCounter, this)
      this.timer.onComplete.add(() => {
        this.hide()
        setTimeout(() => {
          this.isCountingdown = false
          resolve()
        }, 500)
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
