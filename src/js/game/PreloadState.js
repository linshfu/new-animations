/* global Phaser */

export default class PreloadState extends Phaser.State {
  init() {
    this.game.load.onLoadStart.add(this.loadStart, this)
    this.game.load.onFileComplete.add(this.fileComplete, this)
    this.game.load.onLoadComplete.add(this.loadComplete, this)
  }

  create() {
    if (this.game.load.totalLoadedFiles() === 0) this.loadComplete()
  }

  loadStart() {
    this.game.info.loadStart = true

    this.loadingLayer = new Phaser.Group(this.game)
    const rect = this.game.add.graphics(0, 0)

    const bbinlogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bbinlogo')
    bbinlogo.anchor.setTo(0.5)

    this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 140, '%', {
      font: '30px Arial',
      fill: '#D49f9f'
    })
    rect.beginFill(0x000000, 1)
    rect.drawRect(0, 0, this.game.width, this.game.height)
    this.progress.anchor.set(0.5)
    this.loadingLayer.addMultiple([rect, bbinlogo, this.progress])
    this.game.stage.addChildAt(this.loadingLayer, this.game.stage.children.length)
  }

  fileComplete(progress) {
    this.progress.setText(`${progress}%`)
  }

  loadComplete() {
    if (this.loadingLayer) this.loadingLayer.destroy()
    this.game.info.loadComplete = true
    this.exit()
    this.game.onLoadCompleteCallback(this)
  }
}
