/* global Phaser */

import createBaseBar from './createBaseBar'
import createBaseArc from './createBaseArc'

export default class Distribution extends Phaser.Group {
  constructor(game) {
    super(game)
    this.leftBar = new createBaseBar(this.game, 0x0e61c7)
    this.leftBar.left = 0
    this.rightBar = new createBaseBar(this.game, 0xcf3229, true)
    this.rightBar.left = 220

    this.circle = new createBaseArc(this.game)
    this.circle.top = -10
    this.circle.left = 220

    this.addMultiple([this.circle, this.leftBar, this.rightBar])
  }

  setDistr(left, right) {
    this.leftBar.setPercentage(left)
    this.rightBar.setPercentage(right)
    this.circle.setPercentage(left)
  }
}
