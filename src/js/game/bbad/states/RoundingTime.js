/* global Phaser */

import CardGroup from '../objs/CardGroup'

export default class RoundingTime extends Phaser.State {
  create() {
    this.game.add.text(0, 0, 'RoundingTime', {
      fill: 'white'
    })

    // CardGroup
    this.cardGroupHost = new CardGroup(this.game, 0, 0, this.game.result.host)
    this.game.add.existing(this.cardGroupHost)

    this.cardGroupGuest = new CardGroup(this.game, 400, 0, this.game.result.guest)
    this.game.add.existing(this.cardGroupGuest)
  }
}
