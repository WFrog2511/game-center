import Enemy from "@/game/multi-shooting/enemies/Enemy";
export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	protected speed = 500;
	protected penetration = 100;
	protected damage = 50;

	private hitEnemies: Phaser.Physics.Arcade.Group;
	private readonly ANGLE_OFSET = Math.PI / 2;
	private initAngle = 0;

	constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
		super(scene, x, y, "bullet");
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setRotation(angle);
		this.initAngle = angle;
		this.hitEnemies = scene.physics.add.group();
	}

	update() {
		// TODO: 現在のspeedに合った方向を向く処理
		this.autoRotate();
	}

	autoRotate() {
		const velocityVector = this.scene.physics.velocityFromRotation(
			this.initAngle - this.ANGLE_OFSET,
			this.speed,
			this.body?.velocity,
		);
		super.setVelocity(velocityVector.x, velocityVector.y);
	}

	hitEnemy(enemy: Enemy) {
		if (this.hitEnemies.contains(enemy)) return false; // すでにヒットしている敵は処理しない
		this.hitEnemies.add(enemy);
		this.decreasePenetration(enemy.getHardness());

		return true;
	}

	decreasePenetration(amount: number) {
		this.penetration -= amount;
		if (this.penetration <= 0) {
			this.destroy();
		}
	}

	getDamage() {
		return this.damage;
	}
	getPenetration() {
		return this.penetration;
	}
}
