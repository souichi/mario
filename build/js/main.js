var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Maze;
(function (Maze) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0xFFFFFF;
                // Assign global settings here
                this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = Maze.State || (Maze.State = {}));
})(Maze || (Maze = {}));
var Maze;
(function (Maze) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
                this.load.setPreloadSprite(this.preloadBar);
                this.load.image('menu-background', 'assets/images/menu-background.png');
                // Load remaining assets here
                this.load.audio('001_bgm', 'assets/audio/201-overworld-bgm.mp3');
                this.load.audio('jump', 'assets/audio/smb_jump-small.wav');
                this.load.audio('die', 'assets/audio/smb_mariodie.wav');
                this.load.audio('stage_clear', 'assets/audio/smb_stage_clear.wav');
                this.load.spritesheet('mario_small', 'assets/sprites/mario.png', 28.50, 18, 26);
                this.load.spritesheet('mario_big', 'assets/sprites/mario.png', 28.50, 36);
                this.load.image('001', 'assets/tilemaps/tiles/001.png');
                this.load.tilemap('mario', 'assets/tilemaps/maps/mario.json', null, Phaser.Tilemap.TILED_JSON);
            };
            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = Maze.State || (Maze.State = {}));
})(Maze || (Maze = {}));
var Maze;
(function (Maze) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                var _this = this;
                this.background = this.add.sprite(80, 0, 'menu-background');
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('main');
                });
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(State = Maze.State || (Maze.State = {}));
})(Maze || (Maze = {}));
var Maze;
(function (Maze) {
    var State;
    (function (State) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
            }
            Main.prototype.create = function () {
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
                this.mario = this.add.sprite(0, 32 * 12, 'mario_small');
                this.mario.frame = 7;
                this.physics.arcade.enable(this.mario);
                this.mario.body.gravity.y = 300;
                this.mario.body.bounce.y = 0.2;
                this.mario.body.gravity.y = 300;
                this.mario.body.collideWorldBounds = true;
                this.mario.animations.add('left', [6, 5, 4, 3], 10, true);
                this.mario.animations.add('right', [7, 8, 9, 10], 10, true);
                // enemies
                this.enemies = this.add.group();
                this.enemies.enableBody = true;
                for (var i = 0; i < 100; i++) {
                    var enemy = this.enemies.create(32 + i * 64 + Math.random() * 10 + 50, 32, 'mario_small');
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
            };
            Main.prototype.update = function () {
                this.physics.arcade.collide(this.mario, this.layer);
                this.physics.arcade.collide(this.enemies, this.layer);
                this.mario.body.velocity.x = 0;
                if (this.end)
                    return;
                if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.mario.animations.play('left');
                    this.mario.body.velocity.x -= 150;
                }
                else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.mario.animations.play('right');
                    this.mario.body.velocity.x += 150;
                }
                else {
                    this.mario.animations.stop();
                }
                if (this.input.keyboard.isDown(Phaser.Keyboard.UP) || this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    if (this.mario.body.onFloor()) {
                        this.jump.play();
                        this.mario.body.velocity.y -= 200;
                    }
                }
                if (16 * 28 <= this.mario.body.y) {
                    this.dead();
                }
                if (16 * 97 <= this.mario.body.x) {
                    this.clear();
                }
                this.physics.arcade.overlap(this.mario, this.enemies, this.dead, null, this);
            };
            Main.prototype.render = function () {
                this.game.debug.spriteInfo(this.mario, 0, 170);
            };
            Main.prototype.clear = function () {
                var _this = this;
                this.end = true;
                this.bgm.stop();
                this.stageClear.play();
                this.mario.animations.stop();
                this.mario.frame = 25;
                var tween = this.game.add.tween(this.mario).to({ y: 16 * 24, x: 16 * 97 }, 1000, Phaser.Easing.Linear.None);
                tween.onComplete.add(function () {
                    _this.game.state.start('menu');
                }, this);
                tween.start();
            };
            Main.prototype.dead = function () {
                var _this = this;
                this.end = true;
                this.camera.unfollow();
                this.bgm.stop();
                this.die.play();
                this.mario.visible = false;
                var sprite = this.add.sprite(this.mario.x, this.mario.y, 'mario_big');
                sprite.frame = 0;
                var tween1 = this.game.add.tween(sprite).to({ y: 32 * 10 }, 1000, Phaser.Easing.Linear.None);
                var tween2 = this.game.add.tween(sprite).to({ y: 32 * 14 }, 1000, Phaser.Easing.Linear.None);
                tween2.onComplete.add(function () {
                    _this.game.state.start('menu');
                }, this);
                tween1.chain(tween2).start();
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = Maze.State || (Maze.State = {}));
})(Maze || (Maze = {}));
/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>
var Maze;
(function (Maze) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 320, 240, Phaser.AUTO, 'game-div');
            this.state.add('boot', Maze.State.Boot);
            this.state.add('preload', Maze.State.Preload);
            this.state.add('menu', Maze.State.Menu);
            this.state.add('main', Maze.State.Main);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Maze.Game = Game;
})(Maze || (Maze = {}));
window.onload = function () {
    var game = new Maze.Game();
};
//# sourceMappingURL=main.js.map