import BootState from '../../BootState'

export default class Boot extends BootState {
  create() {
    this.game.stage.visibilityChange = (event) => {
      if (event.type.includes('visibilitychange')) {
      }
    }

    this.state.start('Preload', true, false, 'Main')
  }
}
