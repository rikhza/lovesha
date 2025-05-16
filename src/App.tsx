import { useState } from "react";
import Home from "./features/home/Home";
import Birthday from "./features/birthday/Birthday";
import "./App.css";

function App() {
	const [currentFeature, setCurrentFeature] = useState<"home" | "birthday">(
		"home"
	);

	return (
		<div className="app">
			<nav className="nav">
				<button
					className={`nav-button ${
						currentFeature === "home" ? "active" : ""
					}`}
					onClick={() => setCurrentFeature("home")}
				>
					Home
				</button>
				<button
					className={`nav-button ${
						currentFeature === "birthday" ? "active" : ""
					}`}
					onClick={() => setCurrentFeature("birthday")}
				>
					Birthday 22
				</button>
			</nav>

			<main className="main-content">
				{currentFeature === "home" ? <Home /> : <Birthday />}
			</main>
		</div>
	);
}

export default App;
