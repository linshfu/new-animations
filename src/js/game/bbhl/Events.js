import { EventEmitter } from 'events'

const GAME_STATE_LOADCOMPLETE = 'GAME_STATE_LOADCOMPLETE'
const GAME_STATE_START = 'GAME_STATE_START'
const GAME_STATE_DRAWING = 'GAME_STATE_DRAWING'
const GAME_STATE_SKIP = 'GAME_STATE_SKIP'
const GAME_ENABLE_CLICK = 'GAME_ENABLE_CLICK'
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
    this.on(GAME_STATE_DRAWING, this.drawing)
    this.on(GAME_STATE_SKIP, this.skip)
    this.on(GAME_UPDATE_DISTRFIRST, this.updateDistrFirst)
    this.on(GAME_ENABLE_CLICK, this.enableClick)
  }

  onLoadComplete() {
    this.state.isLoadComplete = true
    this.game.onLoadComplete && this.game.onLoadComplete()
  }

  startAnim(result) {
    this.game.result = result
    if (this.state.isLoadComplete) {
      this.game.paused = false
      this.game.state.start('Main')
      // console.log(JSON.stringify(this.game.result))
    } else {
      setTimeout(() => this.emit(GAME_STATE_START, result), 100)
    }
  }

  enableClick(result) {
    this.game.result = result
    this.game.mainState.enableClick()
  }

  drawing(opt) {
    this.game.mainState.drawing(opt)
  }

  updateDistrFirst(data) {
    this.game.opt.distr = data
    this.game.distrFirstHost.updateAll(data.home)
    this.game.distrFirstGuest.updateAll(data.away)
  }

  skip() {
    this.game.paused = true
  }
}
