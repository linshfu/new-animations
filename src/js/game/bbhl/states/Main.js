/* global Phaser */

import WheelLeft from '../objs/WheelLeft'
import WheelRight from '../objs/WheelRight'

export default class Main extends Phaser.State {
  create() {
    this.wheelLeft = new WheelLeft(this.game)
    this.wheelLeft.top = 0
    this.wheelLeft.left = 0

    setTimeout(() => {
      this.wheelLeft.spin(2)
    }, 3000)
  }
}
