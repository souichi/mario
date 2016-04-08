module Maze.State {
  export class Main extends Phaser.State {
    private map: Phaser.Tilemap;
    private layer: Phaser.TilemapLayer;
    private mario: Phaser.Sprite;
    private bgm: Phaser.Sound;
    private jump: Phaser.Sound;
    private die: Phaser.Sound;
    private stageClear: Phaser.Sound;
    private enemies: Phaser.Group;
    private end: boolean;

    create() {
      //this.stage.backgroundColor = 0x000000;

      // Create game objects here

      // map
      this.map = this.add.tilemap('mario');
      this.map.setCollisionBetween(14, 15);
      this.map.setCollisionBetween(15, 16);
      this.map.setCollisionBetween(20, 25);
      this.map.setCollisionBetween(27, 29);
      this.map.setCollision(40);
      this.map.addTilesetImage('001');
      // layer
      this.layer = this.map.createLayer('Tile Layer 1');
      this.layer.resizeWorld();
      // mario
      this.mario = this.add.sprite(0, 32*12, 'mario_small');
      this.mario.frame = 7;
      this.physics.arcade.enable(this.mario);
      this.mario.body.gravity.y = 300;
      this.mario.body.bounce.y = 0.2;
      this.mario.body.gravity.y = 300;
      this.mario.body.collideWorldBounds = true;
      this.mario.animations.add('left', [6,5,4,3], 10, true);
      this.mario.animations.add('right', [7,8,9,10], 10, true);
      // enemies
      this.enemies = this.add.group();
      this.enemies.enableBody = true;
      for (let i = 0; i < 100; i++) {
        var enemy = this.enemies.create(32+i*64 + Math.random() * 10 + 50, 32, 'mario_small');
        enemy.frame = 6;
        enemy.body.gravity.y = 6;
        enemy.body.bounce.y = 0.7 + Math.random() * 0.2;
      }
      // camera
      this.camera.follow(this.mario);
      // bgm
      this.bgm = this.add.audio('001_bgm');
      this.bgm.play();
      this.jump = this.add.audio('jump');
      this.die = this.add.audio('die');
      this.stageClear = this.add.audio('stage_clear');
      // end
      this.end = false;
    }

    update() {
      this.physics.arcade.collide(this.mario, this.layer);
      this.physics.arcade.collide(this.enemies, this.layer);
      this.mario.body.velocity.x = 0;
      if (this.end) return;
      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.mario.animations.play('left');
        this.mario.body.velocity.x -= 150;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.mario.animations.play('right');
        this.mario.body.velocity.x += 150;
      } else {
        this.mario.animations.stop();
      }
      if (this.input.keyboard.isDown(Phaser.Keyboard.UP) || this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if (this.mario.body.onFloor()) {
          this.jump.play();
          this.mario.body.velocity.y -= 200;
        }
      }

      if (16*28 <= this.mario.body.y) {
        this.dead();
      }

      if (16*97 <= this.mario.body.x) {
        this.clear();
      }

      this.physics.arcade.overlap(this.mario, this.enemies, this.dead, null, this);
    }

    render() {
      this.game.debug.spriteInfo(this.mario, 0, 170);
    }

    private clear() {
      this.end = true;
      this.bgm.stop();
      this.stageClear.play();
      this.mario.animations.stop();
      this.mario.frame = 25;
      var tween = this.game.add.tween(this.mario).to( { y: 16*24, x: 16*97 }, 1000, Phaser.Easing.Linear.None);
      tween.onComplete.add(() => {
        this.game.state.start('menu');
      }, this);
      tween.start();
    }

    private dead() {
      this.end = true;
      this.camera.unfollow();
      this.bgm.stop();
      this.die.play();
      this.mario.visible = false;
      var sprite = this.add.sprite(this.mario.x, this.mario.y, 'mario_big');
      sprite.frame = 0;
      var tween1 = this.game.add.tween(sprite).to( { y: 32*10 }, 1000, Phaser.Easing.Linear.None);
      var tween2 = this.game.add.tween(sprite).to( { y: 32*14 }, 1000, Phaser.Easing.Linear.None);
      tween2.onComplete.add(() => {
        this.game.state.start('menu');
      }, this);
      tween1.chain(tween2).start();
    }
  }
}
