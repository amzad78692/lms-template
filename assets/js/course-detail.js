/* NProgress */
window.LMS.Progress.start();
window.LMS.Progress.doneOnLoad();

/* Related courses swiper */
(() => {
	if (
		typeof Swiper === "undefined" ||
		!document.querySelector("#relatedSwiper")
	) {
		return;
	}

	new Swiper("#relatedSwiper", {
		slidesPerView: 1.2,
		spaceBetween: 16,
		navigation: {
			nextEl: "#relNext",
			prevEl: "#relPrev",
		},
		breakpoints: {
			576: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1280: { slidesPerView: 4 },
		},
	});
})();

/* ── Alpine components ─────────────────────────────── */
document.addEventListener("alpine:init", () => {
	Alpine.data("courseDetailNavbar", window.LMS.createPublicNavbarState);
	Alpine.data(
		"courseDetailMobileThemeToggle",
		window.LMS.createMobileThemeToggle,
	);

	Alpine.data("curriculumToggleAll", () => ({
		allOpen: false,
	}));
	/* Enrol card (shared by desktop card + mobile bar) */
	Alpine.data("enrolCard", () => ({
		wishlisted: false,
		toggleWishlist() {
			this.wishlisted = !this.wishlisted;
			if (window.lmsNotify) {
				if (this.wishlisted) {
					window.lmsNotify.success("Course added to your wishlist!");
				} else {
					window.lmsNotify.open({
						type: "info",
						message: "Removed from wishlist.",
					});
				}
			}
		},
		copyLink() {
			navigator.clipboard
				?.writeText(window.location.href)
				.then(() => {
					window.lmsNotify?.success("Link copied to clipboard!");
				})
				.catch(() => {
					window.lmsNotify?.open({
						type: "info",
						message: "Copy this URL: " + window.location.href,
					});
				});
		},
	}));

	/* Curriculum accordion */
	Alpine.data("curriculumAccordion", () => ({
		sections: [
			{
				title: "Getting Started: Setup & JavaScript Basics",
				lessons: 10,
				duration: "1h 45m",
				open: true,
				items: [
					{
						title: "Welcome & Course Overview",
						type: "video",
						duration: "04:12",
						preview: true,
					},
					{
						title: "Setting Up VSCode & Extensions",
						type: "video",
						duration: "08:30",
						preview: true,
					},
					{
						title: "How JavaScript Works in the Browser",
						type: "video",
						duration: "11:20",
						preview: false,
					},
					{
						title: "Variables: var, let & const",
						type: "video",
						duration: "14:05",
						preview: false,
					},
					{
						title: "Data Types & Type Coercion",
						type: "video",
						duration: "12:40",
						preview: false,
					},
					{
						title: "Operators & Expressions",
						type: "video",
						duration: "10:15",
						preview: false,
					},
					{
						title: "Conditionals & Switch Statements",
						type: "video",
						duration: "09:50",
						preview: false,
					},
					{
						title: "Loops: for, while, for…of",
						type: "video",
						duration: "11:00",
						preview: false,
					},
					{
						title: "Section 1 Quiz",
						type: "quiz",
						duration: "5 questions",
						preview: false,
					},
					{
						title: "Section Resources",
						type: "file",
						duration: "Download",
						preview: false,
					},
				],
			},
			{
				title: "Functions, Scope & Closures",
				lessons: 12,
				duration: "2h 20m",
				open: false,
				items: [
					{
						title: "Declaring Functions: Declarations vs Expressions",
						type: "video",
						duration: "12:00",
						preview: false,
					},
					{
						title: "Arrow Functions Deep Dive",
						type: "video",
						duration: "10:30",
						preview: false,
					},
					{
						title: "Scope: Global, Function, Block",
						type: "video",
						duration: "13:45",
						preview: false,
					},
					{
						title: "Closures Explained",
						type: "video",
						duration: "15:20",
						preview: false,
					},
					{
						title: "IIFE & Module Pattern",
						type: "video",
						duration: "09:10",
						preview: false,
					},
					{
						title: "Higher-Order Functions",
						type: "video",
						duration: "14:00",
						preview: false,
					},
					{
						title: "Section 2 Quiz",
						type: "quiz",
						duration: "8 questions",
						preview: false,
					},
				],
			},
			{
				title: "Arrays, Objects & Destructuring",
				lessons: 14,
				duration: "2h 55m",
				open: false,
				items: [
					{
						title: "Array Methods: map, filter, reduce",
						type: "video",
						duration: "18:00",
						preview: false,
					},
					{
						title: "Spread & Rest Operators",
						type: "video",
						duration: "11:30",
						preview: false,
					},
					{
						title: "Object Literals & Shorthand",
						type: "video",
						duration: "12:00",
						preview: false,
					},
					{
						title: "Destructuring Arrays & Objects",
						type: "video",
						duration: "16:20",
						preview: false,
					},
					{
						title: "Optional Chaining & Nullish Coalescing",
						type: "video",
						duration: "09:45",
						preview: false,
					},
				],
			},
			{
				title: "Asynchronous JavaScript",
				lessons: 18,
				duration: "4h 10m",
				open: false,
				items: [
					{
						title: "The Event Loop Explained",
						type: "video",
						duration: "14:00",
						preview: false,
					},
					{
						title: "Callbacks & Callback Hell",
						type: "video",
						duration: "11:20",
						preview: false,
					},
					{
						title: "Promises: Creating & Chaining",
						type: "video",
						duration: "18:30",
						preview: false,
					},
					{
						title: "Promise.all, race & allSettled",
						type: "video",
						duration: "13:40",
						preview: false,
					},
					{
						title: "async/await in Practice",
						type: "video",
						duration: "16:00",
						preview: false,
					},
					{
						title: "Error Handling with try/catch",
						type: "video",
						duration: "12:10",
						preview: false,
					},
					{
						title: "Fetching Data with the Fetch API",
						type: "video",
						duration: "20:00",
						preview: false,
					},
					{
						title: "Section 4 Quiz",
						type: "quiz",
						duration: "10 questions",
						preview: false,
					},
				],
			},
			{
				title: "DOM Manipulation & Events",
				lessons: 16,
				duration: "3h 30m",
				open: false,
				items: [
					{
						title: "Selecting & Traversing the DOM",
						type: "video",
						duration: "14:00",
						preview: false,
					},
					{
						title: "Creating, Modifying & Removing Elements",
						type: "video",
						duration: "16:20",
						preview: false,
					},
					{
						title: "Event Listeners & Delegation",
						type: "video",
						duration: "18:00",
						preview: false,
					},
					{
						title: "Forms & Input Validation",
						type: "video",
						duration: "20:10",
						preview: false,
					},
					{
						title: "Project: Interactive To-Do App",
						type: "lock",
						duration: "45:00",
						preview: false,
					},
				],
			},
			{
				title: "Object-Oriented Programming",
				lessons: 14,
				duration: "3h 05m",
				open: false,
				items: [
					{
						title: "Prototypes & Prototype Chain",
						type: "video",
						duration: "16:00",
						preview: false,
					},
					{
						title: "ES6 Classes & Inheritance",
						type: "video",
						duration: "18:20",
						preview: false,
					},
					{
						title: "Encapsulation with Private Fields",
						type: "video",
						duration: "12:40",
						preview: false,
					},
					{
						title: "Design Patterns: Factory, Observer",
						type: "lock",
						duration: "22:00",
						preview: false,
					},
				],
			},
			{
				title: "Modern Tooling & Deployment",
				lessons: 12,
				duration: "2h 40m",
				open: false,
				items: [
					{
						title: "npm & package.json Essentials",
						type: "video",
						duration: "14:00",
						preview: false,
					},
					{
						title: "Bundling with Webpack",
						type: "lock",
						duration: "22:00",
						preview: false,
					},
					{
						title: "ESLint & Code Quality",
						type: "lock",
						duration: "12:00",
						preview: false,
					},
					{
						title: "Deploying to GitHub Pages & Netlify",
						type: "lock",
						duration: "18:30",
						preview: false,
					},
				],
			},
		],
		toggle(i) {
			this.sections[i].open = !this.sections[i].open;
		},
		toggleAll(open) {
			this.sections.forEach((s) => (s.open = open));
		},
	}));
});

/* ToC scroll-spy */
const tocLinks = document.querySelectorAll(".toc-link");
const sections = Array.from(tocLinks).map((l) =>
	document.querySelector(l.getAttribute("href")),
);
const spy = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				tocLinks.forEach((l) =>
					l.classList.toggle(
						"active",
						l.getAttribute("href") === "#" + e.target.id,
					),
				);
			}
		});
	},
	{ threshold: 0.35 },
);
sections.forEach((s) => s && spy.observe(s));

/* Notifications + scroll animations */
window.LMS.Notify.init({
	duration: 3500,
	position: { x: "right", y: "top" },
});

window.LMS.Animations.initAOS({ duration: 600, once: true, offset: 60 });
