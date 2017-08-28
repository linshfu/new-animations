/* global Phaser */

export default class createBaseArc extends Phaser.Graphics {
  constructor(game) {
    super(game)

    const PERCENT = 50

    this.setPer = PERCENT
    this.lWidth = 13
    this.radius = 20
    this.setAngle = (1 + PERCENT * 0.01) * Math.PI

    this.render(this.setAngle)
  }

  render (angle) {
    this.lineStyle(this.lWidth, 0x0e61c7, 1)
    this.arc(0, 0, this.radius, 1 * Math.PI, angle, false, 100)
    this.lineStyle(this.lWidth, 0xcf3229, 1)
    this.arc(0, 0, this.radius, angle, 2 * Math.PI, false, 100)
  }

  setPercentage (percentage) {
    const tween = this.game.add.tween({}).to({}, 500, 'Linear')
    const per = percentage - this.setPer
    const beforeAngle = this.setAngle

    this.setAngle = (1 + percentage * 0.01) * Math.PI
    this.setPer = percentage
    
    tween.onUpdateCallback((_, v) => {
      this.clear()
      this.render(beforeAngle + (per * 0.01 * v * Math.PI))
    }, this)

    tween.onComplete.add(() => {
      this.render(this.setAngle)
    })

    tween.start()
  }
}