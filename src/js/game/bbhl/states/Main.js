/* global Phaser */

import WheelLeft from '../objs/WheelLeft'
import WheelRight from '../objs/WheelRight'

export default class Main extends Phaser.State {
  create() {
    this.wheelLeft = new WheelLeft(this.game)
    this.wheelRight = new WheelRight(this.game)

    setTimeout(() => {
      this.wheelLeft.spin()
    }, 3000)
  }
}
