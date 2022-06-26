import Phaser from 'phaser'
import MyGame from './index'
export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene')
  }

  preload() {
    this.load.image('cover', 'src/assets/cover.png')
    this.load.audio('theme', 'src/assets/themesong.mp3')
  }

  create() {
    this.add.image(400, 200, 'cover')
    this.add.text(300, 300, 'Surviving:\n Order 66', {
      fontSize: '32px',
      fill: '#FFE81F'
    })
    this.add.text(250, 500, 'Click to start', {
      fontSize: '32px',
      fill: '#FFE81F'
    })
    theme = this.sound.add('theme')
    theme.play()
  }

  update() {
    this.input.on('pointerup', () => {
      this.scene.stop(StartScene)
      this.scene.start(MyGame)
    })
  }
}
