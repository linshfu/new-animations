/* global Phaser */

export default class Scoreboard extends Phaser.Group {
  constructor(game, x = 0, y = 0) {
    super(game)

    this.game = game
    this.left = x
    this.top = y

    const bg = new Phaser.Sprite(this.game, 0, 0, 'scoreboard')
    const vs = new Phaser.Sprite(this.game, 113, 58, 'icon_vs')

    this.hostScore = new Phaser.Sprite(this.game, 32, 32, 'Scoreboard_fraction_0')
    this.guestScore = new Phaser.Sprite(this.game, 147, 32, 'Scoreboard_fraction_0')

    this.addMultiple([bg, vs, this.hostScore, this.guestScore])
  }

  setHostScore(s) {
    if (!s.includes('is-goalIn')) return
    this.hostScore.loadTexture('Scoreboard_fraction_1')
  }

  setGuestScore(s) {
    if (!s.includes('is-goalIn')) return
    this.guestScore.loadTexture('Scoreboard_fraction_1')
  }
}
