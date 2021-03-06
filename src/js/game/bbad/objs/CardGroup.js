/* global Phaser */

import Poker from './Poker'

export default class CardGroup extends Phaser.Group {
  constructor(game, x, y, result) {
    super(game)

    this.game = game
    this.left = x
    this.top = y
    this.result = result

    for (let i = 0; i < 3; i++) {
      const y = (i === 1) ? 19 : 0
      this.addChild(new Poker(this.game, i * (66 + 16), y))
    }

    if (result) {
      this.getAt(0).suit(this.result.goalpostleft)
      this.getAt(2).suit(this.result.goalpostright)
    }
  }

  async drawingFirst(res) {
    try {
      await this.getAt(0).filp(res.goalpostleft)
      await this.getAt(2).filp(res.goalpostright)
    } catch (e) {
      console.error(e)
    }
  }

  async drawingSecond(res) {
    try {
      await this.getAt(1).filp(res.ball)
    } catch (e) {
      console.error(e)
    }
  }
}
