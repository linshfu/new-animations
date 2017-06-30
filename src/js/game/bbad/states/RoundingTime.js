/* global Phaser */

export default class RoundingTime extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'RoundingTime', {
      fill: 'white'
    })
  }
}
