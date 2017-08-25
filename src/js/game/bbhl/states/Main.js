/* global Phaser */

import { get } from 'lodash'

import WheelLeft from '../objs/WheelLeft'
import WheelRight from '../objs/WheelRight'

export default class Main extends Phaser.State {
  create() {
    this.wheelLeft = new WheelLeft(this.game)
    this.wheelLeft.top = 0
    this.wheelLeft.left = 0

    this.wheelRight = new WheelRight(this.game)
    this.wheelRight.top = 0
    this.wheelRight.left = 400

    this.wheelLeft.spin()
  }

  enableClick() {
    this.wheelRight.enableClick()
  }

  disableClick() {
    this.wheelRight.disableClick()
  }

  drawing() {
    this.wheelRight.drawing()
  }
}
