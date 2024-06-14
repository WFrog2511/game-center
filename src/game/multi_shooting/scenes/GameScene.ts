import Player from '../players/Player';
import Enemy from '../enemies/Enemy';
import HealthPack from '../items/HealthPack';

export default class GameScene extends Phaser.Scene {
    private player!: Player;
    private enemies!: Phaser.Physics.Arcade.Group;
    private healthPacks!: Phaser.Physics.Arcade.Group;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'assets/images/player.png');
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('healthPack', 'assets/images/health-pack.png');
    }

    create() {
        this.player = new Player(this, 400, 500);
        this.enemies = this.physics.add.group();
        this.healthPacks = this.physics.add.group();

        this.time.addEvent({
        delay: 1000,
        callback: () => {
            const enemy = new Enemy(this, Phaser.Math.Between(50, 750), 0);
            this.enemies.add(enemy.sprite);
        },
        loop: true
        });

        this.time.addEvent({
        delay: 5000,
        callback: () => {
            const healthPack = new HealthPack(this, Phaser.Math.Between(50, 750), 0);
            this.healthPacks.add(healthPack.sprite);
        },
        loop: true
        });

        this.physics.add.overlap(this.player.sprite, this.enemies, this.hitEnemy, undefined, this);
        this.physics.add.overlap(this.player.sprite, this.healthPacks, this.collectHealthPack, undefined, this);
    }

    update() {
        this.player.update();
        console.log(this.healthPacks.children.size)
        this.enemies.children.iterate((enemy: Phaser.GameObjects.GameObject) => {
            enemy.update();
            return true;    // 現状はfalseを返す場合が無いため、常にtrueを返す
        });
    }

    // 引数の型定義が長すぎて読みづらいが、この形でなければthis.physics.add.overlap()の引数に渡した際にエラーが出る
    hitEnemy(player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        enemy.destroy();
        this.player.decreaseHealth(10);
    }

    collectHealthPack(player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, healthPack: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        healthPack.destroy();
        this.player.increaseHealth(20);
    }
}
