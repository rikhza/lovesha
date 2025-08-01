import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Heart,
	Flower,
	Star,
	Sparkles,
	MessageCircle,
	HeartHandshake,
	Crown,
	Diamond,
	Music,
	Zap,
	Sun,
	Moon,
	Infinity,
	Target,
	ArrowRight,
	ArrowLeft,
} from "lucide-react";
import "./GirlfriendDay.css";

const GirlfriendDay = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [showContent, setShowContent] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showSpecialMessage, setShowSpecialMessage] = useState(false);
	const [heartCount, setHeartCount] = useState(0);
	const [showFinalSurprise, setShowFinalSurprise] = useState(false);
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
	const [showBucketList, setShowBucketList] = useState(false);
	const [completedGoals, setCompletedGoals] = useState<number[]>([1]); // Sha ke Jepang is pre-completed
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const getTimeBasedMessage = () => {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) {
			return "Good morning, my beautiful Sha! Starting this special day with thoughts of you fills my heart with joy.";
		} else if (hour >= 12 && hour < 17) {
			return "Good afternoon, my love! The sun shines brighter because you exist in my world.";
		} else if (hour >= 17 && hour < 21) {
			return "Good evening, my darling! As the day winds down, my love for you only grows stronger.";
		} else {
			return "Good night, my precious Sha! Even in dreams, you are the star that guides my heart.";
		}
	};

	const bucketListGoals = [
		{
			id: 1,
			title: "Sha ke Jepang",
			description: "First step of her life",
			icon: "🗾",
			category: "New Career",
			color: "#3b82f6",
			status: "completed",
			date: "2024",
		},
		{
			id: 2,
			title: "Zaa lulus wisuda",
			description: "Merayakan kelulusan",
			icon: "🎓",
			category: "Education",
			color: "#10b981",
			status: "in-progress",
			date: "2025",
		},
		{
			id: 3,
			title: "Sha fokus kerjaannya",
			description: "Membangun karir",
			icon: "💼",
			category: "Career",
			color: "#f59e0b",
			status: "in-progress",
			date: "2026",
		},
		{
			id: 4,
			title: "Zaa fokus kerjaannya juga",
			description: "Membangun masa depan",
			icon: "🚀",
			category: "Career",
			color: "#8b5cf6",
			status: "in-progress",
			date: "2026",
		},
		{
			id: 5,
			title: "Zaa ke Aussie",
			description: "Petualangan di Australia",
			icon: "🦘",
			category: "Career",
			color: "#ef4444",
			status: "planned",
			date: "2027",
		},
		{
			id: 6,
			title: "Sha ikut ke Aussie",
			description: "Bersama-sama menjelajahi Australia",
			icon: "✈️",
			category: "Travel",
			color: "#06b6d4",
			status: "planned",
			date: "2028-2029",
		},
		{
			id: 7,
			title: "Szaa together",
			description: "Selalu bersama dalam setiap langkah",
			icon: "💑",
			category: "Love",
			color: "#ec4899",
			status: "ongoing",
			date: "Always",
		},
		{
			id: 8,
			title: "Szaa keliling dunia",
			description: "Melihat keindahan dunia berdua",
			icon: "🌍",
			category: "Travel",
			color: "#84cc16",
			status: "dream",
			date: "Future",
		},
		{
			id: 9,
			title: "Szaa nikah",
			description: "Memulai babak baru kehidupan",
			icon: "💒",
			category: "Love",
			color: "#f97316",
			status: "dream",
			date: "Future",
		},
		{
			id: 10,
			title: "Szaa nikmatin dunia berdua",
			description: "Menikmati hidup dengan penuh cinta",
			icon: "✨",
			category: "Life",
			color: "#a855f7",
			status: "dream",
			date: "Forever",
		},
	];

	const steps = [
		{
			id: 0,
			title: "My Dearest Sha",
			subtitle: "August 1st - Girlfriend Day",
			message: getTimeBasedMessage(),
			icon: Crown,
			color: "#ec4899",
		},
		{
			id: 1,
			title: "Endless Love",
			subtitle: "My Heart Belongs to You",
			message:
				"I love you more than words can express. You are my everything, my present, and my future.",
			icon: Infinity,
			color: "#db2777",
		},
		{
			id: 2,
			title: "Beautiful Soul",
			subtitle: "You Make Me Complete",
			message:
				"Your smile brightens my darkest days. Your love makes my heart dance with joy.",
			icon: Star,
			color: "#be185d",
		},
		{
			id: 3,
			title: "Forever Yours",
			subtitle: "Together Always",
			message:
				"I promise to love you endlessly, to be there for you always, and to cherish every moment we share.",
			icon: HeartHandshake,
			color: "#9d174d",
		},
		{
			id: 4,
			title: "My Everything",
			subtitle: "You Are My World",
			message:
				"In your eyes, I found my home. In your heart, I found my peace. You are my everything.",
			icon: Target,
			color: "#831843",
		},
	];

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowContent(true);
		}, 1000);

		// Show welcome message after content loads
		const welcomeTimer = setTimeout(() => {
			setShowWelcomeMessage(true);
		}, 2000);

		return () => {
			clearTimeout(timer);
			clearTimeout(welcomeTimer);
		};
	}, []);

	useEffect(() => {
		// Set up the floating hearts canvas animation
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

		// Create floating hearts
		const hearts: Array<{
			x: number;
			y: number;
			size: number;
			speed: number;
			opacity: number;
			rotation: number;
		}> = [];

		for (let i = 0; i < 50; i++) {
			hearts.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 20 + 10,
				speed: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.3,
				rotation: Math.random() * 360,
			});
		}

		const animateHearts = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			hearts.forEach((heart) => {
				ctx.save();
				ctx.translate(heart.x, heart.y);
				ctx.rotate((heart.rotation * Math.PI) / 180);
				ctx.globalAlpha = heart.opacity;

				// Draw heart
				ctx.beginPath();
				const size = heart.size;
				ctx.moveTo(0, -size / 2);
				ctx.bezierCurveTo(
					-size / 2,
					-size,
					-size,
					-size / 2,
					0,
					size / 2
				);
				ctx.bezierCurveTo(
					size,
					-size / 2,
					size / 2,
					-size,
					0,
					-size / 2
				);
				ctx.fillStyle = "#ec4899";
				ctx.fill();

				ctx.restore();

				// Update position
				heart.y -= heart.speed;
				heart.rotation += 0.5;

				if (heart.y < -heart.size) {
					heart.y = canvas.height + heart.size;
					heart.x = Math.random() * canvas.width;
				}
			});

			requestAnimationFrame(animateHearts);
		};

		animateHearts();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			setShowFinalSurprise(true);
			// Trigger confetti animation
			triggerConfetti();
		}
	};

	const triggerConfetti = () => {
		// Create confetti effect
		for (let i = 0; i < 100; i++) {
			setTimeout(() => {
				const confetti = document.createElement("div");
				confetti.className = "confetti-piece";
				confetti.style.left = Math.random() * 100 + "%";
				confetti.style.animationDelay = Math.random() * 3 + "s";
				confetti.style.backgroundColor = [
					"#ec4899",
					"#fbbf24",
					"#db2777",
					"#8b5cf6",
					"#06b6d4",
				][Math.floor(Math.random() * 5)];
				document.body.appendChild(confetti);

				setTimeout(() => {
					document.body.removeChild(confetti);
				}, 4000);
			}, i * 20);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleHeartClick = () => {
		setHeartCount(heartCount + 1);
		if (heartCount >= 10 && !showSpecialMessage) {
			setShowSpecialMessage(true);
			setTimeout(() => setShowSpecialMessage(false), 5000);
		}
		if (heartCount >= 100) {
			// Special achievement unlocked!
			setShowSpecialMessage(true);
			setTimeout(() => setShowSpecialMessage(false), 8000);
		}
	};

	const toggleGoalCompletion = (goalId: number) => {
		setCompletedGoals((prev) => {
			const newCompleted = prev.includes(goalId)
				? prev.filter((id) => id !== goalId)
				: [...prev, goalId];

			// Check if all goals are completed
			if (newCompleted.length === bucketListGoals.length) {
				// Trigger celebration
				setTimeout(() => {
					triggerConfetti();
					setShowSpecialMessage(true);
					setTimeout(() => setShowSpecialMessage(false), 8000);
				}, 500);
			}

			return newCompleted;
		});
	};

	const getCompletionPercentage = () => {
		return Math.round(
			(completedGoals.length / bucketListGoals.length) * 100
		);
	};

	const currentStepData = steps[currentStep];
	const Icon = currentStepData.icon;

	return (
		<div className="girlfriend-day">
			{/* Floating Hearts Canvas */}
			<canvas ref={canvasRef} className="floating-hearts-canvas"></canvas>

			{/* Main Content */}
			<motion.div
				className="girlfriend-day-content"
				initial={{ opacity: 0, y: 20 }}
				animate={{
					opacity: showContent ? 1 : 0,
					y: showContent ? 0 : 20,
				}}
				transition={{ duration: 1, ease: "easeOut" }}
			>
				{/* Step Content */}
				<motion.section
					className="step-content"
					key={currentStep}
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						className="step-card"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className="step-icon-container"
							style={
								{ "--icon-color": currentStepData.color } as any
							}
						>
							<Icon className="step-icon" />
							<Sparkles className="step-sparkle" />
						</motion.div>

						<motion.h2
							className="step-title"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							{currentStepData.title}
						</motion.h2>

						<motion.p
							className="step-subtitle"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							{currentStepData.subtitle}
						</motion.p>

						<motion.p
							className="step-message"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{currentStepData.message}
						</motion.p>
					</motion.div>
				</motion.section>

				{/* Bucket List Button */}
				<motion.div
					className="bucket-list-button-container"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<motion.button
						className="bucket-list-button"
						onClick={() => setShowBucketList(!showBucketList)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Target className="bucket-list-icon" />
						<span>Our Bucket List 💕</span>
						<Sparkles className="bucket-list-sparkle" />
					</motion.button>
				</motion.div>

				{/* Bucket List Modal */}
				<AnimatePresence>
					{showBucketList && (
						<motion.div
							className="bucket-list-modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="bucket-list-content"
								initial={{ scale: 0.8, y: 50 }}
								animate={{ scale: 1, y: 0 }}
								exit={{ scale: 0.8, y: 50 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							>
								<div className="bucket-list-header">
									<Crown className="bucket-list-crown" />
									<h2>Our Bucket List Together 💖</h2>
									<p>Goals we'll achieve together, Sha!</p>
									<div className="completion-progress">
										<div className="progress-bar">
											<motion.div
												className="progress-fill"
												initial={{ width: 0 }}
												animate={{
													width: `${getCompletionPercentage()}%`,
												}}
												transition={{
													duration: 1,
													ease: "easeOut",
												}}
											/>
										</div>
										<span className="progress-text">
											{getCompletionPercentage()}%
											Complete
										</span>
									</div>
								</div>

								<div className="bucket-list-timeline">
									{bucketListGoals.map((goal, index) => (
										<motion.div
											key={goal.id}
											className={`timeline-item ${
												goal.status
											} ${
												completedGoals.includes(goal.id)
													? "completed"
													: ""
											}`}
											initial={{
												opacity: 0,
												x: index % 2 === 0 ? -50 : 50,
											}}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.15 }}
										>
											<div className="timeline-connector">
												<div className="timeline-line"></div>
												<div
													className="timeline-dot"
													style={{
														backgroundColor:
															goal.color,
													}}
												></div>
											</div>

											<motion.div
												className="timeline-content"
												onClick={() =>
													toggleGoalCompletion(
														goal.id
													)
												}
												whileHover={{
													scale: 1.02,
													y: -5,
												}}
												whileTap={{ scale: 0.98 }}
											>
												<div className="timeline-header">
													<div
														className="goal-icon"
														style={{
															backgroundColor:
																goal.color,
														}}
													>
														<span className="goal-emoji">
															{goal.icon}
														</span>
													</div>
													<div className="timeline-info">
														<h3 className="goal-title">
															{goal.title}
														</h3>
														<span className="timeline-date">
															{goal.date}
														</span>
													</div>
													<div className="goal-checkbox">
														{completedGoals.includes(
															goal.id
														) && (
															<motion.div
																className="checkmark"
																initial={{
																	scale: 0,
																}}
																animate={{
																	scale: 1,
																}}
																transition={{
																	duration: 0.3,
																}}
															>
																✓
															</motion.div>
														)}
													</div>
												</div>

												<div className="timeline-body">
													<p className="goal-description">
														{goal.description}
													</p>
													<div className="timeline-meta">
														<span className="goal-category">
															{goal.category}
														</span>
														<span className="goal-status">
															{goal.status.replace(
																"-",
																" "
															)}
														</span>
													</div>
												</div>

												{goal.status ===
													"completed" && (
													<motion.div
														className="completion-badge"
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														transition={{
															delay: 0.5,
														}}
													>
														<Sparkles className="completion-sparkle" />
														<span>Completed!</span>
													</motion.div>
												)}
											</motion.div>
										</motion.div>
									))}
								</div>

								<motion.button
									className="close-bucket-list"
									onClick={() => setShowBucketList(false)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Close Bucket List
								</motion.button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Navigation */}
				<motion.nav
					className="step-navigation"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
				>
					<motion.button
						className="nav-button prev"
						onClick={handlePrevious}
						disabled={currentStep === 0}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<ArrowLeft size={20} />
						<span>Previous</span>
					</motion.button>

					<div className="step-indicators">
						{steps.map((step, index) => (
							<motion.div
								key={step.id}
								className={`step-indicator ${
									index === currentStep ? "active" : ""
								}`}
								onClick={() => setCurrentStep(index)}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
							/>
						))}
					</div>

					<motion.button
						className="nav-button next"
						onClick={handleNext}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span>
							{currentStep === steps.length - 1
								? "Surprise"
								: "Next"}
						</span>
						<ArrowRight size={20} />
					</motion.button>
				</motion.nav>

				{/* Special Message */}
				<AnimatePresence>
					{showSpecialMessage && (
						<motion.div
							className="special-message"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
						>
							<Heart className="special-heart" />
							<p>
								{completedGoals.length ===
								bucketListGoals.length
									? "🎉 Congratulations Sha! We've completed all our bucket list goals together! Our future is bright and full of love! 💖✨👑"
									: heartCount >= 100
									? "You've clicked 100 hearts! You truly are my everything, Sha! I love you beyond measure! 💖✨👑"
									: "I love you endlessly, Sha! 💖"}
							</p>
							<Sparkles className="special-sparkle" />
							{heartCount >= 100 && (
								<motion.div
									className="achievement-badge"
									initial={{ scale: 0, rotate: 0 }}
									animate={{ scale: 1, rotate: 360 }}
									transition={{
										duration: 0.8,
										ease: "easeOut",
									}}
								>
									<Crown className="achievement-crown" />
									<span>Love Master! 👑</span>
								</motion.div>
							)}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Welcome Message */}
				<AnimatePresence>
					{showWelcomeMessage && (
						<motion.div
							className="welcome-message"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
						>
							<motion.div
								className="welcome-content"
								initial={{ y: 50 }}
								animate={{ y: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								<Crown className="welcome-crown" />
								<h2>Happy Girlfriend Day, Sha! 👑</h2>
								<p>
									Today is all about you, my love. You deserve
									all the love in the world! 💖
								</p>
								<motion.button
									className="welcome-button"
									onClick={() => setShowWelcomeMessage(false)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Start My Special Day ✨
								</motion.button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Final Surprise */}
				<AnimatePresence>
					{showFinalSurprise && (
						<motion.div
							className="final-surprise"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="surprise-content"
								initial={{ scale: 0.8, y: 50 }}
								animate={{ scale: 1, y: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								<Crown className="surprise-crown" />
								<div className="surprise-hearts">
									{[...Array(3)].map((_, i) => (
										<motion.div
											key={i}
											className="surprise-heart"
											initial={{ scale: 0, rotate: 0 }}
											animate={{ scale: 1, rotate: 360 }}
											transition={{
												delay: i * 0.1,
												duration: 0.5,
												ease: "easeOut",
											}}
										>
											<Heart className="heart-icon" />
										</motion.div>
									))}
								</div>
								<div className="virtual-gift-section">
									<h3>Virtual Flower Gift for You 🌸</h3>
									<div className="flower-bouquet">
										<motion.div
											className="flower flower-1"
											animate={{
												y: [-5, 5, -5],
												rotate: [0, 5, 0],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											🌸
										</motion.div>
										<motion.div
											className="flower flower-2"
											animate={{
												y: [5, -5, 5],
												rotate: [0, -5, 0],
											}}
											transition={{
												duration: 3.5,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											🌹
										</motion.div>
										<motion.div
											className="flower flower-3"
											animate={{
												y: [-3, 7, -3],
												rotate: [0, 3, 0],
											}}
											transition={{
												duration: 2.8,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											🌺
										</motion.div>
										<motion.div
											className="flower flower-4"
											animate={{
												y: [7, -3, 7],
												rotate: [0, -3, 0],
											}}
											transition={{
												duration: 3.2,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											🌷
										</motion.div>
										<motion.div
											className="flower flower-5"
											animate={{
												y: [-4, 6, -4],
												rotate: [0, 4, 0],
											}}
											transition={{
												duration: 3.7,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										>
											🌼
										</motion.div>
									</div>
									<p className="gift-message">
										These virtual flowers represent my
										endless love for you ✨
									</p>
									<div className="gift-signature">
										With all my love,
										<br />
										<span>Riza</span>
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default GirlfriendDay;
