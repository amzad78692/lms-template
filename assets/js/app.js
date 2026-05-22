/* ============================================================
   EduLearn LMS — Alpine.js Shared Components (app.js)
   Version: 3.0 | Date: 2026-03-27
   Core Alpine.js reusable components.
   Toast notifications  → Notyf       (window.lmsNotify)
   Confirmation dialogs → SweetAlert2 (Swal.fire)
   File upload UI       → FilePond    (per-page init)
   ============================================================ */

document.addEventListener("alpine:init", () => {
	/* ============================================================
     1. themeToggle
     Dark / light mode switcher.
     Reads/writes localStorage key: 'lms-theme'
     Usage: x-data="themeToggle()"
     Property: dark (bool)
     Method: toggle()
  ============================================================ */
	Alpine.data("themeToggle", () => ({
		dark: false,

		init() {
			const saved = localStorage.getItem("lms-theme");
			this.dark =
				saved === "dark"
					? true
					: saved === "light"
						? false
						: window.matchMedia("(prefers-color-scheme: dark)").matches;

			this._apply();
		},

		toggle() {
			this.dark = !this.dark;
			localStorage.setItem("lms-theme", this.dark ? "dark" : "light");
			this._apply();
		},

		_apply() {
			document.documentElement.setAttribute(
				"data-theme",
				this.dark ? "dark" : "light",
			);
		},
	}));

	/* ============================================================
     2. sidebarState
     Manages sidebar collapsed/expanded and mobile drawer state.
     Reads/writes localStorage key: 'lms-sidebar'
     Usage: x-data="sidebarState()"
     Properties: collapsed (bool), mobileOpen (bool)
     Methods: toggle(), toggleMobile(), close()
  ============================================================ */
	Alpine.data("sidebarState", () => ({
		collapsed: false,
		mobileOpen: false,

		init() {
			const saved = localStorage.getItem("lms-sidebar");
			this.collapsed = saved === "collapsed";

			// Close mobile drawer on window resize above lg breakpoint
			window.addEventListener("resize", () => {
				if (window.innerWidth >= 992) {
					this.mobileOpen = false;
				}
			});
		},

		toggle() {
			this.collapsed = !this.collapsed;
			localStorage.setItem(
				"lms-sidebar",
				this.collapsed ? "collapsed" : "expanded",
			);
		},

		toggleMobile() {
			this.mobileOpen = !this.mobileOpen;
		},

		close() {
			this.mobileOpen = false;
		},
	}));

	/* ============================================================
     3. globalSearch
     Full-screen search overlay with keyboard shortcut support.
     Usage: x-data="globalSearch()"
     Properties: open (bool), query (string), results (array)
     Methods: search(), openOverlay(), closeOverlay()
     Keyboard: CMD+K or CTRL+K toggles overlay
  ============================================================ */
	Alpine.data("globalSearch", () => ({
		open: false,
		query: "",
		results: [],

		// Hardcoded page links index
		pages: [
			{ title: "Dashboard", url: "student/dashboard.html", icon: "bi-house" },
			{
				title: "My Courses",
				url: "student/my-courses.html",
				icon: "bi-journal-bookmark",
			},
			{
				title: "Assignments",
				url: "student/assignments.html",
				icon: "bi-pencil-square",
			},
			{
				title: "Quizzes",
				url: "student/quizzes.html",
				icon: "bi-patch-question",
			},
			{
				title: "Grades",
				url: "student/grades.html",
				icon: "bi-bar-chart-line",
			},
			{ title: "Schedule", url: "student/schedule.html", icon: "bi-calendar3" },
			{
				title: "Library",
				url: "student/library.html",
				icon: "bi-folder2-open",
			},
			{
				title: "Live Sessions",
				url: "student/live-sessions.html",
				icon: "bi-camera-video",
			},
			{ title: "Forum", url: "student/forum.html", icon: "bi-chat-dots" },
			{
				title: "Announcements",
				url: "student/announcements.html",
				icon: "bi-megaphone",
			},
			{
				title: "Profile",
				url: "student/profile.html",
				icon: "bi-person-circle",
			},
			{
				title: "Certificates",
				url: "student/certificates.html",
				icon: "bi-award",
			},
			{ title: "Settings", url: "student/settings.html", icon: "bi-gear" },
			{ title: "Help", url: "student/help.html", icon: "bi-question-circle" },
			{ title: "Courses Catalog", url: "courses.html", icon: "bi-grid" },
			{ title: "Pricing", url: "pricing.html", icon: "bi-tag" },
			{ title: "About Us", url: "about.html", icon: "bi-info-circle" },
			{ title: "Contact", url: "contact.html", icon: "bi-envelope" },
			{ title: "Blog", url: "blog.html", icon: "bi-newspaper" },
			{ title: "FAQ", url: "faq.html", icon: "bi-question-square" },
			{ title: "Login", url: "login.html", icon: "bi-box-arrow-in-right" },
			{ title: "Register", url: "register.html", icon: "bi-person-plus" },
		],

		init() {
			// CMD+K / CTRL+K keyboard shortcut
			window.addEventListener("keydown", (e) => {
				if ((e.metaKey || e.ctrlKey) && e.key === "k") {
					e.preventDefault();
					this.open ? this.closeOverlay() : this.openOverlay();
				}
				if (e.key === "Escape" && this.open) {
					this.closeOverlay();
				}
			});
		},

		openOverlay() {
			this.open = true;
			this.query = "";
			this.results = [];
			this.$nextTick(() => {
				const input = document.getElementById("global-search-input");
				if (input) input.focus();
			});
		},

		closeOverlay() {
			this.open = false;
			this.query = "";
			this.results = [];
		},

		search() {
			const q = this.query.trim().toLowerCase();
			if (!q) {
				this.results = [];
				return;
			}
			this.results = this.pages.filter((p) =>
				p.title.toLowerCase().includes(q),
			);
		},
	}));

	/* ============================================================
     4. popularCourses
     Tabbed course grid on the homepage.
     Usage: x-data="popularCourses()"
  ============================================================ */
	Alpine.data("popularCourses", () => ({
		activeTab: "all",

		tabs: [
			{ key: "all", label: "All Courses" },
			{ key: "development", label: "Development" },
			{ key: "design", label: "Design" },
			{ key: "business", label: "Business" },
			{ key: "marketing", label: "Marketing" },
		],

		courses: [
			{
				id: 1,
				category: "Development",
				catKey: "development",
				catColor: "#0d6efd",
				badge: "Bestseller",
				badgeColor: "#fbbf24",
				thumb:
					"https://placehold.co/400x220/0d1b4b/60a5fa?text=JavaScript+%26+React",
				title: "Complete JavaScript & React Developer Bootcamp 2026",
				instructor: "David Miller",
				instructorAvatar: "https://placehold.co/20x20/0d6efd/fff?text=D",
				rating: "4.9",
				reviews: "3,241",
				lessons: 82,
				duration: "36h 20m",
				level: "Beginner",
				students: "12,450",
				price: "$49",
				originalPrice: "$199",
			},
			{
				id: 2,
				category: "Design",
				catKey: "design",
				catColor: "#7c3aed",
				badge: "New",
				badgeColor: "#10b981",
				thumb: "https://placehold.co/400x220/1e1b4b/a78bfa?text=UI%2FUX+Design",
				title: "UI/UX Design Mastery — Figma, Prototyping & Design Systems",
				instructor: "Sarah Chen",
				instructorAvatar: "https://placehold.co/20x20/7c3aed/fff?text=S",
				rating: "4.8",
				reviews: "1,876",
				lessons: 64,
				duration: "28h 45m",
				level: "Intermediate",
				students: "8,120",
				price: "$59",
				originalPrice: "$249",
			},
			{
				id: 3,
				category: "Business",
				catKey: "business",
				catColor: "#d97706",
				badge: "Bestseller",
				badgeColor: "#fbbf24",
				thumb:
					"https://placehold.co/400x220/1c1a0f/fbbf24?text=Business+Strategy",
				title: "Business Strategy & Entrepreneurship: From Idea to Launch",
				instructor: "James Wilson",
				instructorAvatar: "https://placehold.co/20x20/d97706/fff?text=J",
				rating: "4.7",
				reviews: "2,109",
				lessons: 48,
				duration: "22h 10m",
				level: "All Levels",
				students: "9,340",
				price: "$44",
				originalPrice: "$179",
			},
			{
				id: 4,
				category: "Development",
				catKey: "development",
				catColor: "#0d6efd",
				badge: "Hot",
				badgeColor: "#ef4444",
				thumb: "https://placehold.co/400x220/0c0a1a/818cf8?text=Python+%26+ML",
				title: "Python for Data Science & Machine Learning — Complete Course",
				instructor: "Priya Sharma",
				instructorAvatar: "https://placehold.co/20x20/4f46e5/fff?text=P",
				rating: "4.9",
				reviews: "4,532",
				lessons: 96,
				duration: "48h 00m",
				level: "Beginner",
				students: "18,200",
				price: "$69",
				originalPrice: "$299",
			},
			{
				id: 5,
				category: "Marketing",
				catKey: "marketing",
				catColor: "#db2777",
				badge: "Trending",
				badgeColor: "#06b6d4",
				thumb:
					"https://placehold.co/400x220/0c1a1a/67e8f9?text=Digital+Marketing",
				title: "Digital Marketing Mastery: SEO, Social Media & Paid Ads",
				instructor: "Emma Roberts",
				instructorAvatar: "https://placehold.co/20x20/db2777/fff?text=E",
				rating: "4.7",
				reviews: "1,654",
				lessons: 55,
				duration: "26h 30m",
				level: "Beginner",
				students: "7,890",
				price: "$39",
				originalPrice: "$149",
			},
			{
				id: 6,
				category: "Design",
				catKey: "design",
				catColor: "#7c3aed",
				badge: "",
				badgeColor: "",
				thumb: "https://placehold.co/400x220/1a0a2e/c4b5fd?text=Motion+Design",
				title: "Motion Design & Animation with After Effects — Pro Level",
				instructor: "Leo Tanaka",
				instructorAvatar: "https://placehold.co/20x20/7c3aed/fff?text=L",
				rating: "4.8",
				reviews: "987",
				lessons: 70,
				duration: "32h 15m",
				level: "Advanced",
				students: "4,210",
				price: "$79",
				originalPrice: "$319",
			},
		],

		get filteredCourses() {
			if (this.activeTab === "all") return this.courses;
			return this.courses.filter((c) => c.catKey === this.activeTab);
		},

		setTab(key) {
			this.activeTab = key;
		},
	}));
}); // end alpine:init

/* ============================================================
   LMS Shared Helpers
   Non-breaking utility layer for page scripts.
   ============================================================ */
window.LMS = window.LMS || {};

window.LMS.Theme = {
	storageKey: "lms-theme",

	getPreferred() {
		const saved = localStorage.getItem(this.storageKey);
		if (saved === "dark") return true;
		if (saved === "light") return false;
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	},

	apply(isDark) {
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light",
		);
		localStorage.setItem(this.storageKey, isDark ? "dark" : "light");
	},

	toggle() {
		const dark = this.isDarkApplied();
		this.apply(!dark);
	},

	isDarkApplied() {
		return document.documentElement.getAttribute("data-theme") === "dark";
	},
};

window.LMS.Progress = {
	start(config = {}) {
		if (typeof NProgress === "undefined") return;
		NProgress.configure({ showSpinner: false, ...config });
		NProgress.start();
	},

	done() {
		if (typeof NProgress === "undefined") return;
		NProgress.done();
	},

	doneOnLoad() {
		window.addEventListener("load", () => this.done());
	},
};

window.LMS.Animations = {
	initAOS(config = {}) {
		if (typeof AOS === "undefined") return;
		AOS.init({ duration: 600, once: true, offset: 60, ...config });
	},
};

window.LMS.Notify = {
	init(config = {}) {
		if (typeof Notyf === "undefined") return null;

		const notify = new Notyf({
			duration: 4000,
			ripple: true,
			dismissible: true,
			position: { x: "right", y: "top" },
			types: [
				{
					type: "warning",
					background: "#ffc107",
					icon: {
						className: "bi bi-exclamation-triangle-fill",
						tagName: "i",
						color: "#212529",
					},
				},
				{
					type: "info",
					background: "#0dcaf0",
					icon: {
						className: "bi bi-info-circle-fill",
						tagName: "i",
						color: "#212529",
					},
				},
			],
			...config,
		});

		window.lmsNotify = notify;
		return notify;
	},
};

window.LMS.Validators = {
	isEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
	},
};

window.LMS.createPublicNavbarState = () => ({
	scrolled: false,
	dark: false,

	toggle() {
		this.dark = !this.dark;
		window.LMS.Theme.apply(this.dark);
	},

	init() {
		this.dark = window.LMS.Theme.getPreferred();
		window.LMS.Theme.apply(this.dark);
		this.scrolled = window.scrollY > 50;
		window.addEventListener("scroll", () => {
			this.scrolled = window.scrollY > 50;
		});
	},
});

window.LMS.createMobileThemeToggle = () => ({
	get dark() {
		return window.LMS.Theme.isDarkApplied();
	},

	toggle() {
		window.LMS.Theme.toggle();
	},
});

/* ============================================================
   Notyf — Global Toast Notification Helper
   Loaded on ALL pages via CDN. Initialised here so every page
   gets window.lmsNotify without repeating setup code.

   Usage:
     window.lmsNotify.success('Profile saved!')
     window.lmsNotify.error('Something went wrong.')
     window.lmsNotify.open({ type: 'warning', message: 'Due tomorrow!' })
     window.lmsNotify.open({ type: 'info',    message: 'New message.' })

   CDN required on every page (before app.js):
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
     <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
   ============================================================ */
window.addEventListener("load", () => {
	window.LMS.Notify.init();
});

/* ============================================================
   SweetAlert2 — Global Defaults
   Applied via Swal.mixin so all confirm dialogs share brand colours.

   Usage (on any page that loads SweetAlert2 CDN):
     window.lmsConfirm({
       title:   'Delete Course?',
       text:    'This cannot be undone.',
       icon:    'warning',
       confirm: 'Yes, delete',
     }).then(r => { if (r.isConfirmed) { ... } });

   CDN required on pages that use confirmations:
     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
   ============================================================ */
window.lmsConfirm = function ({
	title = "Are you sure?",
	text = "",
	icon = "warning",
	confirm = "Yes",
} = {}) {
	if (typeof Swal === "undefined")
		return Promise.resolve({ isConfirmed: false });
	return Swal.fire({
		title,
		text,
		icon,
		showCancelButton: true,
		confirmButtonColor: "#0d6efd",
		cancelButtonColor: "#6c757d",
		confirmButtonText: confirm,
		cancelButtonText: "Cancel",
		borderRadius: "0.75rem",
		customClass: { popup: "shadow-lg" },
	});
};
