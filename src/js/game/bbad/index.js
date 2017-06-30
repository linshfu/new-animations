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
        master: {
          goal: 10,
          hit: 20,
          miss: 30
        },
        guest: {
          goal: 10,
          hit: 20,
          miss: 30
        }
      }
    })
    this.animation.start()
  }

  handleStartBtn() {
    this.animation.start()
  }

  handleRoundingBtn() {
    this.animation.roundingTime()
  }

  handleDistrBtn() {
    this.animation.updateDistrFirst({
      master: {
        goal: 40,
        hit: 50,
        miss: 10
      },
      guest: {
        goal: 33,
        hit: 33,
        miss: 34
      }
    })
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
