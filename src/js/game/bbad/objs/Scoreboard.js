/* global Phaser */

export default class Scoreboard extends Phaser.Group {
  constructor(game, x = 0, y = 0) {
    super(game)

    this.game = game
    this.left = x
    this.top = y

    const textStyle = {
      font: 'bold 40pt Arial',
      fill: 'white',
      align: 'center'
    }

    const bg = new Phaser.Sprite(this.game, 0, 0, 'scoreboard')

    this.hostScore = new Phaser.Text(this.game, 65, 68, 0, textStyle)
    this.guestScore = new Phaser.Text(this.game, 180, 68, 0, textStyle)

    this.hostScore.anchor.set(0.5)
    this.guestScore.anchor.set(0.5)

    this.addMultiple([bg, this.hostScore, this.guestScore])
  }

  setHostScore(s) {
    if (!s.includes('is-goalIn')) return
    this.hostScore.setText(1)
  }

  setGuestScore(s) {
    if (!s.includes('is-goalIn')) return
    this.guestScore.setText(1)
  }
}
