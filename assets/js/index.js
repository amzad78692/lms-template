/* ══════════════════════════════════════════════════════════
   EduLearn LMS - Index Page Scripts
   Extracted from index.html
   ══════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────
   Script Block 1
   ──────────────────────────────────────────────────────────── */
/* Typed.js — hero subtitle typewriter */
document.addEventListener("DOMContentLoaded", () => {
	if (typeof Typed !== "undefined") {
		new Typed("#hero-typed-text", {
			strings: [
				"coding from scratch.",
				"building real projects.",
				"earning certifications.",
				"growing your career.",
				"learning at your pace.",
			],
			typeSpeed: 48,
			backSpeed: 28,
			backDelay: 1800,
			startDelay: 400,
			loop: true,
			smartBackspace: true,
		});
	}
});

/* ────────────────────────────────────────────────────────────
   Script Block 2
   ──────────────────────────────────────────────────────────── */
/* ── CountUp.js — triggered once on IntersectionObserver ──── */
(function () {
	function runCounters() {
		const counters = document.querySelectorAll(".stat-counter[data-target]");
		if (!counters.length || typeof CountUp === "undefined") return;

		counters.forEach((el) => {
			const target = parseFloat(el.dataset.target);
			const isLarge = target >= 1000; // 50000 → display as 50
			const end = isLarge ? target / 1000 : target;
			const decimals = Number.isInteger(end) ? 0 : 1;

			const cu = new CountUp.CountUp(el, end, {
				startVal: 0,
				duration: 2.4,
				decimal: ".",
				separator: ",",
				decimalPlaces: decimals,
				useEasing: true,
			});
			if (!cu.error) cu.start();
		});
	}

	/* Observe the counters row; fire once when 30 % visible */
	const row = document.getElementById("statsCountersRow");
	if (!row) return;

	if ("IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					runCounters();
					io.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		io.observe(row);
	} else {
		/* Fallback: run immediately if no IO support */
		runCounters();
	}
})();

/* ────────────────────────────────────────────────────────────
   Script Block 3
   ──────────────────────────────────────────────────────────── */
/* Instructors Swiper init — wait for Swiper library to load */
document.addEventListener("DOMContentLoaded", () => {
	if (typeof Swiper !== "undefined") {
		new Swiper("#instructorsSwiper", {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: false,
			grabCursor: true,
			navigation: {
				nextEl: "#instrNext",
				prevEl: "#instrPrev",
			},
			pagination: {
				el: ".instructors-swiper .swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				576: { slidesPerView: 2 },
				992: { slidesPerView: 3 },
				1200: { slidesPerView: 4 },
			},
		});
	}
});

/* ────────────────────────────────────────────────────────────
   Script Block 4
   ──────────────────────────────────────────────────────────── */
/* Testimonials Swiper init — wait for Swiper library to load */
document.addEventListener("DOMContentLoaded", () => {
	if (typeof Swiper !== "undefined") {
		new Swiper("#testimonialsSwiper", {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: true,
			grabCursor: true,
			autoplay: {
				delay: 4500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			pagination: {
				el: ".testimonials-swiper .swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
			},
		});
	}
});

/* ────────────────────────────────────────────────────────────
   Script Block 5
   ──────────────────────────────────────────────────────────── */
/* ── Section loader (fetch + inject) ──────────────────────
       Loads each section/component HTML fragment and injects it
       into the matching placeholder div, then boots AOS once all
       sections are ready.
    ──────────────────────────────────────────────────────────── */

/* ── AOS init ─────────────────────────────────────── */
if (window.LMS?.Animations) {
	window.LMS.Animations.initAOS({ duration: 600, once: true, offset: 80 });
} else if (typeof AOS !== "undefined") {
	AOS.init({ duration: 600, once: true, offset: 80 });
}

/* ── Back-to-top ──────────────────────────────────────── */
const bttBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
	bttBtn.classList.toggle("visible", window.scrollY > 400);
});
bttBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── Cookie banner ────────────────────────────────────── */
(function () {
	const banner = document.getElementById("cookieBanner");
	if (localStorage.getItem("lms-cookies-accepted")) {
		banner.classList.add("hidden");
	}
})();

function acceptCookies() {
	localStorage.setItem("lms-cookies-accepted", "1");
	document.getElementById("cookieBanner").classList.add("hidden");
	if (window.lmsNotify)
		window.lmsNotify.success("Preferences saved. Thank you!");
}
function declineCookies() {
	document.getElementById("cookieBanner").classList.add("hidden");
}

/* ── Active nav link via scroll spy ──────────────────── */
const navSections = [
	"#hero",
	"#stats",
	"#features",
	"#popular-courses",
	"#instructors",
	"#testimonials",
	"#pricing",
	"#cta",
];
const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const id = entry.target.id;
			document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
				link.classList.toggle("active", link.getAttribute("href") === "#" + id);
			});
		});
	},
	{ threshold: 0.35 },
);

// observe once sections are injected
setTimeout(() => {
	navSections.forEach((sel) => {
		const el = document.querySelector(sel);
		if (el) io.observe(el);
	});
}, 800);

/* ────────────────────────────────────────────────────────────
   Alpine.js Components - Index Page Specific
   ──────────────────────────────────────────────────────────── */
document.addEventListener("alpine:init", () => {
	/* ============================================================
     navbarState - Public navbar with scroll detection
     Manages navbar background transition on scroll and theme toggle
     Usage: x-data="navbarState()"
  ============================================================ */
	Alpine.data("navbarState", window.LMS.createPublicNavbarState);

	/* ============================================================
     mobileThemeToggle - Mobile offcanvas theme toggle
     Simplified theme toggle for mobile menu
     Usage: x-data="mobileThemeToggle()"
  ============================================================ */
	Alpine.data("mobileThemeToggle", window.LMS.createMobileThemeToggle);

	/* ============================================================
     pricingToggle - Annual/Monthly pricing toggle
     Manages pricing display for annual vs monthly billing
     Usage: x-data="pricingToggle()"
  ============================================================ */
	Alpine.data("pricingToggle", () => ({
		annual: true,

		get monthlyPro() {
			return this.annual ? 15 : 19;
		},

		get monthlyEnt() {
			return this.annual ? 39 : 49;
		},

		get originalPro() {
			return this.annual ? "$228/yr" : null;
		},
	}));

	/* ============================================================
     ctaNewsletter - Newsletter subscription form
     Handles newsletter signup with validation and feedback
     Usage: x-data="ctaNewsletter()"
  ============================================================ */
	Alpine.data("ctaNewsletter", () => ({
		name: "",
		email: "",
		loading: false,
		submitted: false,

		async submit() {
			// Validate email
			if (!window.LMS.Validators.isEmail(this.email)) {
				document.getElementById("ctaEmailInput").classList.add("error");
				if (window.lmsNotify) {
					window.lmsNotify.error("Please enter a valid email address.");
				}
				return;
			}

			// Remove error state
			document.getElementById("ctaEmailInput").classList.remove("error");

			// Simulate API call
			this.loading = true;
			await new Promise((r) => setTimeout(r, 1200));
			this.loading = false;
			this.submitted = true;

			// Show success notification
			if (window.lmsNotify) {
				window.lmsNotify.success("🎉 You're subscribed! Check your inbox.");
			}

			// Reset form
			this.name = "";
			this.email = "";

			// Reset submitted state after 5 seconds
			setTimeout(() => {
				this.submitted = false;
			}, 5000);
		},
	}));
});
