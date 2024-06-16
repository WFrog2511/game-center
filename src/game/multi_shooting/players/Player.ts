import KeyConfig from '../config/KeyConfig';

export default class Player {
    public sprite: Phaser.Physics.Arcade.Sprite;
    private health: number;
    private straightSpeed: number;
    private diagonalSpeed: number;
    private keyConfig: KeyConfig;
  
    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.health = 100;
        this.straightSpeed = 160;
        this.diagonalSpeed = 160 * (1 ** 0.5);
        this.keyConfig = new KeyConfig(scene);
    }
  
    update() {
        this.sprite.setVelocity(0);
        
        if (this.keyConfig.left?.isDown) {
            this.sprite.setVelocityX(-this.straightSpeed);
        }
        if (this.keyConfig.right?.isDown) {
            this.sprite.setVelocityX(this.straightSpeed);
        }
        if (this.keyConfig.up?.isDown) {
            this.sprite.setVelocityY(-this.straightSpeed);
        }
        if (this.keyConfig.down?.isDown) {
            this.sprite.setVelocityY(this.straightSpeed);  
        }

        // 斜め移動の速度調整
        if (this.keyConfig.left?.isDown && this.keyConfig.up?.isDown) {
            this.sprite.setVelocityX(-this.diagonalSpeed);
            this.sprite.setVelocityY(-this.diagonalSpeed);
        }
        if (this.keyConfig.left?.isDown && this.keyConfig.down?.isDown) {
            this.sprite.setVelocityX(-this.diagonalSpeed);
            this.sprite.setVelocityY(this.diagonalSpeed);
        }
        if (this.keyConfig.right?.isDown && this.keyConfig.up?.isDown) {
            this.sprite.setVelocityX(this.diagonalSpeed);
            this.sprite.setVelocityY(-this.diagonalSpeed);
        }
        if (this.keyConfig.right?.isDown && this.keyConfig.down?.isDown) {
            this.sprite.setVelocityX(this.diagonalSpeed);
            this.sprite.setVelocityY(this.diagonalSpeed);
        }
    }
  
    decreaseHealth(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.sprite.scene.scene.start('GameOverScene');
        }
    }
  
    increaseHealth(amount: number) {
        this.health = Math.min(this.health + amount, 100);
    }
}
  