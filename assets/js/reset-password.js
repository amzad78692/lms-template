window.LMS.Progress.start();
window.LMS.Progress.doneOnLoad();

window.LMS.Notify.init({
	duration: 3500,
	position: { x: "right", y: "top" },
});

document.addEventListener("alpine:init", () => {
	Alpine.data("resetPassword", () => ({
		password: "",
		confirm: "",
		showPwd: false,
		showConfirm: false,
		loading: false,
		success: false,
		strengthPct: 0,
		strengthColor: "#dee2e6",
		strengthText: "",
		reqs: {
			length: false,
			upper: false,
			lower: false,
			number: false,
			special: false,
		},

		get canSubmit() {
			return (
				this.password.length >= 8 &&
				this.confirm === this.password &&
				this.reqs.upper &&
				this.reqs.lower &&
				this.reqs.number
			);
		},

		calcStrength() {
			const p = this.password;
			this.reqs = {
				length: p.length >= 8,
				upper: /[A-Z]/.test(p),
				lower: /[a-z]/.test(p),
				number: /[0-9]/.test(p),
				special: /[^A-Za-z0-9]/.test(p),
			};
			const score = Object.values(this.reqs).filter(Boolean).length;
			const map = [
				{ pct: 0, color: "#dee2e6", text: "" },
				{ pct: 20, color: "#dc3545", text: "Very Weak" },
				{ pct: 40, color: "#fd7e14", text: "Weak" },
				{ pct: 60, color: "#ffc107", text: "Fair" },
				{ pct: 80, color: "#20c997", text: "Strong" },
				{ pct: 100, color: "#198754", text: "Very Strong" },
			];
			const m = map[score];
			this.strengthPct = m.pct;
			this.strengthColor = m.color;
			this.strengthText = m.text;
		},

		submit() {
			if (!this.canSubmit) {
				window.lmsNotify.error("Please meet all password requirements.");
				return;
			}
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				this.success = true;
			}, 1600);
		},
	}));
});
