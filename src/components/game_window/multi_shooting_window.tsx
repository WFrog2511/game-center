import { useEffect, useRef } from "react";
import Phaser from "phaser";

import { gameConfig } from "../../game/multi_shooting/config/GameConfig";

const Multi_shooting_window = () => {
	const gameArea = useRef(null);

	useEffect(() => {
		const makeGame = async () => {
			if (!gameArea.current) return;

			// Next.jsでPhaserを使うためには、import()を使ってPhaserを動的に読み込む必要がある
			const config = gameConfig;
			config.parent = gameArea.current;
			new Phaser.Game(config);
		};
		makeGame();
	}, []);

	return <div ref={gameArea}></div>;
};

export default Multi_shooting_window;
