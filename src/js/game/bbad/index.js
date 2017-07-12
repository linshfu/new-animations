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
    this.handleDrawingSecondBtn = ::this.handleDrawingSecondBtn
    this.handleCountdownBtn = ::this.handleCountdownBtn
  }

  componentDidMount() {
    this.animation = new Animation(750, 326, this.animationDOM)
    this.animation.start()
  }

  animDrawingFirst() {
    this.animation.drawingFirst({
      home: {
        goalpostleft: ['diamonds', 10],
        goalpostright: ['hearts', 3]
      },
      away: {
        goalpostleft: ['clubs', 5],
        goalpostright: ['diamonds', 1]
      }
    })
    setTimeout(() => {
      this.animation.countdown(5).then(() => {
        this.animDrawingSecond()
      })
    }, 40000)
  }

  animDrawingSecond() {
    this.animation.drawingSecond({
      home: {
        ball: ['clubs', 5],
        goalpostleft: ['diamonds', 10],
        goalpostright: ['hearts', 3],
        shootresult: 'is-goalIn'
      },
      away: {
        ball: ['spades', 6],
        goalpostleft: ['clubs', 5],
        goalpostright: ['diamonds', 1],
        shootresult: 'is-goalIn'
      },
      winresult: 'draw',
      firstkick: 'home'
    })
  }

  handleStartBtn() {
    this.animation.start()
  }

  handleRoundingBtn() {
    this.animation.roundingTime({
      home: {
        goalpostleft: ['diamonds', 10],
        goalpostright: ["hearts", 3]
      },
      away: {
        goalpostleft: ['clubs', 5],
        goalpostright: ["diamonds", 1]
      }
    })
  }

  handleDistrBtn() {
    this.animation.updateDistrFirst({
      home: {
        goal: 40,
        hit: 50,
        miss: 10
      },
      away: {
        goal: 33,
        hit: 33,
        miss: 34
      }
    })
  }

  handleDrawingFirstBtn() {
    this.animDrawingFirst()
  }

  handleDrawingSecondBtn() {
    this.animDrawingSecond()
  }

  handleCountdownBtn() {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
    }
    this.animation.countdown(5).then(() => {
      this.animDrawingFirst()
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
          <button onClick={this.handleCountdownBtn}>Countdown</button>
          <button onClick={this.handleDrawingFirstBtn}>Drawing 1</button>
          <button onClick={this.handleDrawingSecondBtn}>Drawing 2</button>
        </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
