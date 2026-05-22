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

// Details chevron toggle
document.querySelector("details")?.addEventListener("toggle", function () {
	const icon = document.getElementById("detailsIcon");
	if (icon) icon.style.transform = this.open ? "rotate(90deg)" : "rotate(0deg)";
});

// Alpine component
document.addEventListener("alpine:init", () => {
	Alpine.data("errorPage500", () => {
		// Generate error ID once
		const now = new Date();
		const pad = (n) => String(n).padStart(2, "0");
		const errorId = `#ERR-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-500`;

		return {
			dark: localStorage.getItem("lms-theme") === "dark",
			errorId,
			retrying: false,

			init() {
				this.$watch("dark", (val) =>
					localStorage.setItem("lms-theme", val ? "dark" : "light"),
				);
			},

			retryPage() {
				if (this.retrying) return;
				this.retrying = true;
				window.lmsNotify.open({
					type: "info",
					message: "Retrying... Please wait.",
				});
				window.LMS.Progress.start();
				setTimeout(() => {
					window.LMS.Progress.done();
					this.retrying = false;
					window.lmsNotify.open({
						type: "error",
						message: "Server is still unavailable. Please try again later.",
					});
				}, 2500);
			},

			copyErrorId() {
				navigator.clipboard
					?.writeText(this.errorId)
					.then(() => {
						window.lmsNotify.open({
							type: "success",
							message: "Error ID copied to clipboard!",
						});
					})
					.catch(() => {
						window.lmsNotify.open({
							type: "info",
							message: `Error ID: ${this.errorId}`,
						});
					});
			},
		};
	});
});
