// Heart DNA Animation
window.requestAnimationFrame =
	window.__requestAnimationFrame ||
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	(function () {
		return function (callback, element) {
			var lastTime = element.__lastTime;
			if (lastTime === undefined) {
				lastTime = 0;
			}
			var currTime = Date.now();
			var timeToCall = Math.max(1, 33 - (currTime - lastTime));
			window.setTimeout(callback, timeToCall);
			element.__lastTime = currTime + timeToCall;
		};
	})();

window.isDevice =
	/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
		(navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
	);
var loaded = false;

var init = function () {
	if (loaded) return;
	loaded = true;
	var mobile = window.isDevice;
	var koef = mobile ? 0.5 : 1;
	var canvas = document.getElementById("heart");
	var ctx = canvas.getContext("2d");
	var width = (canvas.width = koef * innerWidth);
	var height = (canvas.height = koef * innerHeight);
	var rand = Math.random;
	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.fillRect(0, 0, width, height);

	var heartPosition = function (rad) {
		return [
			Math.pow(Math.sin(rad), 3),
			-(
				15 * Math.cos(rad) -
				5 * Math.cos(2 * rad) -
				2 * Math.cos(3 * rad) -
				Math.cos(4 * rad)
			),
		];
	};
	var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
		return [dx + pos[0] * sx, dy + pos[1] * sy];
	};

	window.addEventListener("resize", function () {
		width = canvas.width = koef * innerWidth;
		height = canvas.height = koef * innerHeight;
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillRect(0, 0, width, height);
	});

	var traceCount = mobile ? 20 : 50;
	var pointsOrigin = [];
	var i;
	var dr = mobile ? 0.3 : 0.1;
	for (i = 0; i < Math.PI * 2; i += dr)
		pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
	for (i = 0; i < Math.PI * 2; i += dr)
		pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
	for (i = 0; i < Math.PI * 2; i += dr)
		pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
	var heartPointsCount = pointsOrigin.length;

	var targetPoints = [];
	var pulse = function (kx, ky) {
		for (i = 0; i < pointsOrigin.length; i++) {
			targetPoints[i] = [];
			targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
			targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
		}
	};

	var e = [];
	for (i = 0; i < heartPointsCount; i++) {
		var x = rand() * width;
		var y = rand() * height;
		e[i] = {
			vx: 0,
			vy: 0,
			R: 2,
			speed: rand() + 5,
			q: ~~(rand() * heartPointsCount),
			D: 2 * (i % 2) - 1,
			force: 0.2 * rand() + 0.7,
			f:
				"hsla(190," +
				~~(40 * rand() + 60) +
				"%," +
				~~(60 * rand() + 20) +
				"%,.3)",
			trace: [],
		};
		for (var k = 0; k < traceCount; k++) e[i].trace[k] = { x: x, y: y };
	}

	var config = {
		traceK: 0.4,
		timeDelta: 0.01,
	};

	var time = 0;
	var loop = function () {
		var n = -Math.cos(time);
		pulse((1 + n) * 0.5, (1 + n) * 0.5);
		time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;
		ctx.fillStyle = "rgba(0,0,0,.1)";
		ctx.fillRect(0, 0, width, height);
		for (i = e.length; i--; ) {
			var u = e[i];
			var q = targetPoints[u.q];
			var dx = u.trace[0].x - q[0];
			var dy = u.trace[0].y - q[1];
			var length = Math.sqrt(dx * dx + dy * dy);
			if (10 > length) {
				if (0.95 < rand()) {
					u.q = ~~(rand() * heartPointsCount);
				} else {
					if (0.99 < rand()) {
						u.D *= -1;
					}
					u.q += u.D;
					u.q %= heartPointsCount;
					if (0 > u.q) {
						u.q += heartPointsCount;
					}
				}
			}
			u.vx += (-dx / length) * u.speed;
			u.vy += (-dy / length) * u.speed;
			u.trace[0].x += u.vx;
			u.trace[0].y += u.vy;
			u.vx *= u.force;
			u.vy *= u.force;
			for (k = 0; k < u.trace.length - 1; ) {
				var T = u.trace[k];
				var N = u.trace[++k];
				N.x -= config.traceK * (N.x - T.x);
				N.y -= config.traceK * (N.y - T.y);
			}
			ctx.fillStyle = u.f;
			for (k = 0; k < u.trace.length; k++) {
				ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
			}
		}
		window.requestAnimationFrame(loop, canvas);
	};
	loop();
};

var s = document.readyState;
if (s === "complete" || s === "loaded" || s === "interactive") init();
else document.addEventListener("DOMContentLoaded", init, false);

// Timer functionality
const startDate = new Date(2024, 10, 24, 11, 0, 0);

function updateTimer() {
	const now = new Date();
	const diff = now - startDate;

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	document.getElementById("days").textContent = String(days).padStart(2, "0");
	document.getElementById("hours").textContent = String(hours).padStart(
		2,
		"0"
	);
	document.getElementById("minutes").textContent = String(minutes).padStart(
		2,
		"0"
	);
	document.getElementById("seconds").textContent = String(seconds).padStart(
		2,
		"0"
	);
}

setInterval(updateTimer, 1000);
updateTimer();

// Create floating bubbles
function createBubbles() {
	const bubbleCount = 20;
	const container = document.body;

	for (let i = 0; i < bubbleCount; i++) {
		const bubble = document.createElement("div");
		bubble.className = "bubble";

		// Random size between 5px and 20px
		const size = Math.random() * 15 + 5;
		bubble.style.width = `${size}px`;
		bubble.style.height = `${size}px`;

		// Random position
		bubble.style.left = `${Math.random() * 100}vw`;

		// Random animation duration between 10s and 20s
		bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;

		container.appendChild(bubble);

		// Remove bubble after animation
		bubble.addEventListener("animationend", () => {
			bubble.remove();
			createBubble(); // Create a new bubble to replace it
		});
	}
}

function createBubble() {
	const bubble = document.createElement("div");
	bubble.className = "bubble";

	const size = Math.random() * 15 + 5;
	bubble.style.width = `${size}px`;
	bubble.style.height = `${size}px`;
	bubble.style.left = `${Math.random() * 100}vw`;
	bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;

	document.body.appendChild(bubble);

	bubble.addEventListener("animationend", () => {
		bubble.remove();
		createBubble();
	});
}

// Initialize bubbles on load
document.addEventListener("DOMContentLoaded", createBubbles);
// Water ripple effect on click
document.addEventListener("click", function (e) {
	const ripple = document.createElement("div");
	ripple.className = "water-ripple";
	ripple.style.left = e.clientX + "px";
	ripple.style.top = e.clientY + "px";
	document.body.appendChild(ripple);

	setTimeout(() => {
		ripple.remove();
	}, 2000);
});

// Parallax effect for memory cards
document.addEventListener("mousemove", function (e) {
	const cards = document.querySelectorAll(".memory-card");
	const mouseX = e.clientX / window.innerWidth - 0.5;
	const mouseY = e.clientY / window.innerHeight - 0.5;

	cards.forEach((card) => {
		const rect = card.getBoundingClientRect();
		const cardX = rect.left + rect.width / 2;
		const cardY = rect.top + rect.height / 2;

		const angleX = (cardY - e.clientY) * 0.02;
		const angleY = (e.clientX - cardX) * 0.02;

		card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
	});
});

// Reset card transform on mouse leave
document.addEventListener("mouseleave", function () {
	const cards = document.querySelectorAll(".memory-card");
	cards.forEach((card) => {
		card.style.transform = "none";
	});
});

const modal = document.querySelector(".modal");
const button = document.querySelector(".love-button");
const closeButton = document.querySelector(".close-button");
const parallaxContainer = document.querySelector(".parallax-container");
const parallaxImage = document.querySelector(".parallax-image");

// Open modal with animation
button.addEventListener("click", () => {
	modal.classList.add("active");
	setTimeout(() => {
		parallaxImage.style.transform = "scale(1.1)";
	}, 100);
});

// Close modal
closeButton.addEventListener("click", () => {
	modal.classList.remove("active");
});

// Close on outside click
modal.addEventListener("click", (e) => {
	if (e.target === modal) {
		modal.classList.remove("active");
	}
});

// Parallax effect
parallaxContainer.addEventListener("mousemove", (e) => {
	if (!modal.classList.contains("active")) return;

	const rect = parallaxContainer.getBoundingClientRect();
	const xPos = (e.clientX - rect.left) / rect.width - 0.5;
	const yPos = (e.clientY - rect.top) / rect.height - 0.5;

	const xOffset = xPos * 30;
	const yOffset = yPos * 30;

	parallaxImage.style.transform = `scale(1.1) translate(${xOffset}px, ${yOffset}px)`;
});

// Reset parallax on mouse leave
parallaxContainer.addEventListener("mouseleave", () => {
	parallaxImage.style.transform = "scale(1.1)";
});

// Handle touch events for mobile
let initialTouchX, initialTouchY;

parallaxContainer.addEventListener("touchstart", (e) => {
	initialTouchX = e.touches[0].clientX;
	initialTouchY = e.touches[0].clientY;
});

parallaxContainer.addEventListener("touchmove", (e) => {
	if (!initialTouchX || !initialTouchY) return;

	const touchX = e.touches[0].clientX;
	const touchY = e.touches[0].clientY;

	const xDiff = (touchX - initialTouchX) * 0.1;
	const yDiff = (touchY - initialTouchY) * 0.1;

	parallaxImage.style.transform = `scale(1.1) translate(${xDiff}px, ${yDiff}px)`;
});

parallaxContainer.addEventListener("touchend", () => {
	initialTouchX = null;
	initialTouchY = null;
	parallaxImage.style.transform = "scale(1.1)";
});
