/* global Phaser */

import Poker from './Poker'

export default class CardGroup extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game
    this.left = x
    this.top = y

    for (let i = 0; i < 3; i++) {
      const y = (i === 1) ? 30 : 0
      this.addChild(new Poker(this.game, i * 110, y))
    }
  }

  async drawingFirst(res) {
    try {
      await this.getAt(0).filp(res.goalpostleft)
      await this.getAt(2).filp(res.goalpostright)
      this.end()
    } catch (e) {
      console.error(e)
    }
  }

  end() {
    console.log('end')
  }
}
