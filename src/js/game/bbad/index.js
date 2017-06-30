import React from 'react'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor() {
    super()

    this.handleStartBtn = ::this.handleStartBtn
    this.handleRoundingBtn = ::this.handleRoundingBtn
    this.handleDistrBtn = ::this.handleDistrBtn
  }

  componentDidMount() {
    this.animation = new Animation(580, 468, this.animationDOM, {
      distr: {
        odd: 100
      }
    })
    this.animation.start()
  }

  async startAnim() {
    await this.animation.start()
  }

  handleStartBtn() {
    this.animation.start()
  }

  handleRoundingBtn() {
    this.animation.roundingTime()
  }

  handleDistrBtn() {
    this.animation.updateDistr(80)
  }

  render() {
    return (
      <div id="gameResults-wrap">
        <div>
          <button onClick={this.handleStartBtn}>Start</button>
          <button onClick={this.handleRoundingBtn}>Rounding Time</button>
          <button onClick={this.handleDistrBtn}>Update Distr</button>
        </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
