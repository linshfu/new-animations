import React from 'react'
import Cookies from 'js-cookie'
import GameIndex from '../GameIndex'
import Animation from './Animation'

export default class Index extends GameIndex {
  constructor(props) {
    super(props)

    const isMute = Cookies.get('isMute') === 'true'

    this.state = {
      isMute,
      isGameOpen: false,
      theFirstEnd: false,
      theSecondEnd: false
    }

    this.handle1stBtn = ::this.handle1stBtn
    this.handle2ndBtn = ::this.handle2ndBtn
    this.handle3rdBtn = ::this.handle3rdBtn
    this.handle4Btn = ::this.handle4Btn
    this.handleMute = ::this.handleMute
    this.handle20s = ::this.handle20s
    this.handleSkip = ::this.handleSkip
  }

  componentDidMount() {
    this.animation = new Animation(580, 468, this.animationDOM, false, {
      lang: 'en-us',
      resultNote: 'The distribution will be changed by the number of purchase, but the result will not be affected.'
    })

    // this.animation.onLoadComplete(() => {
    //   this.animation.roundingTime({
    //     start: 'left'
    //   })
    // })
  }

  async handle1stBtn() {
    const result = {
      start: 'left'
    }

    this.setState({
      theFirstEnd: true,
      theSecondEnd: true
    })

    await this.animation.startAnimation(result)

    this.setState({
      theSecondEnd: false
    })
  }

  async handle2ndBtn() {
    const result = {
      start: 'left',
      stairs: '4',
      end: 'odd'
    }

    this.setState({
      theSecondEnd: true
    })

    await this.animation.endAnimation(result)

    this.setState({
      theFirstEnd: false,
      theSecondEnd: false
    })
  }

  handle3rdBtn() {
    const result = {
      start: 'left'
    }
    this.animation.roundingTime(result)
  }

  handle4Btn() {
    this.animation.start()
  }

  handleMute() {
    this.animation.setMute(!this.state.isMute)
    Cookies.set('isMute', !this.state.isMute, { expires: 7 })
    this.setState({
      isMute: !this.state.isMute
    })
  }

  handle20s() {
    this.animation.first20Seconds()
  }

  handleSkip() {
    this.animation.skip()
  }

  render() {
    return (
      <div id="gameResults-wrap">
        <div>
          <button onClick={this.handle1stBtn}>11111111</button>
          <button onClick={this.handle2ndBtn}>2222222</button>
          <button onClick={this.handle3rdBtn}>走地</button>
          <button onClick={this.handle4Btn}>restart</button>
          <button onClick={this.handleMute}>{(this.state.isMute) ? 'volume 0' : 'volume 100'}</button>
          <button onClick={this.handle20s}>前20秒</button>
          <button onClick={this.handleSkip}>skip</button>
        </div>
        <div ref={(r) => { this.animationDOM = r }}></div>
      </div>
    )
  }
}
