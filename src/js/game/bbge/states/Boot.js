import BootState from '../../BootState'
import g11n from '../../../business/g11n'

export default class Boot extends BootState {
  create() {
    // 失去焦點後skip
    this.game.stage.visibilityChange = (event) => {
      if (event.type.includes('visibilitychange') && this.game.info.gameInProgress) {
        this.game.skipCallback(this)
        this.game.skip()
      }
    }

    this.game.sound.mute = true

    this.game.stage.backgroundColor = '#c0e3dd'

    // 購買分佈文字
    this.game.distrText = this.game.add.text(10, 392, '', {
      font: 'normal 16px "Microsoft JhengHei"',
      fill: '#57a7ae',
      align: 'center',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    })
    this.game.distrText.setTextBounds(0, 0, 140, 20)

     // 警語
    let font = 'normal 12px Microsoft JhengHei, STHeiti Light'
    if (this.game.device.safari) font = 'bold 13px Arial'
    const note = this.game.add.text(190, 385, g11n.t('game.resultNote'), {
      font: `${font}`,
      fill: '#e7f3d6',
      wordWrap: true,
      wordWrapWidth: 360,
      boundsAlignV: 'middle'
    })
    note.resolution = window.devicePixelRatio
    note.lineSpacing = -8
    note.setTextBounds(0, 0, 390, 30)

    const group = this.game.add.group()
    group.addMultiple([this.game.distrText, note])
    this.game.stage.addChild(group)

    this.state.start('Preload', true, false, 'Main')
  }
}
