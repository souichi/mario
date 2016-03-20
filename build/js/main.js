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
                this.stage.backgroundColor = 0x000000;
                // Create game objects here
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
            _super.call(this, 640, 480, Phaser.AUTO, 'game-div');
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