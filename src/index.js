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
let player
let platforms
class Demo extends Phaser.Scene {
  constructor() {
    super({ key: 'Demo' })
  }

  preload() {
    this.load.spritesheet('player_idle', 'src/assets/player_idle.png', {
      frameWidth: 124 / 2,
      frameHeight: 64
    })
    this.load.spritesheet('player_run', 'src/assets/player_run.png', {
      frameWidth: 512 / 8,
      frameHeight: 64
    })

    this.load.spritesheet('player_attack1', 'src/assets/player_attack.png', {
      frameWidth: 60,
      frameHeight: 70
    })

    this.load.spritesheet('player_endrun', 'src/assets/player_endrun.png', {
      frameWidth: 256 / 4,
      frameHeight: 64
    })

    this.load.spritesheet('player_attack', 'src/assets/player_attack.png', {
      frameWidth: 1920 / 15,
      frameHeight: 64
    })

    this.load.image('bg1', 'src/assets/Background-forest_01.png')
    this.load.image('bg2', 'src/assets/Background-forest_02.png')

    this.load.image('bg3', 'src/assets/Background-forest_03.png')
    this.load.image('bg4', 'src/assets/Background-forest_04.png')
    this.load.image('bg5', 'src/assets/Background-forest_05.png')
    this.load.image('bg6', 'src/assets/Background-forest_06.png')
    this.load.image('bg7', 'src/assets/Background-forest_07.png')
    this.load.image('bg8', 'src/assets/Background-forest_08.png')
    this.load.image('platform', 'src/assets/Background-forest_09.png')
    this.load.image('bg9', 'src/assets/longplatform.png')
  }

  create() {
    gameState.active = true

    platforms = this.physics.add.staticGroup()
    gameState.background = this.add.sprite(0, 0, 'bg1')
    gameState.bg4 = this.add.sprite(0, 0, 'bg4')
    gameState.bg5 = this.add.sprite(0, 0, 'bg5')
    gameState.bg6 = this.add.sprite(0, 0, 'bg8')
    gameState.bg7 = this.add.sprite(0, 0, 'bg7')
    gameState.bg8 = this.add.sprite(0, 0, 'bg8')

    platforms.create(400, 1000, 'bg3')
    player = this.physics.add.sprite(0, 0, 'player_idle')

    player.setCollideWorldBounds(true)
    player.setScale(3.0)

    this.physics.add.collider(player, platforms)

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player_idle', {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'player_run',
      frames: this.anims.generateFrameNumbers('player_run', {
        start: 0,
        end: 7
      }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'player_attack',
      frames: this.anims.generateFrameNumbers('player_attack', {
        start: 1,
        end: 15
      }),
      frameRate: 1,
      repeat: -1
    })

    gameState.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        player.setVelocityX(350)
        player.flipX = false
        player.anims.play('player_run', true)
      } else if (gameState.cursors.left.isDown) {
        player.setVelocityX(-350)
        player.flipX = true
        player.anims.play('player_run', true)
      } else {
        player.setVelocityX(0)
        player.anims.play('idle', true)
      }
      if (gameState.cursors.space.isDown) {
        player.anims.play('player_attack', true)
      } else {
        player.anims.play('idle', true)
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
  scene: [Demo]
}

const game = new Phaser.Game(config)
