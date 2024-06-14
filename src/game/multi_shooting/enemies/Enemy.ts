export default class Enemy {
    public sprite: Phaser.Physics.Arcade.Sprite;
  
    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setVelocityY(Phaser.Math.Between(50, 100));
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(1, 1);
    }
  
    update() {
        if (this.sprite.y > 600) {
            this.sprite.destroy();
        }
    }
}
  