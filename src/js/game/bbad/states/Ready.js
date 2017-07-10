/* global Phaser */

import Countdown from '../objs/Countdown'

export default class Ready extends Phaser.State {
  create() {
    // bg
    const bg = new Phaser.Sprite(this.game, 0, this.game.height, 'game_bg')
    bg.anchor.set(0, 1)
    this.game.stage.addChildAt(bg, 0)

    // Countdown
    this.game.cd = new Countdown(this.game, 369, 53)
    this.game.stage.addChildAt(this.game.cd, this.game.stage.children.length)

    this.game.events.emit('GAME_STATE_LOADCOMPLETE')
  }
}
