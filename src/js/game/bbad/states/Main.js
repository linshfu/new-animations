/* global Phaser */

import ProgressBar from '../objs/ProgressBar'

export default class Main extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'main', {
      fill: 'white'
    })
    // this.game.add.audio('bgm').play()

    // this.game.events.emit('GAME_STATE_INIT')

    // this.percentGoal = new ProgressBar(this.game, 2, 31, 50)
    // this.game.add.existing(this.percentGoal)
  }
}
