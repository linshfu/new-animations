/* global Phaser */

import { get } from 'lodash'

export default class WheelLeft extends Phaser.Group {
  constructor(game) {
    super(game)

    this.game = game

    this.radius = 150
    this.segments = 10
    this.sectorAngle = 360 / this.segments

    this.wheel = new Phaser.Sprite(this.game, 0, 0, 'test')
    this.wheel.anchor.setTo(0.5)
    this.wheel.angle = this.sectorAngle / 2

    this.addMultiple([this.wheel])
  }

  spin() {
    this.game.add.tween(this.wheel).to({
      angle: 720 - (this.sectorAngle * get(this.game, 'result.01'))
    }, 3000, Phaser.Easing.Quadratic.Out, true)
  }
}
