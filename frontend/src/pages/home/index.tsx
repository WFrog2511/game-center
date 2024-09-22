import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
	<div>
		<h1>Welcome to Game Center</h1>
		<ul>
			<li>
				<Link to="/multi-shooting">2D Cooperative Shooting Game</Link>
			</li>
			{/* 他のゲームのリンクを追加 */}
		</ul>
	</div>
);

export default HomePage;
