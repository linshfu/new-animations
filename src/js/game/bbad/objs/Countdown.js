/* global Phaser */

export default class Countdown extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game

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

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async timingStarts(n = 5) {
    if (n === 5) {
      this.press()
    }
    this.show()
    this.num = parseInt(n, 10)
    this.numImg.loadTexture(`countdown_num_${this.num}`)

    await this.delay(1000)
  }
}
