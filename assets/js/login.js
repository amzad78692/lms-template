window.LMS.Progress.start();
window.LMS.Progress.doneOnLoad();

document.addEventListener("alpine:init", () => {
	Alpine.data("loginForm", () => ({
		fields: { email: "", password: "", remember: false },
		errors: { email: "", password: "" },
		showPw: false,
		submitting: false,

		validateField(name) {
			this.errors[name] = "";
			if (name === "email") {
				if (!this.fields.email.trim()) this.errors.email = "Email is required.";
				else if (!window.LMS.Validators.isEmail(this.fields.email))
					this.errors.email = "Enter a valid email address.";
			}
			if (name === "password") {
				if (!this.fields.password)
					this.errors.password = "Password is required.";
				else if (this.fields.password.length < 6)
					this.errors.password = "Password must be at least 6 characters.";
			}
			return !this.errors[name];
		},

		validateAll() {
			const eOk = this.validateField("email");
			const pOk = this.validateField("password");
			return eOk && pOk;
		},

		async submit() {
			if (!this.validateAll()) {
				window.lmsNotify?.open({
					type: "error",
					message: "Please fix the errors above.",
				});
				return;
			}
			this.submitting = true;
			window.LMS.Progress.start();

			/* Simulate API call */
			await new Promise((r) => setTimeout(r, 1600));

			/* Demo: accept only the demo credentials */
			const isValid =
				this.fields.email === "student@edulearn.com" &&
				this.fields.password === "password123";

			window.LMS.Progress.done();
			this.submitting = false;

			if (isValid) {
				window.lmsNotify?.success("Welcome back! Redirecting to dashboard…");
				setTimeout(() => {
					window.location.href = "student/dashboard.html";
				}, 1400);
			} else {
				window.lmsNotify?.open({
					type: "error",
					message: "Invalid email or password. Try the demo credentials.",
				});
				this.errors.password = "Incorrect email or password.";
			}
		},

		socialLogin(provider) {
			window.lmsNotify?.open({
				type: "info",
				message: `${provider} OAuth would open here.`,
			});
		},
	}));
});
