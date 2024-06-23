import Player from '../players/Player';
import Enemy from '../enemies/Enemy';
import HealthPack from '../items/HealthPack';

export default class GameScene extends Phaser.Scene {
    private player!: Player;
    private enemies!: Phaser.Physics.Arcade.Group;
    private healthPacks!: Phaser.Physics.Arcade.Group;
    private bullets!: Phaser.Physics.Arcade.Group;

    private readonly MAX_HEALTH_PACKS = 3;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // publicから先のパスを記入する
        this.load.image('player',   '/game/multi_shooting/images/player.png');
        this.load.image('enemy',    '/game/multi_shooting/images/enemy.png');
        this.load.image('healthPack', '/game/multi_shooting/images/health_pack.png');
        this.load.image('bullet',   '/game/multi_shooting/images/bullet.png');
    }

    create() {
        this.player = new Player(this, 400, 500);
        this.enemies = this.physics.add.group();
        this.healthPacks = this.physics.add.group();
        this.bullets = this.physics.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                const enemy = new Enemy(this, Phaser.Math.Between(50, 750), 0);
                this.enemies.add(enemy);
            },
            loop: true
        });

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                if(this.healthPacks.children.size > this.MAX_HEALTH_PACKS - 1) return;
                const healthPack = new HealthPack(this, Phaser.Math.Between(5, 800-5), Phaser.Math.Between(5, 600-5));
                this.healthPacks.add(healthPack);
            },
            loop: true
        });

        this.physics.add.overlap(this.player, this.enemies, this.playerHitEnemy, undefined, this);
        this.physics.add.overlap(this.player, this.healthPacks, this.playerCollectHealthPack, undefined, this);
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, undefined, this);
        

        // クリックイベントのリスナーを設定
        this.input.on('pointerdown', () => {
            this.player.shoot(this.bullets);
        });
    }

    update() {
        this.player.update();
        this.enemies.children.iterate((enemy: Phaser.GameObjects.GameObject) => {
            if (!enemy) return true;    // enemyが存在しない場合は次のenemyへ
            enemy.update();
            return true; 
        });
        this.bullets.children.iterate((bullet: Phaser.GameObjects.GameObject) => {
            if (!bullet) return true;    // bulletが存在しない場合は次のbulletへ
            bullet.update();
            return true; 
        });
    }

    // 引数の型定義が長すぎて読みづらいが、この形でなければthis.physics.add.overlap()の引数に渡した際にエラーが出る
    playerHitEnemy(player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        enemy.destroy();
        this.player.decreaseHealth(10);
    }

    playerCollectHealthPack(player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, healthPack: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        healthPack.destroy();
        this.player.increaseHealth(20);
    }

    bulletHitEnemy(bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        enemy.destroy();
    }
}
