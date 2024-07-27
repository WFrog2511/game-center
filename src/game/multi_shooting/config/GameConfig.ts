import MainMenu from "../scenes/MainMenu";
import GameScene from "../scenes/GameScene";
import GameOverScene from "../scenes/GameOverScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [MainMenu, GameScene, GameOverScene],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 },
			debug: false,
		},
	},
};
