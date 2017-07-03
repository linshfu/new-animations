/* global Phaser */

export default class Poker extends Phaser.Group {
  constructor(game) {
    super(game)

    this.game = game
    this.frontKey = null

    this.back = new Phaser.Sprite(this.game, 100, 100, 'poker_back')
    this.back.anchor.set(0.5)

    this.addMultiple([this.back])
  }

  filpFront() {
    return new Promise((resolve) => {
      const animFront = this.game.add.tween(this.back.scale)

      animFront.to({
        x: this.back.scale.x * 0
      }, 250, Phaser.Easing.Cubic.In)

      animFront.onComplete.addOnce(() => {
        resolve()
      })

      animFront.start()
    })
  }

  filpBack(facadeKey) {
    return new Promise((resolve) => {
      if (this.back.key === 'poker_back') {
        this.back.loadTexture(facadeKey)
      } else {
        this.back.loadTexture('poker_back')
      }

      const animBack = this.game.add.tween(this.back.scale)
      animBack.to({ x: 1 }, 250, Phaser.Easing.Cubic.Out)
      animBack.onComplete.addOnce(() => {
        this.back.key === 'poker_back' ? this.isFront = false : this.isFront = true
        resolve()
      })
      animBack.start()
    })
  }

  filp([suit, num]) {
    return new Promise((resolve) => {
      this.filpFront().then(() => {
        return this.filpBack(`${suit}_${num}`)
      }).then(() => {
        resolve()
      })
    })
  }
}
