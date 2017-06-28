/* global Phaser */

export default class ProgressBg extends Phaser.Graphics {
  constructor(game) {
    super(game, 0, 0)

    this.beginFill(0xb83636)
    this.drawRect(0, 0, 65, 15)
    this.endFill()
  }
}