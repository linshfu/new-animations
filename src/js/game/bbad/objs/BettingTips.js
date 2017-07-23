/* global Phaser */

export default class BettingTips extends Phaser.Group {
  constructor(game) {
    super(game)

    this.leftSide = true

    this.arraw = new Phaser.Sprite(this.game, 181, 59, 'arrow_prompt')

    this.start()

    this.addMultiple([this.arraw])
  }

  stop() {
    this.tween.stop()
    this.arraw.visible = false
    clearTimeout(this.timeout)
  }

  start() {
    this.tween = this.game.add.tween(this.arraw)
    this.tween.to({ y: [69, 64, 69, 59] }, 800, 'Linear')
    this.tween.onLoop.add((s, t) => {
      this.arraw.visible = false
      this.timeout = setTimeout(() => {
        this.arraw.visible = true
        if (this.leftSide) {
        this.arraw.x = 538
      } else {
        this.arraw.x = 181
      }
      this.leftSide = !this.leftSide
      }, 1000)
    })
    this.tween.start()
    this.tween.loop()
    this.tween.delay(1000)
  }
}
