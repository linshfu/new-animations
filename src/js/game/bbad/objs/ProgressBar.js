/* global Phaser */

import ProgressBg from './ProgressBg'
import CylinderMask from './CylinderMask'

export default class ProgressBar extends Phaser.Sprite {
  constructor(game, x, y, percent, fill = 0xb83636) {
    super(game, x, y, null)

    this.progressWidth = 65
    this.percent = percent
    this.fill = fill

    this.bar = new Phaser.Sprite(this.game, 0, 0, new ProgressBg(game, this.fill).generateTexture())
    this.bar.width = 0
    this.addChild(this.bar)

    const mask = new CylinderMask(this.game)
    this.mask = mask
    this.addChild(mask)

    this.game.add.tween(this.bar).to({
      width: this.progressWidth * (this.percent / 100)
    }, 500, null, true)

    this.num = new Phaser.Text(this.game, 0, 0, `${this.percent.toFixed(2)}%`, {
      font: 'Normal 12px "Microsoft JhengHei", Arial',
      fill: '#ecebe3',
      align: 'center'
    })
    this.num.resolution = window.devicePixelRatio
    this.num.anchor.x = 0.5
    this.num.centerX = 65/2
    this.addChild(this.num)
  }

  stop() {
    this.game.add.tween(this.bar).to({
      width: 0
    }, 500, null, true)
    this.num.setStyle({
      fill: 'transparent'
    })
  }

  updateDistr(data) {
    this.game.add.tween(this.bar).to({
      width: this.progressWidth * (data / 100)
    }, 500, null, true)
    this.num.setText(`${data.toFixed(2)}%`)
  }
}