import KeyConfig from "@/game/multi_shooting/config/KeyConfig";
import Bullet from "@/game/multi_shooting/attacks/Bullet";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	private health: number;
	private straightSpeed: number;
	private diagonalSpeed: number;
	private keyConfig: KeyConfig;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, "player");
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.health = 100;
		this.straightSpeed = 160;
		this.diagonalSpeed = 160 / 2 ** 0.5;
		this.keyConfig = new KeyConfig(scene);
	}

	update() {
		this.setVelocity(0);

		if (this.keyConfig.left?.isDown) {
			this.setVelocityX(-this.straightSpeed);
		}
		if (this.keyConfig.right?.isDown) {
			this.setVelocityX(this.straightSpeed);
		}
		if (this.keyConfig.up?.isDown) {
			this.setVelocityY(-this.straightSpeed);
		}
		if (this.keyConfig.down?.isDown) {
			this.setVelocityY(this.straightSpeed);
		}

		// 斜め移動の速度調整
		if (this.keyConfig.left?.isDown && this.keyConfig.up?.isDown) {
			this.setVelocityX(-this.diagonalSpeed);
			this.setVelocityY(-this.diagonalSpeed);
		}
		if (this.keyConfig.left?.isDown && this.keyConfig.down?.isDown) {
			this.setVelocityX(-this.diagonalSpeed);
			this.setVelocityY(this.diagonalSpeed);
		}
		if (this.keyConfig.right?.isDown && this.keyConfig.up?.isDown) {
			this.setVelocityX(this.diagonalSpeed);
			this.setVelocityY(-this.diagonalSpeed);
		}
		if (this.keyConfig.right?.isDown && this.keyConfig.down?.isDown) {
			this.setVelocityX(this.diagonalSpeed);
			this.setVelocityY(this.diagonalSpeed);
		}

		// プレイヤーをマウスカーソルの方向に回転させる
		const pointer = this.scene.input.activePointer;
		const angle =
			Phaser.Math.Angle.Between(
				this.x,
				this.y,
				pointer.worldX,
				pointer.worldY,
			) +
			Math.PI / 2;
		this.setRotation(angle);
	}

	shoot(bullets: Phaser.Physics.Arcade.Group) {
		const bullet = new Bullet(this.scene, this.x, this.y, this.rotation);
		bullets.add(bullet);
	}

	decreaseHealth(amount: number) {
		this.health -= amount;
		if (this.health <= 0) {
			this.scene.scene.start("GameOverScene");
		}
	}

	increaseHealth(amount: number) {
		this.health = Math.min(this.health + amount, 100);
	}
}
