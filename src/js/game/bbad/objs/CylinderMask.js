/* global Phaser */

export default class CylinderMask extends Phaser.Graphics {
  constructor(game) {
    super(game, 0, 0)

    this.beginFill(0x000000)
    this.drawCircle(7.5, 7.5, 15)
    this.drawRect(7.5, 0, 50, 15)
    this.drawCircle(57.5, 7.5, 15)
    this.endFill()
  }
}
