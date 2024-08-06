export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: "MainMenu" });
	}

	preload() {
		this.load.image("startButton", "assets/images/start-button.png");
	}

	create() {
		this.add
			.text(400, 100, "Main Menu", { fontSize: "32px", color: "#fff" })
			.setOrigin(0.5);
		const startButton = this.add
			.image(400, 300, "startButton")
			.setInteractive();
		startButton.on("pointerdown", () => {
			this.scene.start("GameScene");
		});
	}
}
