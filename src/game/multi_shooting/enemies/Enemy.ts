import GameScene from "../scenes/GameScene";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	public scene: GameScene;
	protected speed: number;
	public health = 100;
	protected hardness = 50;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y, "enemy");
		this.scene = scene;
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.speed = Phaser.Math.Between(50, 200);
	}

	update() {
		super.update();
		this.moveToTarget(this.scene.getPlayer());
		if (this.y > 600) {
			super.destroy();
		}
	}

	moveToTarget(target: Phaser.Physics.Arcade.Sprite | null) {
		if (!target) return;
		const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
		const velocity = this.scene.physics.velocityFromRotation(angle, this.speed);
		super.setVelocity(velocity.x, velocity.y);
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
