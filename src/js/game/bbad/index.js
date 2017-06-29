import React from 'react'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor() {
    super()

    this.handleStartBtn = ::this.handleStartBtn
    this.handleRoundingBtn = ::this.handleRoundingBtn
  }

  componentDidMount() {
    this.animation = new Animation(580, 468, this.animationDOM, {
      lang: 'en-us'
    })
    // this.animation.start()
  }

  handleStartBtn() {
    this.animation.start()
  }

  handleRoundingBtn() {
    this.animation.roundingTime()
  }

  render() {
    return (
      <div id="gameResults-wrap">
      <div>
        <button onClick={this.handleStartBtn}>Start</button>
        <button onClick={this.handleRoundingBtn}>Rounding Time</button>
      </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
