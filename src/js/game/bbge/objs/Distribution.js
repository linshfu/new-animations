/* global Phaser */

import ProgressBar from './ProgressBar'

export default class Distribution extends Phaser.Group {
  constructor(game) {
    super(game)

    this.oddBar = new ProgressBar(this.game, 290 - 8, 430, null, {
      width: 290,
      height: 16,
      color: '#0e61c7'
    })
    this.evenBar = new ProgressBar(this.game, 290 + 8, 430, null, {
      width: 290,
      height: 16,
      color: '#cf3229'
    })

    const graphics = new Phaser.Graphics(0, 0)
    graphics.beginFill(0x89bf47)
    graphics.drawCircle(0, 0, 25)
    graphics.endFill()

    const circle = new Phaser.Sprite(this.game, 290, 430, 'icon_vs')
    circle.anchor.set(0.5)

    this.oddBar.angle = 180
    this.oddBar.num.angle = -180
    this.oddBar.num.anchor.x = 0
    this.oddBar.num.position.y -= 5

    this.addMultiple([this.oddBar, this.evenBar, circle])
  }

  updateAll(data) {
    this.oddBar.updateDistr(parseInt(data.odd, 10))
    this.evenBar.updateDistr(parseInt(data.even, 10))
  }
}
