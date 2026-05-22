// NProgress
window.LMS.Progress.start({ trickleSpeed: 200 });
window.LMS.Progress.doneOnLoad();

// Notyf global
window.lmsNotify = new Notyf({
	duration: 4000,
	position: { x: "right", y: "top" },
	types: [
		{
			type: "success",
			background: "linear-gradient(135deg,#10b981,#059669)",
			icon: {
				className: "bi bi-check-circle-fill",
				tagName: "i",
				color: "#fff",
			},
		},
		{
			type: "error",
			background: "linear-gradient(135deg,#ef4444,#dc2626)",
			icon: {
				className: "bi bi-x-circle-fill",
				tagName: "i",
				color: "#fff",
			},
		},
		{
			type: "info",
			background: "linear-gradient(135deg,#6366f1,#4f46e5)",
			icon: {
				className: "bi bi-info-circle-fill",
				tagName: "i",
				color: "#fff",
			},
		},
	],
});

// Alpine component
document.addEventListener("alpine:init", () => {
	Alpine.data("comingSoon", () => ({
		// ── Countdown ──────────────────────────────────────────
		launchDate: new Date("2026-04-01T00:00:00"),
		time: { days: 0, hours: 0, minutes: 0, seconds: 0 },
		_timer: null,

		// ── Subscribe ──────────────────────────────────────────
		email: "",
		subscribing: false,
		subscribed: false,
		subscriberCount: 4218,

		// ── Init ───────────────────────────────────────────────
		init() {
			this.tick();
			this._timer = setInterval(() => this.tick(), 1000);
		},

		destroy() {
			clearInterval(this._timer);
		},

		// ── Countdown tick ─────────────────────────────────────
		tick() {
			const now = new Date();
			const diff = Math.max(0, this.launchDate - now);

			this.time.days = Math.floor(diff / 86400000);
			this.time.hours = Math.floor((diff % 86400000) / 3600000);
			this.time.minutes = Math.floor((diff % 3600000) / 60000);
			this.time.seconds = Math.floor((diff % 60000) / 1000);
		},

		pad(n) {
			return String(n).padStart(2, "0");
		},

		// ── Subscribe handler ──────────────────────────────────
		subscribe() {
			if (this.subscribed) return;

			if (!this.email.trim()) {
				window.lmsNotify.open({
					type: "error",
					message: "Please enter your email address.",
				});
				return;
			}
			if (!window.LMS.Validators.isEmail(this.email)) {
				window.lmsNotify.open({
					type: "error",
					message: "Please enter a valid email address.",
				});
				return;
			}

			this.subscribing = true;

			// Simulate API call
			setTimeout(() => {
				this.subscribing = false;
				this.subscribed = true;
				this.subscriberCount += 1;

				window.lmsNotify.open({
					type: "success",
					message: `🎉 You're on the list! We'll notify <strong>${this.email}</strong> on launch day.`,
				});

				// Confetti burst (lightweight CSS approach)
				this._launchConfetti();
			}, 1400);
		},

		// ── Lightweight confetti burst ─────────────────────────
		_launchConfetti() {
			const colors = [
				"#6366f1",
				"#06b6d4",
				"#8b5cf6",
				"#f59e0b",
				"#10b981",
				"#ec4899",
			];
			const container = document.body;

			for (let i = 0; i < 60; i++) {
				const el = document.createElement("div");
				const size = Math.random() * 8 + 4;
				el.style.cssText = `
              position:fixed;
              width:${size}px; height:${size}px;
              background:${colors[Math.floor(Math.random() * colors.length)]};
              border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
              top:${Math.random() * 40 + 30}%;
              left:${Math.random() * 100}%;
              z-index:9999;
              pointer-events:none;
              animation:confettiFall ${Math.random() * 1.5 + 1}s ease-out forwards;
              animation-delay:${Math.random() * 0.4}s;
            `;
				container.appendChild(el);
				el.addEventListener("animationend", () => el.remove());
			}

			// Inject keyframe once
			if (!document.getElementById("confetti-style")) {
				const style = document.createElement("style");
				style.id = "confetti-style";
				style.textContent = `
              @keyframes confettiFall {
                0%   { transform: translateY(0) rotate(0deg) scale(1); opacity:1; }
				100% { transform: translateY(200px) rotate(${Math.random() > 0.5 ? "" : "-"}720deg) scale(.3); opacity:0; }
              }
            `;
				document.head.appendChild(style);
			}
		},
	}));
});
