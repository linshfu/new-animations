import React from 'react'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  componentDidMount() {
    this.animation = new Animation(580, 468, this.animationDOM, false, {
      lang: 'en-us'
    })
  }

  render() {
    return (
      <div id="gameResults-wrap">
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
