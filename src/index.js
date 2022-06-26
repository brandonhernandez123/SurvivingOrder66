import Phaser from 'phaser'

const gameState = {}
class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }
  preload() {
    this.load.image('cover', 'src/assets/cover.png')
    this.load.audio('theme', 'src/assets/themesong.mp3')
  }

  create() {
    const theme = this.sound.add('theme')
    theme.play()
    this.add.image(400, 300, 'cover')
    this.add.text(250, 400, 'Surviving: Order 66', {
      fontSize: '32px',
      fill: '#ffe135'
    })
    this.add.text(250, 500, 'Click to Start', {
      fontSize: '32px',
      fill: '#ffe135'
    })

    this.input.on('pointerup', () => {
      theme.stop()
      this.scene.stop('Menu')
      this.scene.start('Demo')
    })
  }

  update() {}
}

class Demo extends Phaser.Scene {
  constructor() {
    super({ key: 'Demo' })
  }

  preload() {
    this.load.spritesheet('player_walk', 'src/assets/player_walk.png', {
      frameWidth: 67,
      frameHeight: 80
    })

    this.load.spritesheet('player_attack1', 'src/assets/player_attack.png', {
      frameWidth: 60,
      frameHeight: 70
    })
  }

  create() {
    gameState.active = true
    gameState.player = this.physics.add.sprite(80, 500, 'player_walk')
    gameState.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player_walk', {
        start: 0,
        end: 10
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'attack1',
      frames: this.anims.generateFrameNumbers('player_attack1', {
        start: 0,
        end: 11
      }),
      frameRate: 2,
      repeat: -1
    })

    this.add.text(200, 200, 'Demo Page Working?')

    gameState.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(350)
        gameState.player.anims.play('walk', true)
        gameState.player.flipX = false
      } else if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-350)
        gameState.player.anims.play('walk', true)
        gameState.player.flipX = true
      } else {
        gameState.player.setVelocityX(0)
        gameState.player.anims.play('walk', false)
      }
      if (gameState.cursors.space.isDown) {
        gameState.player.anims.play('attack1', true)
      }
    }
  }
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
  scene: [Menu, Demo]
}

const game = new Phaser.Game(config)
