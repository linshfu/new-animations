import { EventEmitter } from 'events'

const GAME_STATE_LOADCOMPLETE = 'GAME_STATE_LOADCOMPLETE'
const GAME_STATE_START = 'GAME_STATE_START'
const GAME_STATE_ROUNDING = 'GAME_STATE_ROUNDING'

function* startMain(r) {
  return (r) ? true : yield false
}

export default class Events extends EventEmitter {
  constructor(game) {
    super(game)

    this.game = game

    this.state = {
      isLoadComplete: false
    }

    this.once(GAME_STATE_LOADCOMPLETE, this.onLoadComplete)
    this.on(GAME_STATE_START, this.onStart)
    this.on(GAME_STATE_ROUNDING, this.onRounding)
  }

  onLoadComplete() {
    this.state.isLoadComplete = true
  }

  onRounding() {
    this.game.state.start('RoundingTime')
  }

  onStart() {
    const t = startMain(this.state.isLoadComplete)
    const isLoadComplete = t.next()

    if (isLoadComplete.value) {
      this.game.state.start('Main')
    } else {
      setTimeout(() => this.onStart(), 100)
    }
  }
}
