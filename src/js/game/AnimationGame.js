import * as Phaser from '../libs/phaser-shim.js'
import { isObject } from 'lodash'

/**
 * Create a Phaser Game.
 * @param {number} width - 動畫寬
 * @param {number} height - 動畫高
 * @param {string | HTMLElement} parent - 欲插入動畫的id or dom
 * @param {boolean} transparent - 動畫背景透明
 * @param {object} [options] - 動畫其他選項
 */

const defaults = {
  isMute: false,
  lang: 'zh-cn'
}

export default class AnimationGame extends Phaser.Game {
  constructor(width, height, parent, transparent, options = defaults) {
    super(width, height, Phaser.AUTO, parent, null, transparent)

    if (isObject(options)) {
      this.opt = Object.assign({}, defaults, options)
    }

    this.info = {
      loadStart: false,
      loadComplete: false,
      gameStart: false
    }

    // this.result = 賽果資料
    this.endCallback = () => {}
    this.skipCallback = () => {}
    this.onLoadCompleteCallback = () => {}
  }

  clearData() {
    delete this.result
  }

  onComplete(callback) {
    this.endCallback = callback
  }

  onSkip(callback) {
    this.skipCallback = callback
  }

  onLoadComplete(callback) {
    this.onLoadCompleteCallback = callback
  }

  setMute(status) {
    this.sound.mute = status
    this.state.states.mute = status
  }

  animationEnd() {
    this.sound.stopAll()
    this.clearData()
    this.info.gameStart = false
    this.endCallback(this)
  }
}
