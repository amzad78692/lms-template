document.addEventListener("alpine:init", () => {
	Alpine.data("aboutNavbar", window.LMS.createPublicNavbarState);
	Alpine.data("aboutMobileThemeToggle", window.LMS.createMobileThemeToggle);
});

window.LMS.Progress.start({ trickleSpeed: 200 });
window.LMS.Progress.doneOnLoad();

window.LMS.Notify.init({
	duration: 3500,
	position: { x: "right", y: "top" },
});

window.LMS.Animations.initAOS({ duration: 650, once: true, offset: 60 });
