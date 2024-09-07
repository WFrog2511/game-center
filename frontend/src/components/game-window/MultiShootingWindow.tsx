import { useEffect } from "react";
import Phaser from "phaser";

import { gameConfig } from "@/game/multi-shooting/config/gameConfig";

const MultiShootingWindow = () => {
	useEffect(() => {
		const game = new Phaser.Game(gameConfig);

		return () => {
			game?.destroy(true);
		};
	}, []);

	return <div id="gameCanvas" />;
};

export default MultiShootingWindow;
