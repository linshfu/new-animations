import { EventEmitter } from 'events'

const GAME_STATE_LOADCOMPLETE = 'GAME_STATE_LOADCOMPLETE'
const GAME_STATE_START = 'GAME_STATE_START'
const GAME_STATE_ROUNDING = 'GAME_STATE_ROUNDING'
const GAME_STATE_DRAWINGFIRST = 'GAME_STATE_DRAWINGFIRST'
const GAME_STATE_DRAWINGSECOND = 'GAME_STATE_DRAWINGSECOND'
const GAME_STATE_SKIP = 'GAME_STATE_SKIP'
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
    this.on(GAME_STATE_DRAWINGFIRST, this.drawingFirst)
    this.on(GAME_STATE_DRAWINGSECOND, this.drawingSecond)
    this.on(GAME_UPDATE_DISTRFIRST, this.updateDistrFirst)
    this.on(GAME_STATE_SKIP, this.skip)
  }

  onLoadComplete() {
    this.state.isLoadComplete = true
    this.game.onLoadComplete()
  }

  roundingTime(res) {
    if (this.state.isLoadComplete) {
      this.game.paused = false
      this.game.result = res
      this.game.state.start('RoundingTime')
    } else {
      setTimeout(() => this.emit(GAME_STATE_ROUNDING, res), 100)
    }
  }

  startAnim(opt) {
    if (this.state.isLoadComplete) {
      this.game.paused = false
      this.game.state.start('Main', true, false, opt)
    } else {
      setTimeout(() => this.emit(GAME_STATE_START, opt), 100)
    }
  }

  updateDistrFirst(data) {
    this.game.opt.distr = data
    this.game.distrFirstHost.updateAll(data.home)
    this.game.distrFirstGuest.updateAll(data.away)
  }

  drawingFirst(res) {
    if (this.game.state.current !== 'Main') return
    this.game.mainState.drawing(res)
  }

  drawingSecond(res) {
    if (this.game.state.current !== 'RoundingTime') return
    this.game.roundingState.drawing(res)
  }

  skip() {
    this.game.paused = true
  }
}
