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
    // console.log(JSON.stringify(this.game.result))
    this.wheelLeft.spin()
  }

  enableClick() {
    this.wheelRight.enableClick()
  }

  // drawing(result) {
  //   this.result = Object.assign({}, this.result, result)
  //   console.log(this.result)
  // }
}
