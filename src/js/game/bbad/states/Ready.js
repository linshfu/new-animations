/* global Phaser */

import Countdown from '../objs/Countdown'

export default class Ready extends Phaser.State {
  create() {
    // Countdown
    this.game.cd = new Countdown(this.game, 369, 53)
    this.game.stage.addChildAt(this.game.cd, this.game.stage.children.length)

    this.game.events.emit('GAME_STATE_LOADCOMPLETE')
  }
}
