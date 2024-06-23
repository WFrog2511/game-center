export default class Bullet extends Phaser.Physics.Arcade.Sprite{
    private speed = 500;
    private readonly ANGLE_OFSET = Math.PI/2;
    private init_angle = 0;
  
    constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setRotation(angle);
        this.init_angle = angle;
    }

    update(){
        // TODO: 現在のspeedに合った方向を向く処理
        this.autoRotate();
    }

    autoRotate(){
        const _speed = this.scene.physics.velocityFromRotation(this.init_angle-this.ANGLE_OFSET, this.speed, this.body?.velocity);
        super.setVelocity(_speed.x, _speed.y);
    }
}
  