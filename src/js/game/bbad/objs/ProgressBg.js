/* global Phaser */

export default class ProgressBg extends Phaser.Graphics {
  constructor(game, fill) {
    super(game, 0, 0)

    this.beginFill(fill)
    this.drawRect(0, 0, 65, 15)
    this.endFill()
  }
}