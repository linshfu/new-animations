import Events from './Events'
import * as Phaser from '../../libs/phaser-shim.js'
import Boot from './states/Boot'
import Preload from './states/Preload'
import Main from './states/Main'
import RoundingTime from './states/RoundingTime'

/**
 * Create a Phaser Game.
 * @param {number} width - 動畫寬
 * @param {number} height - 動畫高
 * @param {string | HTMLElement} parent - 欲插入動畫的id or dom
 * @param {object} [options] - 動畫其他選項
 */

export default class Animation extends Phaser.Game {
  constructor(width, height, parent, options) {
    super(width, height, Phaser.AUTO, parent, null, false)

    this.events = new Events(this)

    this.state.add('Boot', Boot, false)
    this.state.add('Preload', Preload, false)
    this.state.add('Main', Main, false)
    this.state.add('RoundingTime', RoundingTime, false)

    this.state.start('Boot')
  }

  start() {
    this.events.emit('GAME_STATE_START')
  }

  roundingTime() {
    this.events.emit('GAME_STATE_ROUNDING')
  }
}
