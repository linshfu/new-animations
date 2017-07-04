import React from 'react'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor() {
    super()

    this.handleStartBtn = ::this.handleStartBtn
    this.handleRoundingBtn = ::this.handleRoundingBtn
    this.handleDistrBtn = ::this.handleDistrBtn
    this.handleDrawingFirstBtn = ::this.handleDrawingFirstBtn
  }

  componentDidMount() {
    this.animation = new Animation(750, 390, this.animationDOM, {
      distr: {
        host: {
          goal: 80,
          hit: 20,
          miss: 0
        },
        guest: {
          goal: 10,
          hit: 60,
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
      host: {
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

  handleDrawingFirstBtn() {
    this.animation.drawingFirst({
      host: {
        goalpostleft: ['diamonds', 10],
        goalpostright: ["hearts", 3]
      },
      guest: {
        goalpostleft: ['clubs', 5],
        goalpostright: ["diamonds", 1]
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
        <div>
          <button onClick={this.handleDrawingFirstBtn}>Drawing 1</button>
        </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
