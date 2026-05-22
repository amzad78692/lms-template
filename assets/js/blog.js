const POSTS = [
	{
		id: 1,
		title: "10 Python Libraries Every Data Scientist Must Know in 2026",
		excerpt:
			"From pandas to polars — we break down the essential Python libraries shaping modern data science workflows.",
		category: "Data Science",
		catBg: "rgba(25,135,84,.1)",
		catColor: "#198754",
		emoji: "🐍",
		thumbBg: "linear-gradient(135deg,#198754,#157347)",
		avatar: "https://i.pravatar.cc/26?img=33",
		author: "Dr. Alex Rivera",
		readTime: 7,
		date: "Mar 26, 2026",
	},
	{
		id: 2,
		title: "React 19: Everything You Need to Know About the New Features",
		excerpt:
			"Server Components are now stable, useOptimistic is here, and the compiler is changing everything. A complete overview.",
		category: "Web Dev",
		catBg: "rgba(13,110,253,.1)",
		catColor: "#0d6efd",
		emoji: "⚛️",
		thumbBg: "linear-gradient(135deg,#0d6efd,#0a58ca)",
		avatar: "https://i.pravatar.cc/26?img=12",
		author: "Prof. Daniel Kim",
		readTime: 9,
		date: "Mar 24, 2026",
	},
	{
		id: 3,
		title: "The Ultimate Guide to Cracking Technical Interviews in 2026",
		excerpt:
			"Data structures, system design, behavioural questions — a practical, battle-tested roadmap from engineers who've done it.",
		category: "Career",
		catBg: "rgba(245,158,11,.12)",
		catColor: "#d97706",
		emoji: "💼",
		thumbBg: "linear-gradient(135deg,#f59e0b,#d97706)",
		avatar: "https://i.pravatar.cc/26?img=5",
		author: "Sarah Johnson",
		readTime: 12,
		date: "Mar 22, 2026",
	},
	{
		id: 4,
		title: "Design Systems 101: Building Scalable UI Component Libraries",
		excerpt:
			"How to build a design system from scratch — tokens, components, documentation, and how to get your team to actually use it.",
		category: "Design",
		catBg: "rgba(139,92,246,.12)",
		catColor: "#7c3aed",
		emoji: "🎨",
		thumbBg: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
		avatar: "https://i.pravatar.cc/26?img=9",
		author: "Emily Chen",
		readTime: 8,
		date: "Mar 20, 2026",
	},
	{
		id: 5,
		title:
			"AWS vs Azure vs GCP: Which Cloud Platform Should You Learn in 2026?",
		excerpt:
			"A thorough comparison of the three major cloud providers — job market demand, certification paths, and use cases.",
		category: "Cloud",
		catBg: "rgba(249,115,22,.12)",
		catColor: "#ea580c",
		emoji: "☁️",
		thumbBg: "linear-gradient(135deg,#f97316,#ea580c)",
		avatar: "https://i.pravatar.cc/26?img=62",
		author: "Mark Williams",
		readTime: 10,
		date: "Mar 18, 2026",
	},
	{
		id: 6,
		title: "How to Build a Second Brain: The Note-Taking System for Learners",
		excerpt:
			"Capture, organise, and retrieve everything you learn using the PARA method and tools like Notion and Obsidian.",
		category: "Productivity",
		catBg: "rgba(6,182,212,.12)",
		catColor: "#0891b2",
		emoji: "🧠",
		thumbBg: "linear-gradient(135deg,#06b6d4,#0891b2)",
		avatar: "https://i.pravatar.cc/26?img=40",
		author: "Lisa Park",
		readTime: 6,
		date: "Mar 15, 2026",
	},
];

document.addEventListener("alpine:init", () => {
	Alpine.data("blogNavbar", window.LMS.createPublicNavbarState);
	Alpine.data("blogMobileThemeToggle", window.LMS.createMobileThemeToggle);

	Alpine.data("blogPage", () => ({
		searchQuery: "",
		activeCat: "All",
		newsletterEmail: "",
		loadingMore: false,
		categories: [
			"All",
			"Web Dev",
			"Data Science",
			"Design",
			"Cloud",
			"Career",
			"AI & ML",
			"Productivity",
		],
		tags: [
			"JavaScript",
			"Python",
			"React",
			"AWS",
			"Machine Learning",
			"CSS",
			"Career",
			"Portfolio",
			"Git",
			"SQL",
		],
		posts: POSTS,

		get filteredPosts() {
			return this.posts.filter((p) => {
				const matchCat =
					this.activeCat === "All" || p.category === this.activeCat;
				const matchQ =
					!this.searchQuery ||
					p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
					p.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
				return matchCat && matchQ;
			});
		},

		loadMore() {
			this.loadingMore = true;
			setTimeout(() => {
				this.loadingMore = false;
				window.lmsNotify.open({
					type: "info",
					message: "All articles have been loaded.",
				});
			}, 1200);
		},

		subscribeNewsletter() {
			if (!this.newsletterEmail || !this.newsletterEmail.includes("@")) {
				window.lmsNotify.error("Please enter a valid email address.");
				return;
			}
			window.lmsNotify.success(
				"Subscribed! Welcome to the EduLearn newsletter 🎉",
			);
			this.newsletterEmail = "";
		},
	}));
});

window.LMS.Progress.start({ trickleSpeed: 200 });
window.LMS.Progress.doneOnLoad();

window.LMS.Notify.init({
	duration: 3500,
	position: { x: "right", y: "top" },
});

window.LMS.Animations.initAOS({ duration: 650, once: true, offset: 60 });
