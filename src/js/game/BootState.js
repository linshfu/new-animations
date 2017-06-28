/* global Phaser */

export default class BootState extends Phaser.State {
  init() {
    // 非重整進入頁面時尚未找到 React render 產生的 DOM，所以要再作一次動作
    Phaser.Canvas.addToDOM(this.game.canvas, this.game.parent, false)
    Phaser.Canvas.setTouchAction(this.game.canvas)
  }

  preload() {
    this.game.load.image('bbinlogo', '/img/game/loadingbg.png')
  }
}
