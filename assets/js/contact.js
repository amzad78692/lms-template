document.addEventListener("alpine:init", () => {
	Alpine.data("contactNavbar", window.LMS.createPublicNavbarState);
	Alpine.data("contactMobileThemeToggle", window.LMS.createMobileThemeToggle);

	Alpine.data("contactPage", () => ({
		sending: false,
		sent: false,
		form: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
			privacy: false,
		},

		sendMessage() {
			if (
				!this.form.firstName ||
				!this.form.email ||
				!this.form.subject ||
				!this.form.message
			) {
				window.lmsNotify.error("Please fill in all required fields.");
				return;
			}
			if (!this.form.privacy) {
				window.lmsNotify.error("Please agree to our Privacy Policy.");
				return;
			}
			this.sending = true;
			setTimeout(() => {
				this.sending = false;
				this.sent = true;
			}, 1600);
		},

		resetForm() {
			this.form = {
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
				privacy: false,
			};
		},
	}));
});

window.LMS.Progress.start({ trickleSpeed: 200 });
window.LMS.Progress.doneOnLoad();

window.LMS.Notify.init({
	duration: 3500,
	position: { x: "right", y: "top" },
});

window.LMS.Animations.initAOS({ duration: 600, once: true, offset: 60 });
