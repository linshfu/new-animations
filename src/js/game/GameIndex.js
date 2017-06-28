import { Component } from 'react'

export default class GameIndex extends Component {
  componentWillUnmount() {
    this.animation.destroy()
  }
}
