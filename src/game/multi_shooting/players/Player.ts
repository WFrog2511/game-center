export default class Player {
    public sprite: Phaser.Physics.Arcade.Sprite;
    private health: number;
  
    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.health = 100;
    }
  
    update() {
        if (!this.sprite.scene.input.keyboard) return;
        
        const { left, right } = this.sprite.scene.input.keyboard.createCursorKeys();
        if (left.isDown) {
            this.sprite.setVelocityX(-160);
        } else if (right.isDown) {
            this.sprite.setVelocityX(160);
        } else {
            this.sprite.setVelocityX(0);
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
  