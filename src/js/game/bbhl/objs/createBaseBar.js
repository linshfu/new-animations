/* global Phaser */

export default class createBaseBar extends Phaser.Graphics {
  constructor(game, color, isRight) {
    super(game)

    const PERCENT = 50
    
    this.fullWidth = 220
    this.fullHeight = 16
    this.color = color
    this.isRight = isRight
    this.setWidth = 0
    
    this.setPercentage(PERCENT)
  }

  render (width) {
    this.setWidth = width
    const toLeft = this.isRight ? 0 : this.fullWidth
    const set1 = this.isRight ? -1 : 1
    const set2 = this.isRight ? 1 : -1

    this.beginFill(this.color)
    this.moveTo(toLeft + 0, 0)
    this.lineTo(toLeft + width * set1, 0)
    this.quadraticCurveTo(toLeft + width * set1 + this.fullHeight / 2 * set2, this.fullHeight / 2, toLeft + width * set1, this.fullHeight)
    this.lineTo(toLeft + 0, this.fullHeight)
    this.endFill()
  }

  setPercentage (percentage) {
    const tween = this.game.add.tween({}).to({}, 500, Phaser.Easing.Exponential.out)
    const setWidth = this.setWidth

    tween.onUpdateCallback((_, v) => {
      this.clear()
      this.render(setWidth + (setWidth - this.fullWidth * percentage * 0.01 * -1) * v * -1)
    }, this)
    tween.start()
  }
}