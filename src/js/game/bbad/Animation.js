import AnimationGame from '../AnimationGame'

export default class Animation extends AnimationGame {
  constructor(width, height, parent, transparent, options) {
    super(width, height, parent, transparent, options)

    this.width = width
  }
}
