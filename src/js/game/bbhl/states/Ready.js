/* global Phaser */

export default class Ready extends Phaser.State {
  create() {
    this.game.events.emit('GAME_STATE_LOADCOMPLETE')
  }
}
