import AnimationGame from '../AnimationGame'
import Boot from './states/Boot.js'
import Preload from './states/Preload.js'
import Main from './states/Main.js'
import Rounding from './states/Rounding.js'
import Drawing from './states/Drawing.js'

import g11n from '../../business/g11n'

export default class Animation extends AnimationGame {
  constructor(width, height, parent, transparent, options) {
    super(width, height, parent, transparent, options)

    this.readied = false
    this.readyCallback = () => {}

    this.state.add('Boot', Boot, false)
    this.state.add('Preload', Preload, false)
    this.mainState = this.state.add('Main', Main, false)
    this.roundingState = this.state.add('Rounding', Rounding, false)
    this.state.add('Drawing', Drawing, false)

    this.state.start('Boot')
  }

  /**
   * @description 走地前動畫
   * @param  {Object} res - 走地前賽果資料
   * @return {Promise}
   */
  startAnimation(res) {
    if (this.state.current !== 'Main') {
      return new Promise((resolve) => {
        resolve()
      })
    }
    return this.mainState.play(res)
  }

  /**
   * @description 走地動畫
   * @param  {Object} res - 賽果資料
   * @return {Promise}
   */
  endAnimation(res) {
    if (this.state.current !== 'Rounding') {
      return new Promise((resolve) => {
        resolve()
      })
    } else {
      return this.roundingState.play(res)
    }
  }

  /**
   * @description 動畫skip
   */
  skip() {
    this.paused = true
    this.info.gameInProgress = false
    this.animationEnd()
  }

  /**
   * @description 動畫重新開始
   */
  start() {
    this.paused = false
    this.state.start('Main')
  }

  /**
   * @description 跳至走地畫面
   * @param  {Object} res - 走地前賽果資料
   */
  roundingTime(res) {
    this.paused = false
    this.state.start('Rounding', true, false, res)
  }

  /**
   * @description 更新投注分佈
   * @param  {Object} data - 投注分佈資料
   */
  updateDistribution(data) {
    this.distribution && this.distribution.updateAll(data)
  }

  /**
   * @description 開獎前20秒摳
   */
  first20Seconds() {
    if (this.sounds) {
      this.sound.removeByKey('bgm')
      this.sounds.bgm20.play()
    }
  }

  /**
   * @description 改變期數
   * @param  {String} num - 期數
   */
  changeNum(num) {
    this.distrText.setText(g11n.t('game.num', { replaces: { ':no': num } }))
  }

  /**
   * @description ...
   */
  onReady(callback) {
    this.readyCallback = callback
  }
}
