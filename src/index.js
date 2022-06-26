import Phaser from 'phaser'
import StartScene from './StartScreen'
const gameState = {}
export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }
  preload() {}

  create() {}
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: true,
      enableBody: true
    }
  },
  scene: [StartScene, MyGame]
}

const game = new Phaser.Game(config)
