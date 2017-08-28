/* global Phaser */

import { get } from 'lodash'

import WheelLeft from '../objs/WheelLeft'
import WheelRight from '../objs/WheelRight'
import Distribution from '../objs/Distribution'
export default class Main extends Phaser.State {
  init(isHidden) {
    this.isHidden = isHidden
  }

  create() {
    this.wheelLeft = new WheelLeft(this.game)
    this.wheelLeft.top = 0
    this.wheelLeft.left = 0

    this.wheelRight = new WheelRight(this.game)
    this.wheelRight.top = 0
    this.wheelRight.left = 400

    if (this.isHidden) {
      this.wheelLeft.open()
    } else {
      this.wheelLeft.spin()
    }
    
    this.distr = new Distribution(this.game)
    this.distr.top = 395
    this.distr.left = 70
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

  updateDistr(l, r) {
    this.distr.setDistr(l, r)
  }
}
