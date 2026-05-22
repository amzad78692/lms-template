document.addEventListener("alpine:init", () => {
	Alpine.data("forgotPassword", () => ({
		step: 1,
		email: "",
		emailError: "",
		submitting: false,

		/* OTP */
		otpDigits: ["", "", "", "", "", ""],
		otpError: "",
		resendCooldown: 0,
		_resendTimer: null,

		/* New password */
		newPw: "",
		confirmPw: "",
		pwError: "",
		confirmError: "",
		showPw: false,
		showConfirm: false,
		strength: 0,

		get strengthColor() {
			return (
				["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"][this.strength] ||
				"#ef4444"
			);
		},
		get strengthLabel() {
			return ["", "Weak", "Fair", "Good", "Strong"][this.strength] || "";
		},
		calcStrength() {
			const p = this.newPw;
			let s = 0;
			if (p.length >= 8) s++;
			if (/[A-Z]/.test(p)) s++;
			if (/[0-9]/.test(p)) s++;
			if (/[^A-Za-z0-9]/.test(p)) s++;
			this.strength = s;
		},

		/* ── Step 1 ── */
		validateEmail() {
			this.emailError = "";
			if (!this.email.trim()) {
				this.emailError = "Email is required.";
				return false;
			}
			if (!window.LMS.Validators.isEmail(this.email)) {
				this.emailError = "Enter a valid email address.";
				return false;
			}
			return true;
		},
		async sendCode() {
			if (!this.validateEmail()) return;
			this.submitting = true;
			await new Promise((r) => setTimeout(r, 1400));
			this.submitting = false;
			window.lmsNotify?.success(`Reset code sent to ${this.email}`);
			this.step = 2;
			this._startResendTimer();
			this.$nextTick(() => document.getElementById("otp-0")?.focus());
		},

		/* ── Step 2: OTP ── */
		handleOtpInput(e, idx) {
			const val = e.target.value.replace(/\D/g, "").slice(-1);
			this.otpDigits[idx] = val;
			this.otpDigits = [...this.otpDigits]; // trigger reactivity
			e.target.value = val;
			if (val && idx < 5) {
				document.getElementById("otp-" + (idx + 1))?.focus();
			}
		},
		handleOtpKey(e, idx) {
			if (e.key === "Backspace" && !this.otpDigits[idx] && idx > 0) {
				document.getElementById("otp-" + (idx - 1))?.focus();
			}
			if (e.key === "ArrowLeft" && idx > 0)
				document.getElementById("otp-" + (idx - 1))?.focus();
			if (e.key === "ArrowRight" && idx < 5)
				document.getElementById("otp-" + (idx + 1))?.focus();
		},
		handleOtpPaste(e) {
			e.preventDefault();
			const text = (e.clipboardData || window.clipboardData)
				.getData("text")
				.replace(/\D/g, "")
				.slice(0, 6);
			text.split("").forEach((ch, i) => {
				if (i < 6) this.otpDigits[i] = ch;
			});
			this.otpDigits = [...this.otpDigits];
			document.getElementById("otp-" + Math.min(text.length, 5))?.focus();
		},
		async verifyCode() {
			const code = this.otpDigits.join("");
			if (code.length < 6) {
				this.otpError = "Please enter the complete 6-digit code.";
				return;
			}
			this.otpError = "";
			this.submitting = true;
			await new Promise((r) => setTimeout(r, 1200));
			this.submitting = false;
			/* Demo: any code works */
			window.lmsNotify?.success("Code verified!");
			this.step = 3;
		},
		resendCode() {
			window.lmsNotify?.open({
				type: "info",
				message: `Code resent to ${this.email}`,
			});
			this.otpDigits = ["", "", "", "", "", ""];
			this._startResendTimer();
			this.$nextTick(() => document.getElementById("otp-0")?.focus());
		},
		_startResendTimer() {
			this.resendCooldown = 30;
			clearInterval(this._resendTimer);
			this._resendTimer = setInterval(() => {
				if (this.resendCooldown > 0) this.resendCooldown--;
				else clearInterval(this._resendTimer);
			}, 1000);
		},

		/* ── Step 3: New password ── */
		validatePw() {
			this.pwError = "";
			if (!this.newPw) {
				this.pwError = "Password is required.";
				return false;
			}
			if (this.newPw.length < 8) {
				this.pwError = "Must be at least 8 characters.";
				return false;
			}
			if (this.strength < 2) {
				this.pwError = "Password is too weak.";
				return false;
			}
			return true;
		},
		validateConfirm() {
			this.confirmError = "";
			if (!this.confirmPw) {
				this.confirmError = "Please confirm your password.";
				return false;
			}
			if (this.confirmPw !== this.newPw) {
				this.confirmError = "Passwords do not match.";
				return false;
			}
			return true;
		},
		async resetPassword() {
			const pOk = this.validatePw();
			const cOk = this.validateConfirm();
			if (!pOk || !cOk) return;
			this.submitting = true;
			await new Promise((r) => setTimeout(r, 1500));
			this.submitting = false;
			window.lmsNotify?.success("Password reset successfully!");
			this.step = 4;
		},
	}));
});
