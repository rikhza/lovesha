import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const [timeTogether, setTimeTogether] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		// Set up the heart canvas animation
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Heart animation
		const drawHeart = () => {
			if (!ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const time = Date.now() * 0.001;
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const size = Math.min(canvas.width, canvas.height) * 0.2;

			ctx.beginPath();
			for (let i = 0; i < Math.PI * 2; i += 0.01) {
				const x = centerX + size * 16 * Math.pow(Math.sin(i), 3);
				const y =
					centerY -
					size *
						(13 * Math.cos(i) -
							5 * Math.cos(2 * i) -
							2 * Math.cos(3 * i) -
							Math.cos(4 * i));
				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}
			ctx.closePath();
			ctx.fillStyle = "rgba(79, 164, 255, 0.1)";
			ctx.fill();
			ctx.strokeStyle = "rgba(79, 164, 255, 0.2)";
			ctx.stroke();

			requestAnimationFrame(drawHeart);
		};

		drawHeart();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	useEffect(() => {
		// Calculate time together
		const startDate = new Date("2024-11-24T00:00:00");

		const calculateTimeTogether = () => {
			const now = new Date();
			const difference = now.getTime() - startDate.getTime();

			setTimeTogether({
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			});
		};

		calculateTimeTogether();
		const timer = setInterval(calculateTimeTogether, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="home">
			<canvas ref={canvasRef} id="heart" aria-hidden="true" />

			<div className="container">
				<motion.header
					className="header"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="title">Deep Like The Ocean</h1>
					<p className="subtitle">
						Our love flows as endless as the sea...
					</p>
				</motion.header>

				<motion.button
					className="love-button"
					onClick={() => setShowModal(true)}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Photo of ours ❤️
				</motion.button>

				<AnimatePresence>
					{showModal && (
						<motion.div
							className="modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<div className="modal-content">
								<div className="parallax-container">
									<img
										src="/image.jpg"
										alt="Our Love Story"
										className="parallax-image"
										loading="lazy"
									/>
									<div className="love-message">
										Together in our own magical world 💙
									</div>
								</div>
								<button
									className="close-button"
									onClick={() => setShowModal(false)}
								>
									×
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="content-grid">
					<motion.section
						className="love-letter"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h2 className="love-letter-title">My Dearest Sha</h2>
						<div className="love-letter-content">
							<p>
								Like the depths of the ocean, my love for you
								knows no bounds. Since November 24th, 2024,
								we've been creating our own beautiful world
								together, just like those mesmerizing aquarium
								lights that paint everything in magical hues.
							</p>

							<h3>What makes my heart swim with joy:</h3>
							<ul>
								<li>
									The way we stand together, lost in moments
									of wonder
								</li>
								<li>
									How your presence makes every scene more
									beautiful
								</li>
								<li>
									The peaceful feeling when we're side by side
								</li>
								<li>
									Our shared amazement at life's simple
									beauties
								</li>
							</ul>

							<h3>My promises flow deep:</h3>
							<ul>
								<li>To explore life's wonders with you</li>
								<li>To create magical moments together</li>
								<li>
									To make every day feel like an adventure
								</li>
								<li>To love you as vast as the ocean</li>
							</ul>

							<p className="signature">
								Forever in the flow of love,
								<br />
								<span>Riza</span>
							</p>
						</div>
					</motion.section>

					<motion.section
						className="memory-wall"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<motion.article
							className="memory-card"
							whileHover={{ scale: 1.05 }}
						>
							<h3 className="memory-date">Ocean of Love 🌊</h3>
							<p className="memory-text">
								Like the serene blue waters, our love flows
								endlessly and beautifully.
							</p>
						</motion.article>

						<motion.article
							className="memory-card"
							whileHover={{ scale: 1.05 }}
						>
							<h3 className="memory-date">First Wonder ✨</h3>
							<p className="memory-text">
								Standing together, watching life's beauty unfold
								before us.
							</p>
						</motion.article>

						<motion.article
							className="memory-card"
							whileHover={{ scale: 1.05 }}
						>
							<h3 className="memory-date">Deep Connection 💙</h3>
							<p className="memory-text">
								Every moment with you adds depth to our story.
							</p>
						</motion.article>

						<motion.article
							className="memory-card"
							whileHover={{ scale: 1.05 }}
						>
							<h3 className="memory-date">Eternal Flow ∞</h3>
							<p className="memory-text">
								Like the endless ocean, our love knows no
								bounds.
							</p>
						</motion.article>
					</motion.section>
				</div>
			</div>

			<motion.footer
				className="timer"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.6 }}
			>
				<div className="time-unit">
					<div className="time-value">{timeTogether.days}</div>
					<div className="time-label">Days</div>
				</div>
				<div className="time-unit">
					<div className="time-value">{timeTogether.hours}</div>
					<div className="time-label">Hours</div>
				</div>
				<div className="time-unit">
					<div className="time-value">{timeTogether.minutes}</div>
					<div className="time-label">Minutes</div>
				</div>
				<div className="time-unit">
					<div className="time-value">{timeTogether.seconds}</div>
					<div className="time-label">Seconds</div>
				</div>
			</motion.footer>
		</div>
	);
};

export default Home;
