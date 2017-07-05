/* global Phaser */

import Loading from '../objs/Loading'

export default class Preload extends Phaser.State {
  init() {
    this.game.load.onLoadStart.add(this.loadStart, this)
    this.game.load.onFileComplete.add(this.fileComplete, this)
    this.game.load.onLoadComplete.add(this.loadComplete, this)
  }

  preload() {
    this.game.load.path = '/img/game/bbad/'

    this.game.load.image('game_day_bg', 'game_day_bg.png')
    this.game.load.image('soccer_ball', 'soccer_ball.png')

    // sound
    this.game.load.spritesheet('btn_day_voice_open', 'btn_day_voice_open.png', 32, 32)
    this.game.load.spritesheet('btn_day_voice_close', 'btn_day_voice_close.png', 32, 32)

    // 倒數
    this.game.load.image('countdown_hand', 'countdown_hand.png')
    for (let i=1; i<=5; i++) {
      this.game.load.image(`countdown_num_${i}`, `countdown_num_${i}.png`)
    }

    // 投注分佈
    this.game.load.image('icon_purchase_agoalposthit', 'icon_purchase_agoalposthit.png')
    this.game.load.image('icon_purchase_goal', 'icon_purchase_goal.png')
    this.game.load.image('icon_purchase_miss', 'icon_purchase_miss.png')

    // 牌
    this.game.load.image('poker_back', 'poker/poker_back.png')
    const suits = ['spades', 'diamonds', 'clubs', 'hearts']
    suits.forEach((s) => {
      for (let i=1; i<=13; i++) {
        this.game.load.image(`${s}_${i}`, `poker/${s}_${i}.png`)
      }
    })

    // 結果
    const lang = ['zh-cn']
    lang.forEach((l) => {
      this.game.load.image(`${l}_result_egalite`, `lang/${l}/result_egalite.png`)
      this.game.load.image(`${l}_result_guest`, `lang/${l}/result_guest.png`)
      this.game.load.image(`${l}_result_host`, `lang/${l}/result_host.png`)
    })

    this.game.load.image('scoreboard', 'scoreboard.png')
  }

  loadStart() {
    this.loading = new Loading(this.game)
    this.game.add.existing(this.loading)
  }

  fileComplete(percent) {
    this.loading.updateProgress(percent)
  }

  loadComplete() {
    this.state.start('Ready')
  }
}
