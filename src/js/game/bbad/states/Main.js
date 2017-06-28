/* global Phaser */

import ProgressBar from '../objs/ProgressBar'

export default class Main extends Phaser.State {
  create() {
    this.game.events.emit('GAME_STATE_INIT')

    this.percentGoal = new ProgressBar(this.game, 2, 31, 50)
    this.game.add.existing(this.percentGoal)
  }
}
