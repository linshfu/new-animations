/* global Phaser */

import Distr from '../objs/Distr'
import Soccer from '../objs/Soccer'
import CardGroup from '../objs/CardGroup'
import BettingTips from '../objs/BettingTips'
import { get } from 'lodash'

export default class Main extends Phaser.State {
  init(opt) {
    this.opt = opt
  }

  create() {
    this.game.cd.hide()
    this.isDrawing = false

    // distr
    this.game.distrFirstHost = new Distr(this.game, 12, 225, 0xb83636, {
      goal: get(this.opt, 'distribution.goal_home'),
      hit: get(this.opt, 'distribution.hit_home'),
      miss: get(this.opt, 'distribution.out_home')
    })
    this.game.add.existing(this.game.distrFirstHost)

    this.game.distrFirstGuest = new Distr(this.game, 514, 225, 0x4d79ca, {
      goal: get(this.opt, 'distribution.goal_away'),
      hit: get(this.opt, 'distribution.hit_away'),
      miss: get(this.opt, 'distribution.out_away')
    })
    this.game.add.existing(this.game.distrFirstGuest)

    // ball
    this.ball = new Soccer(this.game, this.game.world.centerX, 95)
    this.game.add.existing(this.ball)

    // CardGroup
    this.cardGroupHost = new CardGroup(this.game, 82, 86)
    this.game.add.existing(this.cardGroupHost)

    this.cardGroupGuest = new CardGroup(this.game, 438, 86)
    this.game.add.existing(this.cardGroupGuest)

    // arraw
    this.arraw = new BettingTips(this.game)
  }

  stopDecor() {
    this.ball.stop()
    this.arraw.stop()
  }

  drawing(res) {
    if (this.isDrawing) return

    this.game.cd.hide()
    this.game.result = res
    this.ball.visible = false
    this.arraw.stop()

    this.game.distrFirstHost.visible = false
    this.game.distrFirstGuest.visible = false

    this.cardGroupHost.drawingFirst(res.home)
    this.cardGroupGuest.drawingFirst(res.away).then(() => {
      this.state.start('RoundingTime')
    })

    this.isDrawing = true
  }
}
