import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import MultiShooting from "@/pages/games/multi-shooting";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/multi-shooting" element={<MultiShooting />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
