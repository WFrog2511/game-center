import dynamic from "next/dynamic";

const MultiShooting = () => {
	//dynamicImportを用いて、game.tsxを読み込む
	const Game = dynamic(import("@/components/game-window/MultiShootingWindow"), {
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

export default MultiShooting;
