/* ============================================================
   EduLearn LMS — Alpine.js Shared Components (app.js)
   Version: 3.0 | Date: 2026-03-27
   Core Alpine.js reusable components.
   Toast notifications  → Notyf       (window.lmsNotify)
   Confirmation dialogs → SweetAlert2 (Swal.fire)
   File upload UI       → FilePond    (per-page init)
   ============================================================ */

document.addEventListener('alpine:init', () => {

  /* ============================================================
     1. themeToggle
     Dark / light mode switcher.
     Reads/writes localStorage key: 'lms-theme'
     Usage: x-data="themeToggle()"
     Property: dark (bool)
     Method: toggle()
  ============================================================ */
  Alpine.data('themeToggle', () => ({
    dark: false,

    init() {
      const saved = localStorage.getItem('lms-theme');
      this.dark = saved === 'dark'
        ? true
        : saved === 'light'
          ? false
          : window.matchMedia('(prefers-color-scheme: dark)').matches;

      this._apply();
    },

    toggle() {
      this.dark = !this.dark;
      localStorage.setItem('lms-theme', this.dark ? 'dark' : 'light');
      this._apply();
    },

    _apply() {
      document.documentElement.setAttribute('data-theme', this.dark ? 'dark' : 'light');
    },
  }));


  /* ============================================================
     2. sidebarState
     Manages sidebar collapsed/expanded and mobile drawer state.
     Reads/writes localStorage key: 'lms-sidebar'
     Usage: x-data="sidebarState()"
     Properties: collapsed (bool), mobileOpen (bool)
     Methods: toggle(), toggleMobile(), close()
  ============================================================ */
  Alpine.data('sidebarState', () => ({
    collapsed:  false,
    mobileOpen: false,

    init() {
      const saved = localStorage.getItem('lms-sidebar');
      this.collapsed = saved === 'collapsed';

      // Close mobile drawer on window resize above lg breakpoint
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
          this.mobileOpen = false;
        }
      });
    },

    toggle() {
      this.collapsed = !this.collapsed;
      localStorage.setItem('lms-sidebar', this.collapsed ? 'collapsed' : 'expanded');
    },

    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
    },

    close() {
      this.mobileOpen = false;
    },
  }));


  /* ============================================================
     3. globalSearch
     Full-screen search overlay with keyboard shortcut support.
     Usage: x-data="globalSearch()"
     Properties: open (bool), query (string), results (array)
     Methods: search(), openOverlay(), closeOverlay()
     Keyboard: CMD+K or CTRL+K toggles overlay
  ============================================================ */
  Alpine.data('globalSearch', () => ({
    open:    false,
    query:   '',
    results: [],

    // Hardcoded page links index
    _pages: [
      { title: 'Dashboard',         url: 'student/dashboard.html',     icon: 'bi-house' },
      { title: 'My Courses',        url: 'student/my-courses.html',    icon: 'bi-journal-bookmark' },
      { title: 'Assignments',       url: 'student/assignments.html',   icon: 'bi-pencil-square' },
      { title: 'Quizzes',           url: 'student/quizzes.html',       icon: 'bi-patch-question' },
      { title: 'Grades',            url: 'student/grades.html',        icon: 'bi-bar-chart-line' },
      { title: 'Schedule',          url: 'student/schedule.html',      icon: 'bi-calendar3' },
      { title: 'Library',           url: 'student/library.html',       icon: 'bi-folder2-open' },
      { title: 'Live Sessions',     url: 'student/live-sessions.html', icon: 'bi-camera-video' },
      { title: 'Forum',             url: 'student/forum.html',         icon: 'bi-chat-dots' },
      { title: 'Announcements',     url: 'student/announcements.html', icon: 'bi-megaphone' },
      { title: 'Profile',           url: 'student/profile.html',       icon: 'bi-person-circle' },
      { title: 'Certificates',      url: 'student/certificates.html',  icon: 'bi-award' },
      { title: 'Settings',          url: 'student/settings.html',      icon: 'bi-gear' },
      { title: 'Help',              url: 'student/help.html',          icon: 'bi-question-circle' },
      { title: 'Courses Catalog',   url: 'courses.html',               icon: 'bi-grid' },
      { title: 'Pricing',           url: 'pricing.html',               icon: 'bi-tag' },
      { title: 'About Us',          url: 'about.html',                 icon: 'bi-info-circle' },
      { title: 'Contact',           url: 'contact.html',               icon: 'bi-envelope' },
      { title: 'Blog',              url: 'blog.html',                  icon: 'bi-newspaper' },
      { title: 'FAQ',               url: 'faq.html',                   icon: 'bi-question-square' },
      { title: 'Login',             url: 'login.html',                 icon: 'bi-box-arrow-in-right' },
      { title: 'Register',          url: 'register.html',              icon: 'bi-person-plus' },
    ],

    init() {
      // CMD+K / CTRL+K keyboard shortcut
      window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.open ? this.closeOverlay() : this.openOverlay();
        }
        if (e.key === 'Escape' && this.open) {
          this.closeOverlay();
        }
      });
    },

    openOverlay() {
      this.open  = true;
      this.query = '';
      this.results = [];
      this.$nextTick(() => {
        const input = document.getElementById('global-search-input');
        if (input) input.focus();
      });
    },

    closeOverlay() {
      this.open    = false;
      this.query   = '';
      this.results = [];
    },

    search() {
      const q = this.query.trim().toLowerCase();
      if (!q) {
        this.results = [];
        return;
      }
      this.results = this._pages.filter(p =>
        p.title.toLowerCase().includes(q)
      );
    },
  }));



}); // end alpine:init


/* ============================================================
   Notyf — Global Toast Notification Helper
   Loaded on ALL pages via CDN. Initialised here so every page
   gets window.lmsNotify without repeating setup code.

   Usage:
     window.lmsNotify.success('Profile saved!')
     window.lmsNotify.error('Something went wrong.')
     window.lmsNotify.open({ type: 'warning', message: 'Due tomorrow!' })
     window.lmsNotify.open({ type: 'info',    message: 'New message.' })

   CDN required on every page (before app.js):
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
     <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
   ============================================================ */
window.addEventListener('load', () => {
  if (typeof Notyf !== 'undefined') {
    window.lmsNotify = new Notyf({
      duration:     4000,
      ripple:       true,
      dismissible:  true,
      position:     { x: 'right', y: 'top' },
      types: [
        {
          type:       'warning',
          background: '#ffc107',
          icon:       { className: 'bi bi-exclamation-triangle-fill', tagName: 'i', color: '#212529' },
        },
        {
          type:       'info',
          background: '#0dcaf0',
          icon:       { className: 'bi bi-info-circle-fill', tagName: 'i', color: '#212529' },
        },
      ],
    });
  }
});


/* ============================================================
   SweetAlert2 — Global Defaults
   Applied via Swal.mixin so all confirm dialogs share brand colours.

   Usage (on any page that loads SweetAlert2 CDN):
     window.lmsConfirm({
       title:   'Delete Course?',
       text:    'This cannot be undone.',
       icon:    'warning',
       confirm: 'Yes, delete',
     }).then(r => { if (r.isConfirmed) { ... } });

   CDN required on pages that use confirmations:
     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
   ============================================================ */
window.lmsConfirm = function ({ title = 'Are you sure?', text = '', icon = 'warning', confirm = 'Yes' } = {}) {
  if (typeof Swal === 'undefined') return Promise.resolve({ isConfirmed: false });
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton:    true,
    confirmButtonColor:  '#0d6efd',
    cancelButtonColor:   '#6c757d',
    confirmButtonText:   confirm,
    cancelButtonText:    'Cancel',
    borderRadius:        '0.75rem',
    customClass:         { popup: 'shadow-lg' },
  });
};
