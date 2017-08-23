/* global Phaser */

import Loading from '../../Loading'

export default class Preload extends Phaser.State {
  init() {
    this.game.load.onLoadStart.add(this.loadStart, this)
    this.game.load.onFileComplete.add(this.fileComplete, this)
    this.game.load.onLoadComplete.add(this.loadComplete, this)
  }

  preload() {
    this.game.load.path = 'img/game/bbhl/'

    this.game.load.image('test', 'test.png')
  }

  loadStart() {
    this.loading = new Loading(this.game)
    this.game.add.existing(this.loading)
  }

  fileComplete(percent) {
    this.loading.updateProgress(percent)
  }

  loadComplete() {
    this.state.start('Ready')
  }
}
