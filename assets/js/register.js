window.LMS.Progress.start();
window.LMS.Progress.doneOnLoad();

document.addEventListener("alpine:init", () => {
	Alpine.data("registerForm", () => ({
		fields: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirm: "",
			terms: false,
			plan: "free",
		},
		errors: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirm: "",
			terms: "",
		},
		valid: {
			firstName: false,
			lastName: false,
			email: false,
			confirm: false,
		},

		showPw: false,
		showConfirmPw: false,
		submitting: false,

		/* Password strength */
		strength: 0,
		get strengthClass() {
			return ["", "weak", "fair", "good", "strong"][this.strength] || "weak";
		},
		get strengthLabel() {
			return ["", "Weak", "Fair", "Good", "Strong"][this.strength] || "";
		},
		calcStrength() {
			const p = this.fields.password;
			let s = 0;
			if (p.length >= 8) s++;
			if (/[A-Z]/.test(p)) s++;
			if (/[0-9]/.test(p)) s++;
			if (/[^A-Za-z0-9]/.test(p)) s++;
			this.strength = s;
		},

		validateField(name) {
			this.errors[name] = "";
			this.valid[name] = false;
			const v = this.fields;
			if (name === "firstName") {
				if (!v.firstName.trim())
					this.errors.firstName = "First name is required.";
				else if (v.firstName.trim().length < 2)
					this.errors.firstName = "Must be at least 2 characters.";
				else this.valid.firstName = true;
			}
			if (name === "lastName") {
				if (!v.lastName.trim()) this.errors.lastName = "Last name is required.";
				else this.valid.lastName = true;
			}
			if (name === "email") {
				if (!v.email.trim()) this.errors.email = "Email is required.";
				else if (!window.LMS.Validators.isEmail(v.email))
					this.errors.email = "Enter a valid email address.";
				else this.valid.email = true;
			}
			if (name === "password") {
				if (!v.password) this.errors.password = "Password is required.";
				else if (v.password.length < 8)
					this.errors.password = "Password must be at least 8 characters.";
				else if (this.strength < 2)
					this.errors.password =
						"Password is too weak. Add numbers or symbols.";
			}
			if (name === "confirm") {
				if (!v.confirm) this.errors.confirm = "Please confirm your password.";
				else if (v.confirm !== v.password)
					this.errors.confirm = "Passwords do not match.";
				else this.valid.confirm = true;
			}
			if (name === "terms") {
				if (!v.terms)
					this.errors.terms = "You must accept the terms to continue.";
			}
			return !this.errors[name];
		},

		validateAll() {
			const fields = [
				"firstName",
				"lastName",
				"email",
				"password",
				"confirm",
				"terms",
			];
			return fields.map((f) => this.validateField(f)).every(Boolean);
		},

		async submit() {
			if (!this.validateAll()) {
				window.lmsNotify?.open({
					type: "error",
					message: "Please fill in all required fields correctly.",
				});
				return;
			}
			this.submitting = true;
			window.LMS.Progress.start();

			/* Simulate API */
			await new Promise((r) => setTimeout(r, 1800));

			window.LMS.Progress.done();
			this.submitting = false;
			window.lmsNotify?.success(
				`Welcome, ${this.fields.firstName}! Your account has been created.`,
			);
			setTimeout(() => {
				window.location.href = "student/dashboard.html";
			}, 1500);
		},

		socialSignup(provider) {
			window.lmsNotify?.open({
				type: "info",
				message: `${provider} OAuth signup would open here.`,
			});
		},
	}));
});
