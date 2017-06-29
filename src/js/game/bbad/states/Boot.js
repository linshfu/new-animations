/* global Phaser */

export default class Boot extends Phaser.State {
  preload() {
    this.game.load.image('bbinlogo', '/img/game/loadingbg.png')
  }

  create() {
    this.game.stage.visibilityChange = (event) => {
      if (event.type.includes('visibilitychange')) {
      }
    }

    this.state.start('Preload', true, false, 'Main')
  }
}
