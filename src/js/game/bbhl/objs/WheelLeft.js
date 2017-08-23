/* global Phaser */

import createBaseWheel from '../objs/createBaseWheel'

export default class WheelLeft extends Phaser.Group {
  constructor(game) {
    super(game)

    this.game = game

    this.wheel = new createBaseWheel(this.game, 150, 150, 150, 10, true)

    this.addMultiple([this.wheel])
  }

  spin() {
    var spinTween = this.game.add.tween(this.wheel).to({
      angle: 90
    }, 3000, Phaser.Easing.Quadratic.Out, true)
  }
}
