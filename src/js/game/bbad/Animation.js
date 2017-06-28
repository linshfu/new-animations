import Events from './Events'
import AnimationGame from '../AnimationGame'
import Boot from './states/Boot'
import Preload from './states/Preload'
import Main from './states/Main'

export default class Animation extends AnimationGame {
  constructor(width, height, parent, transparent, options) {
    super(width, height, parent, transparent, options)

    this.events = new Events()

    this.state.add('Boot', Boot, false)
    this.state.add('Preload', Preload, false)
    this.state.add('Main', Main, false)

    this.state.start('Boot')
  }
}
