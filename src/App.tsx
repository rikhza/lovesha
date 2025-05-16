import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, Lock } from "lucide-react";
import Home from "./features/home/Home";
import Birthday from "./features/birthday/Birthday";
import "./App.css";

function App() {
	const [currentFeature, setCurrentFeature] = useState<"home" | "birthday">(
		"home"
	);
	const [isLocked, setIsLocked] = useState(true);
	const [pin, setPin] = useState("");
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		// Check if app was previously unlocked
		const unlocked = localStorage.getItem("unlocked");
		if (unlocked === "true") {
			setIsLocked(false);
		}
	}, []);

	const handlePinInput = (digit: string) => {
		if (pin.length < 6) {
			const newPin = pin + digit;
			setPin(newPin);

			if (newPin.length === 6) {
				if (newPin === "241124") {
					setIsLocked(false);
					localStorage.setItem("unlocked", "true");
					setShowError(false);
				} else {
					setShowError(true);
					setTimeout(() => {
						setPin("");
						setShowError(false);
					}, 1000);
				}
			}
		}
	};

	const handleDelete = () => {
		setPin(pin.slice(0, -1));
	};

	if (isLocked) {
		return (
			<motion.div
				className="pin-screen"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className="pin-container">
					<motion.div
						className="pin-header"
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						<Lock size={40} className="pin-icon" />
						<h1>Szaa Only</h1>
						<p>Enter our special date</p>
					</motion.div>

					<motion.div
						className="pin-display"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className={`pin-dot ${
									i < pin.length ? "filled" : ""
								} ${showError ? "error" : ""}`}
							/>
						))}
					</motion.div>

					<motion.div
						className="pin-keypad"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						{[...Array(9)].map((_, i) => (
							<motion.button
								key={i}
								className="pin-key"
								onClick={() =>
									handlePinInput((i + 1).toString())
								}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								{i + 1}
							</motion.button>
						))}
						<div className="pin-key-spacer"></div>
						<motion.button
							className="pin-key"
							onClick={() => handlePinInput("0")}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							0
						</motion.button>
						<motion.button
							className="pin-key delete"
							onClick={handleDelete}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M3 6h18"></path>
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
							</svg>
						</motion.button>
					</motion.div>
				</div>
			</motion.div>
		);
	}

	return (
		<div className="app">
			<nav className="nav">
				<motion.button
					className={`nav-button ${
						currentFeature === "home" ? "active" : ""
					}`}
					onClick={() => setCurrentFeature("home")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Heart size={20} className="nav-icon" />
					<span>Love Story</span>
				</motion.button>
				<motion.button
					className={`nav-button ${
						currentFeature === "birthday" ? "active" : ""
					}`}
					onClick={() => setCurrentFeature("birthday")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Gift size={20} className="nav-icon" />
					<span>Birthday 22</span>
				</motion.button>
			</nav>

			<main className="main-content">
				<motion.div
					key={currentFeature}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
				>
					{currentFeature === "home" ? <Home /> : <Birthday />}
				</motion.div>
			</main>
		</div>
	);
}

export default App;
