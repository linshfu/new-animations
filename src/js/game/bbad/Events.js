import { EventEmitter } from 'events'

const GAME_STATE_INIT = 'GAME_STATE_INIT'
const GAME_STATE_OPEN = 'GAME_STATE_OPEN'
const GAME_STATE_CLOSE = 'GAME_STATE_CLOSE'

export default class Events extends EventEmitter {
  constructor() {
    super()

    this.on(GAME_STATE_INIT, this.test)
  }

  test() {
    console.log('on GAME_STATE_INIT')
  }
}
