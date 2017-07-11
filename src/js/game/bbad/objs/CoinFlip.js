/* global Phaser */

export default class CoinFlip extends Phaser.Group {
  constructor(game, x, y) {
    super(game)

    this.game = game
    this.left = x
    this.top = y

    this.hand = new Phaser.Sprite(this.game, -36, -15, 'CoinFlip_hand_1')
    this.coin = new Phaser.Sprite(this.game, 0, 0, 'coin')
    this.coinMain = new Phaser.Sprite(this.game, -9, -290, null)
    this.coinShadow = new Phaser.Sprite(this.game, -9, 120, 'CoinFlip_shadow')

    this.coin.animations.add('flip')

    this.addMultiple([this.coinShadow, this.coinMain, this.hand, this.coin])

    this.visible = false
  }

  flip(res) {
    return new Promise((resolve) => {

      const tweenRes = this.game.add.tween(this.coinMain).to({ y: 0 }, 500, Phaser.Easing.Circular.InOut)

      tweenRes.onUpdateCallback((a, b) => {
        this.coinShadow.alpha = b
      })

      tweenRes.onComplete.add(() => {
        setTimeout(() => {
          this.visible = false
          resolve()
        }, 750)
      })

      const tweenCoin = this.game.add.tween(this.coin).to({ y: -230 }, 1000, Phaser.Easing.Cubic.Out)

      tweenCoin.onComplete.add(() => {
        tweenRes.start()
        this.hand.visible = false
      })

      tweenCoin.onStart.add(() => {
        this.hand.loadTexture('CoinFlip_hand_2')
      })

      setTimeout(() => {
        tweenCoin.start()
        this.coin.animations.play('flip', 5)
      }, 500)

      this.coinMain.loadTexture(`CoinFlip_${res}`)

      this.visible = true
    })
  }
}
