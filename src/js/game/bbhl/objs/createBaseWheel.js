/* global Phaser */

const getRadian = (segments) => {
  return 360 / segments * Math.PI / 180
}

export default class createBaseWheel extends Phaser.Graphics {
  constructor(game, x, y, radius, segments, debug = false) {
    super(game, x, y)

    this.left = x
    this.top = y

    this.pivot.setTo(radius, radius)

    const deltaPI = Math.PI * 2 / segments
    const radian = getRadian(segments)

    for (let i = 0; i < segments; i++) {
      this.lineStyle(1, 0xffffff)
      this.arc(radius, radius, radius, i * deltaPI, (i + 1) * deltaPI, false)
      this.lineTo(radius, radius)

      // num
      if (!debug) continue

      const textX = Math.cos((radian * i) + (radian / 2)) * (radius - 20)
      const textY = Math.sin((radian * i) + (radian / 2)) * (radius - 20)

      const num = new Phaser.Text(this.game, textX + radius, textY + radius, i, {
        font: 'normal 13pt Arial',
        fill: 'white',
        align: 'center'
      })
      num.anchor.setTo(0.5)

      this.addChild(num)
    }

    this.anchor.setTo(0.5)

    this.angle = -this.initAngle(segments)
  }

  initAngle(segments) {
    const angle = 360 / segments

    return 90 + (angle / 2)
  }
}
