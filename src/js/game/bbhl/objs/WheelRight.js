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

    this.addMultiple([this.wheel])
  }

  enableClick() {
    this.wheel.inputEnabled = true
    this.wheel.input.useHandCursor = true
    this.wheel.events.onInputDown.add(this.spin, this)
  }

  disableClick() {
    this.wheel.inputEnabled = false
    this.wheel.input.useHandCursor = false
  }

  spin() {
    this.game.disableClick()
    this.game.drawing()
  }

  drawing(){
    const tween = this.game.add.tween(this.wheel).to({
      angle: 720 - (36 * get(this.game, 'result.02'))
    }, 3000, Phaser.Easing.Quadratic.Out, true)

    tween.onComplete.add(() => {
      this.game.completeCallback && this.game.completeCallback()
    })
  }
}
