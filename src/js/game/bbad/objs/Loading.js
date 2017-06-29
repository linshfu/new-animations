/* global Phaser */

export default class Loading extends Phaser.Group {
  constructor(game) {
    super(game)

    this.game = game

    const rect = new Phaser.Graphics(this.game, 0, 0)
    rect.beginFill(0x000000, 1)
    rect.drawRect(0, 0, this.game.width, this.game.height)

    const bbinlogo = new Phaser.Sprite(this.game, this.game.world.centerX, this.game.world.centerY, 'bbinlogo')
    bbinlogo.anchor.setTo(0.5)

    this.progress = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY + 140, '%', {
      font: '30px Arial',
      fill: '#D49f9f'
    })
    this.progress.anchor.set(0.5)

    this.addMultiple([rect, bbinlogo, this.progress])
  }

  updateProgress(num) {
    this.progress.setText(`${num}%`)
  }
}
