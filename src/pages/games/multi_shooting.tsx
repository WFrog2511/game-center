import dynamic from 'next/dynamic';

const ShootingGame = () => {
    //dynamicImportを用いて、game.tsxを読み込む
    const Game = dynamic(import("@/components/game_window/multi_shooting_window"), {
        //これで、ssrが実行されない
        ssr: false,
        //読み込んでいる途中に表示されるコンポーネント
        loading: () => <p>読み込み中...</p>,
    });
    
    return (
        <div>
            <h1>2D Cooperative Shooting Game</h1>
            <Game />
        </div>
    );
};
  
export default ShootingGame;