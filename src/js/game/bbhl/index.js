import React from 'react'
import { get } from 'lodash'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor() {
    super()

    this.state = {
      isHidden: document.hidden,
      isDrawing: false
    }

    this.handleStartBtn = ::this.handleStartBtn
    this.handleEnableBtn = ::this.handleEnableBtn
    this.handleSkipBtn = ::this.handleSkipBtn
    this.onVisibilitychange = ::this.onVisibilitychange
  }

  componentDidMount() {
    this.animation = new Animation(750, 500, this.animationDOM)

    this.animation.onDraw(() => {
      this.setState({
        isDrawing: true
      })
    })

    this.animation.onComplete(() => {
      this.setState({
        isDrawing: false
      })
    })

    document.addEventListener('visibilitychange', this.onVisibilitychange)
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.onVisibilitychange)
  }

  onVisibilitychange() {
    if (document.hidden && this.state.isDrawing) {
      this.animation.skip()
    }

    this.setState({
      isHidden: document.hidden
    })
  }

  handleStartBtn() {
    this.animation.start({
      "01": parseInt(this.resultLeftValue.value, 10)
    }, document.hidden)
  }

  handleEnableBtn() {
    this.animation.enableClick({
      "01": parseInt(this.resultLeftValue.value, 10),
      "02": parseInt(this.resultRightValue.value, 10)
    })
  }

  handleSkipBtn() {
    this.animation.skip()
  }

  render() {
    return (
      <div id="gameResults-wrap">
        <div>
          <input type="number" style={{ width: '100px' }} ref={(r) => {this.resultLeftValue = r}} defaultValue="8" />
          <button onClick={this.handleStartBtn}>Start</button>
          <input type="number" style={{ width: '100px' }} ref={(r) => {this.resultRightValue = r}} defaultValue="5" />
          <button onClick={this.handleEnableBtn}>EnableClick</button>
          <button onClick={this.handleSkipBtn}>Skip</button>
        </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
