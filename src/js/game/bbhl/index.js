import React from 'react'
import { get } from 'lodash'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor() {
    super()

    this.handleStartBtn = ::this.handleStartBtn
    this.handleDrawingBtn = ::this.handleDrawingBtn
  }

  componentDidMount() {
    this.animation = new Animation(750, 500, this.animationDOM)
  }

  handleStartBtn() {
    this.animation.start({
      "01": parseInt(this.resultLeftValue.value, 10)
    })
  }

  handleDrawingBtn() {
    this.animation.drawing({
      "01": parseInt(this.resultLeftValue.value, 10),
      "02": parseInt(this.resultRightValue.value, 10)
    })
  }

  render() {
    return (
      <div id="gameResults-wrap">
        <div>
          <input type="number" style={{ width: '100px' }} ref={(r) => {this.resultLeftValue = r}} defaultValue="0" />
          <button onClick={this.handleStartBtn}>Start</button>
          <input type="number" style={{ width: '100px' }} ref={(r) => {this.resultRightValue = r}} defaultValue="5" />
          <button onClick={this.handleDrawingBtn}>Drawing</button>
        </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
