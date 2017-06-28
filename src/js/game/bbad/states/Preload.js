import PreloadState from '../../PreloadState'

export default class Preload extends PreloadState {
  preload() {
    this.game.load.audio('bgm', 'sound/bbge/bgm.mp3')
    this.game.load.audio('bgm20', 'sound/bbge/bgm20.mp3')
    this.game.load.audio('crowed_reciprocal', 'sound/bbge/crowed_reciprocal.mp3')
    this.game.load.audio('crowed_reciprocal_right', 'sound/bbge/crowed_reciprocal_right.mp3')
    this.game.load.audio('crowed_reciprocal_left', 'sound/bbge/crowed_reciprocal_left.mp3')
    this.game.load.audio('crowed_opening', 'sound/bbge/crowed_opening.mp3')
    this.game.load.audio('egg_fall', 'sound/bbge/egg_fall.mp3')
    this.game.load.audio('eggshell', 'sound/bbge/eggshell.mp3')
    this.game.load.audio('lake', 'sound/bbge/lake.mp3')
    this.game.load.audio('lake_1', 'sound/bbge/lake_1.mp3')
    this.game.load.audio('lake_2', 'sound/bbge/lake_2.mp3')
    this.game.load.audio('opening', 'sound/bbge/opening.mp3')

    this.game.load.path = '/img/game/bbge/'

    this.game.load.image('ladder', 'ladder.png')
    this.game.load.image('stair', 'stair.png')

    this.game.load.image('game_bg', 'game_bg.png')
    this.game.load.image('icon_vs', 'icon_vs.png')
    this.game.load.image('footsteps', 'footsteps.png')
    this.game.load.image('chick_egg_fall', 'chick_egg_fall.png')
    this.game.load.image('leaf', 'leaf.png')
    this.game.load.image('stone_big', 'stone_big.png')
    this.game.load.image('stone_big_top', 'stone_big_top.png')
    this.game.load.image('stone_small', 'stone_small.png')

    this.game.load.atlasJSONHash('lake_wave', 'lake_wave.png', 'lake_wave.json')
    this.game.load.atlasJSONHash('chick_one_hand', 'chick_one_hand.png', 'chick_one_hand.json')
    this.game.load.atlasJSONHash('chick_two_hand', 'chick_two_hand.png', 'chick_two_hand.json')
    this.game.load.atlasJSONHash('eggshell', 'eggshell.png', 'eggshell.json')
    this.game.load.atlasJSONHash('flower1', 'flower1.png', 'flower1.json')
    this.game.load.atlasJSONHash('flower2', 'flower2.png', 'flower2.json')
    this.game.load.atlasJSONHash('flower3', 'flower3.png', 'flower3.json')
    this.game.load.atlasJSONHash('decorChick1', 'decorChick1.png', 'decorChick1.json')
    this.game.load.atlasJSONHash('decorChick2_a', 'decorChick2_a.png', 'decorChick2_a.json')
    this.game.load.atlasJSONHash('decorChick2_b', 'decorChick2_b.png', 'decorChick2_b.json')
    this.game.load.atlasJSONHash('decorChick3_a', 'decorChick3_a.png', 'decorChick3_a.json')
    this.game.load.atlasJSONHash('decorChick3_b', 'decorChick3_b.png', 'decorChick3_b.json')
    this.game.load.atlasJSONHash('decorChick4_a', 'decorChick4_a.png', 'decorChick4_a.json')
    this.game.load.atlasJSONHash('decorChick4_b', 'decorChick4_b.png', 'decorChick4_b.json')
    this.game.load.atlasJSONHash('decorChick5', 'decorChick5.png', 'decorChick5.json')
    this.game.load.atlasJSONHash('decorChick6', 'decorChick6.png', 'decorChick6.json')
    this.game.load.atlasJSONHash('decorChick7', 'decorChick7.png', 'decorChick7.json')

    const lang = ['en-us', 'es', 'id', 'ja-jp', 'ko-kr', 'th', 'vi', 'zh-cn', 'zh-tw']
    lang.forEach((l) => {
      this.game.load.image(`${l}_basket_blue`, `lang/${l}/basket_blue.png`)
      this.game.load.image(`${l}_basket_red`, `lang/${l}/basket_red.png`)
    })
  }

  exit() {
    this.state.start('Main')
  }
}
