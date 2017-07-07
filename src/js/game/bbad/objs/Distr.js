/* global Phaser */

import ProgressBar from './ProgressBar'

export default class Distr extends Phaser.Group {
  constructor(game, x, y, fill, data) {
    super(game)

    this.game = game
    this.data = data
    this.fill = fill
    this.left = x
    this.top = y

    this.bars = {}

    this.goalGroup = new Phaser.Group(this.game, null, 'resultIcon_goal')
    this.hitGroup = new Phaser.Group(this.game, null, 'resultIcon_hit')
    this.missGroup = new Phaser.Group(this.game, null, 'resultIcon_miss')

    this.bars.percentGoal = new ProgressBar(this.game, 2, 59, this.data['goal'], this.fill)
    this.bars.percentHit = new ProgressBar(this.game, 2, 59, this.data['hit'], this.fill)
    this.bars.percentMiss = new ProgressBar(this.game, 2, 59, this.data['miss'], this.fill)

    this.goalGroup.addMultiple([new Phaser.Sprite(this.game, 0, 0, 'icon_purchase_goal'), this.bars.percentGoal])
    this.hitGroup.addMultiple([new Phaser.Sprite(this.game, 0, 0, 'icon_purchase_agoalposthit'), this.bars.percentHit])
    this.missGroup.addMultiple([new Phaser.Sprite(this.game, 0, 0, 'icon_purchase_miss'), this.bars.percentMiss])

    this.hitGroup.left = 78
    this.missGroup.left = 156

    this.addMultiple([this.goalGroup, this.hitGroup, this.missGroup])
  }

  updateAll(data) {
    this.bars.percentGoal.updateDistr(data['goal'])
    this.bars.percentHit.updateDistr(data['hit'])
    this.bars.percentMiss.updateDistr(data['miss'])
  }
}
