import { EventEmitter } from 'events'

const GAME_STATE_LOADCOMPLETE = 'GAME_STATE_LOADCOMPLETE'
const GAME_STATE_START = 'GAME_STATE_START'
const GAME_STATE_ROUNDING = 'GAME_STATE_ROUNDING'
const GAME_UPDATE_DISTRFIRST = 'GAME_UPDATE_DISTRFIRST'

export default class Events extends EventEmitter {
  constructor(game) {
    super(game)

    this.game = game

    this.state = {
      isLoadComplete: false
    }

    this.once(GAME_STATE_LOADCOMPLETE, this.onLoadComplete)
    this.on(GAME_STATE_START, this.startAnim)
    this.on(GAME_STATE_ROUNDING, this.roundingTime)
    this.on(GAME_UPDATE_DISTRFIRST, this.updateDistrFirst)
  }

  onLoadComplete() {
    this.state.isLoadComplete = true
    this.game.onLoadComplete()
  }

  roundingTime() {
    if (this.state.isLoadComplete) {
      this.game.state.start('RoundingTime')
    } else {
      setTimeout(() => this.emit(GAME_STATE_ROUNDING), 100)
    }
  }

  startAnim() {
    if (this.state.isLoadComplete) {
      this.game.state.start('Main')
    } else {
      setTimeout(() => this.emit(GAME_STATE_START), 100)
    }
  }

  updateDistrFirst(data) {
    this.game.distrFirstMaster.updateAll(data.master)
    this.game.distrFirstGuest.updateAll(data.guest)
  }
}
