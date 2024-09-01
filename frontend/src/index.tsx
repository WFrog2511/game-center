import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import MultiShooting from "@/pages/games/multi-shooting";
import reportWebVitals from "@/reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	// TODO: react-router-dom を使うか検討する
	<React.StrictMode>
		<MultiShooting />
	</React.StrictMode>,
);

// TODO: 適切な場所にログを表示するように変更する
reportWebVitals(console.log);
