import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainMenu from '../../game/multi_shooting/scenes/MainMenu';
import GameScene from '../../game/multi_shooting/scenes/GameScene';
import GameOverScene from '../../game/multi_shooting/scenes/GameOverScene';

const multi_shooting_window = () => {
    const gameArea = useRef(null);

    useEffect(() => {
        const makeGame = async () => {
            if (!gameArea.current) return;

            // Next.jsでPhaserを使うためには、import()を使ってPhaserを動的に読み込む必要がある
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                parent: gameArea.current,
                scene: [MainMenu, GameScene, GameOverScene],
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: {x: 0, y: 300 },
                        debug: false
                    }
                }
            };
            new Phaser.Game(config);
        }
        makeGame();
    }, []);
  
    return <div ref={gameArea}></div>;
}

export default multi_shooting_window;