/* ── Shared initializers ────────────────────────────────── */
window.LMS.Progress.start();
window.LMS.Progress.doneOnLoad();

window.LMS.Animations.initAOS({
	once: true,
	duration: 650,
	easing: "ease-out-cubic",
});

window.LMS.Notify.init({
	duration: 2200,
	position: { x: "right", y: "top" },
	dismissible: true,
});

const coursesNavbar = window.LMS.createPublicNavbarState;

const coursesMobileThemeToggle = window.LMS.createMobileThemeToggle;

/* ── Alpine components ─────────────────────────────────── */
document.addEventListener("alpine:init", () => {
	Alpine.data("coursesNavbar", coursesNavbar);
	Alpine.data("coursesMobileThemeToggle", coursesMobileThemeToggle);
	Alpine.data("courseCatalog", () => ({
		/* ── Raw data ──────────────────────────────────── */
		courses: [
			{
				id: 1,
				title: "The Complete JavaScript Developer Bootcamp",
				cat: "development",
				catLabel: "Development",
				level: "Beginner",
				badge: { type: "top", label: "Bestseller" },
				thumb: "https://placehold.co/640x360/0d6efd/ffffff?text=JavaScript",
				instructor: "David Miller",
				instructorAvatar: "https://placehold.co/22x22/0d6efd/fff?text=DM",
				rating: 4.9,
				reviews: 12400,
				lessons: 142,
				duration: "28h 40m",
				students: 18200,
				price: 89,
				originalPrice: 149,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 2,
				title: "UI/UX Design Masterclass: Figma to Prototype",
				cat: "design",
				catLabel: "Design",
				level: "Intermediate",
				badge: { type: "new", label: "New" },
				thumb: "https://placehold.co/640x360/7c3aed/ffffff?text=UI+UX+Design",
				instructor: "Sarah Chen",
				instructorAvatar: "https://placehold.co/22x22/7c3aed/fff?text=SC",
				rating: 4.8,
				reviews: 8100,
				lessons: 98,
				duration: "22h 15m",
				students: 11300,
				price: 79,
				originalPrice: 129,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 3,
				title: "Python for Data Science & Machine Learning",
				cat: "data",
				catLabel: "Data Science",
				level: "Intermediate",
				badge: { type: "top", label: "Hot" },
				thumb: "https://placehold.co/640x360/4f46e5/ffffff?text=Python+ML",
				instructor: "Priya Sharma",
				instructorAvatar: "https://placehold.co/22x22/4f46e5/fff?text=PS",
				rating: 4.9,
				reviews: 15600,
				lessons: 183,
				duration: "36h 10m",
				students: 24700,
				price: 94,
				originalPrice: 169,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 4,
				title: "Business Strategy: Growth & Entrepreneurship",
				cat: "business",
				catLabel: "Business",
				level: "Advanced",
				badge: { type: "", label: "" },
				thumb: "https://placehold.co/640x360/d97706/ffffff?text=Business",
				instructor: "James Wilson",
				instructorAvatar: "https://placehold.co/22x22/d97706/fff?text=JW",
				rating: 4.7,
				reviews: 6200,
				lessons: 74,
				duration: "18h 30m",
				students: 9300,
				price: 69,
				originalPrice: 119,
				certificate: true,
				durationKey: "medium",
				wishlisted: false,
			},
			{
				id: 5,
				title: "Digital Marketing: SEO, Ads & Social Media",
				cat: "marketing",
				catLabel: "Marketing",
				level: "Beginner",
				badge: { type: "top", label: "Bestseller" },
				thumb: "https://placehold.co/640x360/db2777/ffffff?text=Marketing",
				instructor: "Emma Roberts",
				instructorAvatar: "https://placehold.co/22x22/db2777/fff?text=ER",
				rating: 4.7,
				reviews: 7900,
				lessons: 88,
				duration: "20h 45m",
				students: 13400,
				price: 74,
				originalPrice: 129,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 6,
				title: "React 18 + Next.js 14: Full-Stack Web Apps",
				cat: "development",
				catLabel: "Development",
				level: "Advanced",
				badge: { type: "new", label: "New" },
				thumb: "https://placehold.co/640x360/0891b2/ffffff?text=React+Next",
				instructor: "David Miller",
				instructorAvatar: "https://placehold.co/22x22/0d6efd/fff?text=DM",
				rating: 4.8,
				reviews: 9400,
				lessons: 121,
				duration: "26h 20m",
				students: 16800,
				price: 99,
				originalPrice: 179,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 7,
				title: "Graphic Design Fundamentals + Adobe Illustrator",
				cat: "design",
				catLabel: "Design",
				level: "Beginner",
				badge: { type: "", label: "" },
				thumb: "https://placehold.co/640x360/9333ea/ffffff?text=Graphic+Design",
				instructor: "Sarah Chen",
				instructorAvatar: "https://placehold.co/22x22/7c3aed/fff?text=SC",
				rating: 4.6,
				reviews: 4300,
				lessons: 65,
				duration: "14h 00m",
				students: 7200,
				price: 0,
				originalPrice: null,
				certificate: false,
				durationKey: "medium",
				wishlisted: false,
			},
			{
				id: 8,
				title: "Excel & Power BI for Business Analytics",
				cat: "business",
				catLabel: "Business",
				level: "Beginner",
				badge: { type: "", label: "" },
				thumb: "https://placehold.co/640x360/059669/ffffff?text=Excel+BI",
				instructor: "James Wilson",
				instructorAvatar: "https://placehold.co/22x22/d97706/fff?text=JW",
				rating: 4.5,
				reviews: 3100,
				lessons: 55,
				duration: "12h 30m",
				students: 5600,
				price: 49,
				originalPrice: 79,
				certificate: true,
				durationKey: "medium",
				wishlisted: false,
			},
			{
				id: 9,
				title: "The Complete Node.js REST API Course",
				cat: "development",
				catLabel: "Development",
				level: "Intermediate",
				badge: { type: "", label: "" },
				thumb: "https://placehold.co/640x360/16a34a/ffffff?text=Node.js",
				instructor: "David Miller",
				instructorAvatar: "https://placehold.co/22x22/0d6efd/fff?text=DM",
				rating: 4.7,
				reviews: 5800,
				lessons: 89,
				duration: "19h 10m",
				students: 10200,
				price: 79,
				originalPrice: 139,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 10,
				title: "Content Marketing & Copywriting Mastery",
				cat: "marketing",
				catLabel: "Marketing",
				level: "Beginner",
				badge: { type: "", label: "" },
				thumb: "https://placehold.co/640x360/dc2626/ffffff?text=Copywriting",
				instructor: "Emma Roberts",
				instructorAvatar: "https://placehold.co/22x22/db2777/fff?text=ER",
				rating: 4.6,
				reviews: 2900,
				lessons: 48,
				duration: "10h 45m",
				students: 4400,
				price: 0,
				originalPrice: null,
				certificate: false,
				durationKey: "short",
				wishlisted: false,
			},
			{
				id: 11,
				title: "Deep Learning & Neural Networks with TensorFlow",
				cat: "data",
				catLabel: "Data Science",
				level: "Advanced",
				badge: { type: "top", label: "Hot" },
				thumb: "https://placehold.co/640x360/7c3aed/ffffff?text=Deep+Learning",
				instructor: "Priya Sharma",
				instructorAvatar: "https://placehold.co/22x22/4f46e5/fff?text=PS",
				rating: 4.9,
				reviews: 11200,
				lessons: 156,
				duration: "32h 50m",
				students: 19600,
				price: 109,
				originalPrice: 199,
				certificate: true,
				durationKey: "long",
				wishlisted: false,
			},
			{
				id: 12,
				title: "Motion Design & Animation with After Effects",
				cat: "design",
				catLabel: "Design",
				level: "Intermediate",
				badge: { type: "new", label: "New" },
				thumb: "https://placehold.co/640x360/f59e0b/ffffff?text=Motion+Design",
				instructor: "Sarah Chen",
				instructorAvatar: "https://placehold.co/22x22/7c3aed/fff?text=SC",
				rating: 4.7,
				reviews: 3600,
				lessons: 72,
				duration: "16h 20m",
				students: 6100,
				price: 84,
				originalPrice: 149,
				certificate: true,
				durationKey: "medium",
				wishlisted: false,
			},
		],

		/* ── Filter state ──────────────────────────────── */
		filters: {
			categories: [],
			levels: [],
			minRating: 0,
			maxPrice: 200,
			freeOnly: false,
			durations: [],
		},
		searchQuery: "",
		sortBy: "popular",
		viewMode: "grid",
		mobileFiltersOpen: false,

		/* ── Pagination ────────────────────────────────── */
		currentPage: 1,
		perPage: 9,

		/* ── Filter meta ───────────────────────────────── */
		categories: [
			{ key: "development", label: "Development", count: 4 },
			{ key: "design", label: "Design", count: 3 },
			{ key: "data", label: "Data Science", count: 2 },
			{ key: "business", label: "Business", count: 2 },
			{ key: "marketing", label: "Marketing", count: 2 },
		],
		levels: [
			{ key: "Beginner", label: "Beginner", count: 5 },
			{ key: "Intermediate", label: "Intermediate", count: 4 },
			{ key: "Advanced", label: "Advanced", count: 3 },
		],
		durations: [
			{ key: "short", label: "Under 3 hours" },
			{ key: "medium", label: "3 – 17 hours" },
			{ key: "long", label: "17+ hours" },
		],

		/* ── Computed: filtered ────────────────────────── */
		filtered: [],

		init() {
			this.applyFilters();
			/* Restore scroll position hint */
			window.scrollTo({ top: 0 });
		},

		get activeFilterCount() {
			let n =
				this.filters.categories.length +
				this.filters.levels.length +
				this.filters.durations.length;
			if (this.filters.minRating > 0) n++;
			if (this.filters.freeOnly) n++;
			if (this.filters.maxPrice < 200) n++;
			return n;
		},

		get paginated() {
			const start = (this.currentPage - 1) * this.perPage;
			return this.filtered.slice(start, start + this.perPage);
		},

		get totalPages() {
			return Math.max(1, Math.ceil(this.filtered.length / this.perPage));
		},

		applyFilters() {
			let result = _.filter(this.courses, (c) => {
				if (
					this.filters.categories.length &&
					!this.filters.categories.includes(c.cat)
				)
					return false;
				if (
					this.filters.levels.length &&
					!this.filters.levels.includes(c.level)
				)
					return false;
				if (
					this.filters.durations.length &&
					!this.filters.durations.includes(c.durationKey)
				)
					return false;
				if (c.rating < this.filters.minRating) return false;
				if (this.filters.freeOnly && c.price !== 0) return false;
				if (this.filters.maxPrice < 200 && c.price > this.filters.maxPrice)
					return false;
				if (this.searchQuery.trim()) {
					const q = this.searchQuery.toLowerCase();
					if (
						!c.title.toLowerCase().includes(q) &&
						!c.instructor.toLowerCase().includes(q) &&
						!c.catLabel.toLowerCase().includes(q)
					)
						return false;
				}
				return true;
			});

			/* Sort */
			if (this.sortBy === "newest") result = _.orderBy(result, "id", "desc");
			else if (this.sortBy === "rating")
				result = _.orderBy(result, "rating", "desc");
			else if (this.sortBy === "price-low")
				result = _.orderBy(result, "price", "asc");
			else if (this.sortBy === "price-high")
				result = _.orderBy(result, "price", "desc");
			else result = _.orderBy(result, "students", "desc");

			this.filtered = result;
			this.currentPage = 1;
		},

		/* Lodash debounce for search input */
		debouncedSearch: _.debounce(function () {
			this.applyFilters();
		}, 300),

		goPage(p) {
			if (p < 1 || p > this.totalPages) return;
			this.currentPage = p;
			/* smooth scroll to top of grid */
			document
				.querySelector(".courses-toolbar")
				?.scrollIntoView({ behavior: "smooth", block: "start" });
		},

		clearFilters() {
			this.filters = {
				categories: [],
				levels: [],
				minRating: 0,
				maxPrice: 200,
				freeOnly: false,
				durations: [],
			};
			this.searchQuery = "";
			this.applyFilters();
			if (window.lmsNotify)
				window.lmsNotify.open({
					type: "info",
					message: "All filters cleared.",
				});
		},

		toggleWishlist(course) {
			course.wishlisted = !course.wishlisted;
			if (window.lmsNotify) {
				if (course.wishlisted) {
					window.lmsNotify.success(
						`"${course.title.slice(0, 30)}…" added to wishlist`,
					);
				} else {
					window.lmsNotify.open({
						type: "info",
						message: "Removed from wishlist.",
					});
				}
			}
		},
	}));
});
