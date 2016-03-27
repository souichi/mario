module Maze.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
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
    }

    create() {
      this.game.state.start('menu');
    }
  }
}
