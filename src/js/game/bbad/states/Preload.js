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

    this.game.load.image('game_bg', 'game_bg.png')
    this.game.load.image('soccer_ball', 'soccer.png')

    // 倒數
    this.game.load.image('countdown_hand', 'stopwatch/countdown_hand_1.png')
    this.game.load.image('countdown_hand2', 'stopwatch/countdown_hand_2.png')
    for (let i=0; i<=5; i++) {
      this.game.load.image(`countdown_num_${i}`, `stopwatch/countdown_num_${i}.png`)
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
      this.game.load.image(`${l}_result_draw`, `lang/${l}/result_draw.png`)
      this.game.load.image(`${l}_result_away`, `lang/${l}/result_away.png`)
      this.game.load.image(`${l}_result_home`, `lang/${l}/result_home.png`)
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
