import Link from "next/link";

const HomePage = () => (
	<div>
		<h1>Welcome to Game Center</h1>
		<ul>
			<li>
				<Link href="/games/multi_shooting">2D Cooperative Shooting Game</Link>
			</li>
			{/* 他のゲームのリンクを追加 */}
		</ul>
	</div>
);

export default HomePage;
