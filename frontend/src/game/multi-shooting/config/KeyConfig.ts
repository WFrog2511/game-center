import Phaser from "phaser";

export default class KeyConfig {
	public cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
	public up: Phaser.Input.Keyboard.Key | null = null;
	public left: Phaser.Input.Keyboard.Key | null = null;
	public down: Phaser.Input.Keyboard.Key | null = null;
	public right: Phaser.Input.Keyboard.Key | null = null;

	constructor(scene: Phaser.Scene) {
		if (!scene.input.keyboard) {
			console.error("KeyConfig: scene.input.keyboard is undefined");
			return;
		}
		this.cursors = scene.input.keyboard.createCursorKeys();
		this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}
}
