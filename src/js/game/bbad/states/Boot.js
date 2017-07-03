/* global Phaser */

import * as Behavior from 'phaser-behavior-plugin'

export default class Boot extends Phaser.State {
  preload() {
    this.game.load.image('bbinlogo', '/img/game/loadingbg.png')
  }

  create() {
    this.game.stage.visibilityChange = (event) => {
      if (event.type.includes('visibilitychange')) {
      }
    }

    this.game.behaviorPlugin = this.game.plugins.add(Behavior)
    this.game.behaviorPlugin.destroy = () => {}

    this.state.start('Preload')
  }
}
