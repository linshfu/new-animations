import Events from './Events'
import * as Phaser from '../../libs/phaser-shim'
import Boot from './states/Boot'
import Preload from './states/Preload'
import Ready from './states/Ready'
import Main from './states/Main'
import RoundingTime from './states/RoundingTime'

/**
 * Create a Phaser Game.
 * @param {number} width - 動畫寬
 * @param {number} height - 動畫高
 * @param {string | HTMLElement} parent - 欲插入動畫的id or dom
 * @param {object} [options] - 動畫其他選項
 */

const defaults = {
  isMute: false,
  isDrawing: false,
  lang: 'zh-cn'
}

export default class Animation extends Phaser.Game {
  constructor(width, height, parent, options = {}) {
    super(width, height, Phaser.AUTO, parent, null, false)

    if (options instanceof Object) {
      this.opt = Object.assign({}, defaults, options)
    }

    this.events = new Events(this)

    this.onLoadComplete = () => {}

    this.state.add('Boot', Boot, false)
    this.state.add('Preload', Preload, false)
    this.state.add('Ready', Ready, false)
    this.mainState = this.state.add('Main', Main, false)
    this.roundingState = this.state.add('RoundingTime', RoundingTime, false)

    this.state.start('Boot')
  }

  start(opt) {
    this.events.emit('GAME_STATE_START', opt)
  }

  roundingTime(res) {
    this.events.emit('GAME_STATE_ROUNDING', res)
  }

  updateDistrFirst(data) {
    if (this.state.current !== 'Main') return
    this.events.emit('GAME_UPDATE_DISTRFIRST', data)
  }

  drawingFirst(res) {
    this.events.emit('GAME_STATE_DRAWINGFIRST', res)
  }

  drawingSecond(res) {
    this.events.emit('GAME_STATE_DRAWINGSECOND', res)
  }

  countdown(sec) {
    if (this.state.current === 'Main') this.mainState.stopDecor()
    if (this.state.current === 'RoundingTime') this.roundingState.stopDecor()
    this.cd.timingStarts(sec)
  }

  skip() {
    this.events.emit('GAME_STATE_SKIP')
  }
}
