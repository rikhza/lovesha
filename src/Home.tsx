import { useState } from "react";
import BirthdayFeature from "./features/birthday/Birthday";
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
					Birthday
				</button>
			</nav>

			<main className="main-content">
				{currentFeature === "home" ? (
					<div className="home">
						<h1>Welcome to Our Love Story</h1>
						<p>
							Choose a feature from the navigation above to
							explore our journey together.
						</p>
					</div>
				) : (
					<BirthdayFeature />
				)}
			</main>
		</div>
	);
}

export default App;
