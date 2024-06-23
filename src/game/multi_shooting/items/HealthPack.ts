export default class HealthPack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'healthPack');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
  