import React from 'react'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor() {
    super()

  }

  componentDidMount() {
    this.animation = new Animation(750, 500, this.animationDOM)
    this.animation.start()
  }

  render() {
    return (
      <div id="gameResults-wrap">
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
