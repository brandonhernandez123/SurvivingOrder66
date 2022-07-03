import Phaser from 'phaser'

const gameState = {}
class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }
  preload() {}

  create() {}

  update() {}
}

class Demo extends Phaser.Scene {
  constructor() {
    super({ key: 'Demo' })
  }

  preload() {
    this.load.image('bg1', 'src/assets/2.png')
    this.load.image('ground', 'src/assets/7.png')
    this.load.image('bg2', 'src/assets/3.png')
    this.load.image('bg3', 'src/assets/4.png')
    this.load.image('bg4', 'src/assets/8.png')

    this.load.image('ammo', 'src/assets/Tokarev TT-33.png')
    this.load.spritesheet('player', 'src/assets/MaleDetective_Idle2.png', {
      frameWidth: 320 / 5,
      frameHeight: 64
    })
    this.load.spritesheet('walk', 'src/assets/MaleDetective_Walk.png', {
      frameWidth: 640 / 10,
      frameHeight: 64
    })

    this.load.spritesheet('run', 'src/assets/MaleDetective_Run.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('npc_talk_fat', 'src/assets/FatPolice_Talk.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet(
      'player_gun_walk',
      'src/assets/MaleDetective_GunWalk.png',
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )

    this.load.spritesheet('fat_cop_death', 'src/assets/FatPolice_Death.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('blood', 'src/assets/blood.png', {
      frameWidth: 145,
      frameHeight: 131
    })

    this.load.spritesheet(
      'meleekick',
      'src/assets/MaleDetective_LeftKick.png',
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )

    this.load.spritesheet('demonlv1', 'src/assets/demon-idle.png', {
      frameWidth: 160,
      frameHeight: 144
    })

    this.load.spritesheet('demonlv1attack', 'src/assets/demon-attack.png', {
      frameWidth: 240,
      frameHeight: 192
    })

    this.load.image('car-platform', 'src/assets/carplatform.png')
    this.load.image('bullet', 'src/assets/bullet.png')
    this.load.audio('bulletsound', 'src/assets/bulletsound.mp3')
  }

  create() {
    const gameState = {
      bullets: 0,
      hasAmmo: false,
      playerKarma: 0
    }
    this.karma = 0
    const width = this.scale.width
    const height = this.scale.height
    const totalWidth = width * 10

    const createAligned = (scene, totalWidth, texture, scrollFactor) => {
      const w = scene.textures.get(texture).getSourceImage().width
      const count = Math.ceil(totalWidth / w) * scrollFactor

      let x = 0
      for (let i = 0; i < count; ++i) {
        const m = scene.add
          .image(x, scene.scale.height, texture)
          .setOrigin(0, 1)
          .setScrollFactor(scrollFactor)

        x += m.width
      }
    }
    gameState.background = this.add.image(width * 0.5, height * 0.5, 'bg1')
    gameState.background.setScrollFactor(0)

    gameState.ground = this.physics.add.staticGroup()
    gameState.bg2 = createAligned(this, totalWidth, 'bg2', 0.25)
    gameState.bg3 = createAligned(this, totalWidth, 'bg3', 0.5)
    createAligned(this, totalWidth, 'bg4', 1)
    gameState.ground.create(createAligned(this, totalWidth, 'ground', 1.25))

    //sprite info

    this.player = this.physics.add.sprite(0, 0, 'player')

    this.cameras.main.setBounds(0, 0, totalWidth, height)
    this.physics.world.setBounds(0, 0, totalWidth, height)

    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, gameState.ground)

    const car_platform = this.physics.add.staticGroup()
    car_platform.create(400, 250, 'car-platform').refreshBody()
    this.physics.add.collider(this.player, car_platform)

    const npc_fat = this.physics.add.sprite(200, 290, 'npc_talk_fat')
    npc_fat.setCollideWorldBounds(true)

    this.physics.add.overlap(this.player, npc_fat, () => {
      this.add.text(
        180,
        100,
        'Hello Detective\nWe got weirdos alledgly casting demons\nand possessing police and citizens.',
        { fontSize: '12px' }
      )
    })

    // collectables
    gameState.bulletCount = this.add
      .text(200, 0, `bullets: 0`)
      .setScrollFactor(0)

    //ammo:
    let player_health = 0
    gameState.ammo = this.physics.add.staticGroup()
    gameState.ammo.create(600, 260, 'ammo')
    this.physics.add.collider(this.player, gameState.ammo, (x, y) => {
      y.destroy()
      gameState.bullets += 12
      gameState.bulletCount.setText(`bullets:${gameState.bullets}`)
      gameState.hasAmmo = true
    })
    //animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 4
      }),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walk', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'gun_walk',
      frames: this.anims.generateFrameNumbers('player_gun_walk', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'fat_death',
      frames: this.anims.generateFrameNumbers('fat_cop_death', {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: 'blood',
      frames: this.anims.generateFrameNumbers('blood', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: 'meleekick',
      frames: this.anims.generateFrameNumbers('meleekick', {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: 'demonidlelv1',
      frames: this.anims.generateFrameNumbers('demonlv1', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'demon_lv1_attack',
      frames: this.anims.generateFrameNumbers('demonlv1attack', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: 0
    })

    this.healthBarNPCFAT = this.add
      .text(npc_fat.x, npc_fat.y - 90, `HP: 100%`, { fontSize: '12px' })
      .setOrigin(0.5)

    this.bullet = this.physics.add.group({ allowGravity: false })
    this.fireBullet = () => {
      this.gunsound = this.sound.add('bulletsound')
      if (gameState.bullets >= 1) {
        this.bullet.create(this.player.x, this.player.y + 1, 'bullet')
        this.gunsound.play({ seek: 0.5 })
        gameState.bullets--
        gameState.bulletCount.setText(`bullets:${gameState.bullets}`)
      }
    }
    let npc_fat_health = 100
    this.physics.add.collider(npc_fat, this.bullet, (fat, bullet) => {
      npc_fat_health -= 50
      npc_fat.setVelocityX(0)
      bullet.destroy()
      this.healthBarNPCFAT.setText(`HP:${npc_fat_health}%`)
      if (npc_fat_health <= 0) {
        npc_fat.anims.play('fat_death', true)
        npc_fat.anims.play('blood', true)
        this.healthBarNPCFAT.setText(`Negative Karma Gained`)
        this.karma++
      }
    })

    // demonlv1
    this.demonlv1 = this.physics.add.sprite(1200, 0, 'demonlv1').setGravity(0)
    this.demonlv1.setCollideWorldBounds(true)
    this.demonlv1.anims.play('demonidlelv1', true)
    this.demonAttack = this.physics.add.collider(
      this.player,
      this.demonlv1,
      () => {
        this.player.body.setBounceX(1)
      }
    )

    this.demonFollowPlayer = () => {
      if (this.demonlv1.x < this.player.x) {
        this.demonlv1.setVelocityX(100)
        this.demonlv1.anims.play('demonidlelv1', true)
        this.demonlv1.flipX = true
      } else if (this.demonlv1.x > this.player.x) {
        this.demonlv1.setVelocityX(-100)
        this.demonlv1.flipX = false
        this.demonlv1.anims.play('demonidlelv1', true)
      } else {
        this.demonlv1.setVelocityX(0)

        this.demonlv1.anims.play('demon_lv1_attack', true)
      }
    }

    //

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    console.log('karma:', this.karma)
    this.demonFollowPlayer()

    const cam = this.cameras.main
    let speed = 80
    cam.startFollow(this.player)
    let key = ''
    const toggleGun = () => {
      if (this.cursors.shift.isDown) {
        key = 'run'
        speed = 200
      } else {
        key = 'gun_walk'
        speed = 80
      }
    }
    toggleGun()
    console.log('playerx', this.player.x)
    console.log('demonx', this.demonlv1.x)
    // player walk
    if (this.cursors.right.isDown) {
      //   cam.scrollX += speed
      this.player.setVelocityX(speed)
      this.player.flipX = false
      this.player.anims.play(key, true)
    } else if (this.cursors.left.isDown) {
      //   cam.scrollX -= speed
      this.player.setVelocityX(-speed)
      this.player.flipX = true
      this.player.anims.play(key, true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('gun_walk', false)
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.player.setVelocityY(-200)
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.space) &&
      key === 'gun_walk'
    ) {
      if (this.player.flipX === false) {
        this.fireBullet()
        this.bullet.setVelocityX(900)
        this.bullet.flipX = true
        this.bullet.gravity = 0
      } else if (this.player.flipX === true) {
        this.fireBullet()

        this.bullet.setVelocityX(-900)
        this.bullet.flipX = true
        this.bullet.gravity = 0
      }
    }
  }
}
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 640,
  height: 280,
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
