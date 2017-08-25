import * as Phaser from '../../libs/phaser-shim'
import Events from './Events'
import Boot from './states/Boot'
import Preload from './states/Preload'
import Ready from './states/Ready'
import Main from './states/Main'

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

    this.state.add('Boot', Boot, false)
    this.state.add('Preload', Preload, false)
    this.state.add('Ready', Ready, false)
    this.mainState = this.state.add('Main', Main, false)

    this.state.start('Boot')
  }

  start(result, isHidden) {
    this.events.emit('GAME_STATE_START', result, isHidden)
  }

  enableClick(result) {
    this.events.emit('GAME_ENABLE_CLICK', result)
  }

  disableClick() {
    this.events.emit('GAME_DISABLE_CLICK')
  }

  drawing() {
    this.events.emit('GAME_STATE_DRAWING')
  }

  onComplete(callback) {
    this.completeCallback = callback
  }
}
