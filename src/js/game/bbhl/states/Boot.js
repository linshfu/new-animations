/* global Phaser */

export default class Boot extends Phaser.State {
  preload() {
    this.game.load.image('bbinlogo', 'img/game/loadingbg.png')
  }

  create() {
    this.game.stage.visibilityChange = () => {}

    const stateText = this.game.add.text(0, 0, '', {
      fill: 'white'
    })

    this.game.stage.addChild(stateText)

    this.game.onPause.add(() => {
      stateText.setText('skip')
    })

    this.game.onResume.add(() => {
      stateText.setText('')
    })

    this.state.start('Preload')
  }
}
