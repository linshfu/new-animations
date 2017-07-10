/* global Phaser */

import ProgressBar from './ProgressBar'

export default class DistrRounding extends Phaser.Group {
  constructor(game, x, y, data) {
    super(game)

    this.game = game
    this.data = data
    this.left = x
    this.top = y

    this.bars = {}

    this.homeGroup = new Phaser.Group(this.game, null)
    this.drawGroup = new Phaser.Group(this.game, null)
    this.awayGroup = new Phaser.Group(this.game, null)

    this.bars.home = new ProgressBar(this.game, 5, 57, this.data['home'], 0xb83636)
    this.bars.draw = new ProgressBar(this.game, 5, 57, this.data['draw'], 0x008337)
    this.bars.away = new ProgressBar(this.game, 5, 57, this.data['away'], 0x2a84d2)

    this.homeGroup.addMultiple([new Phaser.Sprite(this.game, 0, 0, 'icon_purchase_home'), this.bars.home])
    this.drawGroup.addMultiple([new Phaser.Sprite(this.game, 0, 0, 'icon_purchase_draw'), this.bars.draw])
    this.awayGroup.addMultiple([new Phaser.Sprite(this.game, 0, 0, 'icon_purchase_away'), this.bars.away])

    this.drawGroup.left = 89
    this.awayGroup.left = 178

    this.addMultiple([this.homeGroup, this.drawGroup, this.awayGroup])
  }

  updateAll(data) {
    this.bars.home.updateDistr(data['home'])
    this.bars.draw.updateDistr(data['draw'])
    this.bars.away.updateDistr(data['away'])
  }
}
