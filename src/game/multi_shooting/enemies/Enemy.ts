export default class Enemy extends Phaser.Physics.Arcade.Sprite{  
    protected speed: number;
    public health = 100;
    protected hardness = 50;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.speed = Phaser.Math.Between(50, 200);
    }
  
    update() {
        super.update();
        super.setVelocityY(this.speed);
        if (this.y > 600) {
            super.destroy();
        }
    }

    decreaseHealth(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    getHardness() {
        return this.hardness;
    }
}
  