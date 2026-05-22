// NProgress
window.LMS.Progress.start({ trickleSpeed: 200 });
window.LMS.Progress.doneOnLoad();

// Notyf global
window.lmsNotify = new Notyf({
	duration: 3500,
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
			background: "linear-gradient(135deg,#3b82f6,#2563eb)",
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
	Alpine.data("errorPage404", () => ({
		dark: localStorage.getItem("lms-theme") === "dark",
		searchQuery: "",

		init() {
			this.$watch("dark", (val) =>
				localStorage.setItem("lms-theme", val ? "dark" : "light"),
			);
		},

		handleSearch() {
			const q = this.searchQuery.trim();
			if (!q) {
				window.lmsNotify.open({
					type: "info",
					message: "Please enter something to search for.",
				});
				return;
			}
			window.lmsNotify.open({
				type: "success",
				message: `Searching for "${q}"...`,
			});
			setTimeout(() => {
				window.location.href = `courses.html?q=${encodeURIComponent(q)}`;
			}, 800);
		},
	}));
});
