# 📦 EduLearn LMS — Approved JavaScript Libraries Reference

> All libraries are CDN-only. No npm. No build tools. Drop-in via <script> and <link> tags.
> The AI MUST pick the correct library from this list based on the feature being built.
> Never use a library for a purpose it is not listed for below.

---

## 🔧 HOW THE AI SHOULD USE THIS FILE

1. Before writing any JavaScript interaction, check this file for the approved library.
2. Use the exact CDN URL listed. Do not guess or use outdated versions.
3. Each library is assigned to specific pages/features — do not use it elsewhere.
4. Alpine.js remains the PRIMARY interactivity layer. Use other libraries ONLY
   for features Alpine.js cannot handle well on its own.
5. Never load a library on a page that doesn't use it.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 1 — CORE FRAMEWORK

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1.1 Alpine.js — PRIMARY JS Framework

**Version:** 3.x
**Purpose:** ALL reactive UI interactions — tabs, toggles, dropdowns, modals,
form validation, show/hide, counters, dark mode, sidebar state, search overlay.
**Rule:** Use Alpine.js FIRST before reaching for any other library.

```html
<script
  defer
  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
></script>
```

**Use on:** Every single page (landing + student panel).

---

### 1.2 Bootstrap 5.3 — CSS + JS Components

**Version:** 5.3.0
**Purpose:** Grid layout, responsive utilities, buttons, badges, cards, modals
(structure only — Alpine.js controls open/close state), accordion, off-canvas,
tooltips, popovers, dropdowns.

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<!-- JS Bundle (includes Popper.js) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

**Use on:** Every single page.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 2 — CHARTS & DATA VISUALIZATION

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 2.1 Chart.js — Primary Charting Library

**Version:** 4.x
**Size:** ~60 KB (lightweight for feature set)
**Purpose:** Line charts, bar charts, doughnut charts, pie charts.
Ideal for: grade trend lines, weekly activity bars, performance breakdowns.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

**Use on:**

- `student/grades.html` → Grade trend chart (line), performance bars (bar).
- `student/dashboard.html` → Weekly activity chart (bar).

**Example usage:**

```javascript
const ctx = document.getElementById("myChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Activity (mins)",
        data: [45, 80, 30, 95, 60, 20, 70],
        backgroundColor: "rgba(13, 110, 253, 0.7)",
        borderRadius: 6,
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { display: false } } },
});
```

---

### 2.2 ApexCharts — Advanced / Interactive Charts

**Version:** Latest
**Size:** ~120 KB
**Purpose:** Advanced interactive charts with animations, tooltips, zoom,
sparklines. Use when Chart.js is insufficient.
Ideal for: real-time data feel, animated donut score display, sparklines.

```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.js"></script>
```

**Use on:**

- `student/grades.html` → Animated circular GPA score (radialBar chart).
- `student/dashboard.html` → Sparkline mini-charts inside stat cards (optional).
- `student/quizzes.html` → Quiz results score circle (radialBar).

**Example usage (radial GPA):**

```javascript
new ApexCharts(document.querySelector("#gpaChart"), {
  series: [92.5], // percentage
  chart: { type: "radialBar", height: 200 },
  plotOptions: {
    radialBar: {
      dataLabels: { value: { formatter: () => "3.7 GPA" } },
    },
  },
  colors: ["#0d6efd"],
}).render();
```

**Rule:** Do NOT use both Chart.js and ApexCharts on the same page.
Choose one per page based on chart type needed.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 3 — CALENDAR & DATE/TIME

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 3.1 FullCalendar — Full Schedule & Calendar View

**Version:** 6.x
**Size:** ~80 KB
**Purpose:** Full interactive month/week/day calendar views with events,
drag-and-drop event management, event click popovers.

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.css"
  rel="stylesheet"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js"></script>
```

**Use on:**

- `student/schedule.html` → Month view, week view calendar with color-coded events.

**Example usage:**

```javascript
const calendar = new FullCalendar.Calendar(
  document.getElementById("calendar"),
  {
    initialView: "dayGridMonth",
    events: [
      { title: "JS Quiz", date: "2026-04-05", color: "#dc3545" },
      { title: "Live Session", date: "2026-04-07", color: "#0d6efd" },
      { title: "Assignment Due", date: "2026-04-10", color: "#ffc107" },
    ],
    eventClick: function (info) {
      /* show Bootstrap modal with event details */
    },
  },
);
calendar.render();
```

---

### 3.2 Flatpickr — Date & Time Picker Input

**Version:** 4.x
**Size:** ~16 KB
**Purpose:** Lightweight, zero-dependency date/time picker for form inputs.
Better than browser native `<input type="date">` for styling control.

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js"></script>
```

**Use on:**

- `student/profile.html` → Date of Birth field.
- `student/assignments.html` → Due date filter range picker.
- `contact.html` → Date field in support form (if needed).
- `student/settings.html` → Any date preference fields.

**Example usage:**

```javascript
flatpickr("#dateInput", {
  dateFormat: "Y-m-d",
  minDate: "1990-01-01",
  maxDate: "today",
});
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 4 — NOTIFICATIONS & ALERTS

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 4.1 SweetAlert2 — Confirmation Modals & Alerts

**Version:** 11.x
**Size:** ~45 KB
**Purpose:** Beautiful confirmation dialogs, alert boxes, input prompts.
Replaces browser `confirm()` and `alert()`. Use for destructive actions.

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
```

**Use on:**

- `student/settings.html` → "Delete Account" confirmation dialog.
- `student/assignments.html` → "Submit Assignment" final confirmation.
- `student/quiz-taking.html` → "Submit Quiz" confirmation before final submit.
- `student/profile.html` → "Revoke Session" confirmation.
- Any destructive/irreversible action across all pages.

**Example usage:**

```javascript
Swal.fire({
  title: "Submit Quiz?",
  text: "2 questions are still unanswered.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#0d6efd",
  cancelButtonColor: "#6c757d",
  confirmButtonText: "Yes, Submit!",
}).then((result) => {
  if (result.isConfirmed) {
    /* handle submission */
  }
});
```

---

### 4.2 Notyf — Toast Notifications

**Version:** 3.x
**Size:** ~7 KB (extremely lightweight)
**Purpose:** Clean, minimal toast notifications for success/error/warning/info.
Positioned top-right by default. Fully customizable colors.

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
```

**Use on:**

- ALL student panel pages → form save success, errors, session alerts.
- ALL landing page forms → newsletter subscribe, contact form submit.
- `login.html`, `register.html` → auth success/error messages.

**Example usage:**

```javascript
const notyf = new Notyf({
  duration: 4000,
  position: { x: "right", y: "top" },
  types: [
    { type: "warning", background: "#ffc107", icon: false },
    { type: "info", background: "#0dcaf0", icon: false },
  ],
});

notyf.success("Profile saved successfully!");
notyf.error("Please fill all required fields.");
notyf.open({ type: "warning", message: "Assignment due tomorrow!" });
```

**Rule:** Notyf handles toast notifications.
SweetAlert2 handles confirmation dialogs. Do NOT mix their roles.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 5 — RICH TEXT EDITOR

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 5.1 Quill — Rich Text / WYSIWYG Editor

**Version:** 2.x
**Size:** ~43 KB
**Purpose:** Rich text editing with toolbar (bold, italic, lists, links,
code blocks, images). Clean output in HTML or Delta format.

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css"
  rel="stylesheet"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.js"></script>
```

**Use on:**

- `student/forum.html` → New Thread creation form.
- `student/forum-thread.html` → Reply editor.
- `student/assignments.html` → Assignment answer text area (if rich text needed).
- `student/help.html` → Support ticket description field.

**Example usage:**

```javascript
const quill = new Quill("#editor", {
  theme: "snow",
  placeholder: "Write your reply...",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link", "code-block", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  },
});
```

**Rule:** Use Quill ONLY for text areas that require formatting.
Plain textareas (like search fields, short inputs) should remain plain HTML.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 6 — FILE UPLOAD

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 6.1 FilePond — Drag & Drop File Upload UI

**Version:** 4.x
**Size:** ~31 KB
**Purpose:** Beautiful, accessible drag-and-drop file upload zone with
previews, progress indicators, file type validation. UI only — no server needed.

```html
<!-- CSS -->
<link
  href="https://unpkg.com/filepond@^4/dist/filepond.min.css"
  rel="stylesheet"
/>
<!-- Image Preview Plugin CSS -->
<link
  href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
  rel="stylesheet"
/>
<!-- Plugins -->
<script src="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"></script>
<script src="https://unpkg.com/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js"></script>
<!-- Core -->
<script src="https://unpkg.com/filepond@^4/dist/filepond.min.js"></script>
```

**Use on:**

- `student/assignments.html` → Submit assignment file attachment.
- `student/profile.html` → Avatar/profile photo upload.
- `student/help.html` → Support ticket file attachment.
- `contact.html` → Contact form file attachment.

**Example usage:**

```javascript
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);
FilePond.create(document.querySelector('input[type="file"]'), {
  allowMultiple: true,
  maxFiles: 3,
  acceptedFileTypes: ["application/pdf", "image/*"],
  labelIdle:
    'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
});
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 7 — TABLES & DATA GRIDS

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 7.1 DataTables — Enhanced HTML Tables

**Version:** 1.13.x
**Size:** ~85 KB (with jQuery dependency)
**Purpose:** Adds search, sort, pagination, and column filtering to any
standard HTML table. Best for read-heavy data tables.

```html
<!-- jQuery (required by DataTables) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- DataTables CSS -->
<link
  rel="stylesheet"
  href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css"
/>
<!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
```

**Use on:**

- `student/grades.html` → Per-item grade breakdown table.
- `student/help.html` → Support ticket history table.
- `student/certificates.html` → If a table view is added.
- `student/live-sessions.html` → Past sessions table.

**Example usage:**

```javascript
$(document).ready(function () {
  $("#gradesTable").DataTable({
    pageLength: 10,
    order: [[0, "asc"]],
    language: { search: "Filter records:" },
  });
});
```

---

### 7.2 Grid.js — No-jQuery Modern Data Table (Alternative)

**Version:** 6.x
**Size:** ~30 KB (no jQuery needed)
**Purpose:** Use instead of DataTables when you want to avoid jQuery.
Lightweight, modern, framework-agnostic.

```html
<!-- CSS -->
<link
  href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css"
  rel="stylesheet"
/>
<!-- JS -->
<script src="https://unpkg.com/gridjs/dist/gridjs.production.min.js"></script>
```

**Rule:** Use Grid.js OR DataTables on a page — never both.
Prefer Grid.js for new pages. Use DataTables only if Bootstrap 5 style
integration is critical.

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 8 — DRAG & DROP (UI SORTING)

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 8.1 SortableJS — Drag to Reorder Lists

**Version:** Latest
**Size:** ~30 KB
**Purpose:** Draggable/sortable lists, reorder course modules,
reorder quiz questions, reorder sidebar items.

```html
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
```

**Use on:**

- `student/my-courses.html` → Reorder enrolled courses (if feature added).
- `student/schedule.html` → Reorder task list view.
- `student/settings.html` → Reorder notification preferences.

**Example usage:**

```javascript
Sortable.create(document.getElementById("courseList"), {
  animation: 150,
  ghostClass: "bg-primary-subtle",
  handle: ".drag-handle",
});
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 9 — ANIMATIONS & SCROLL

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 9.1 AOS (Animate On Scroll) — Scroll-Triggered Animations

**Version:** 2.3.x
**Size:** ~14 KB
**Purpose:** Fade, slide, zoom animations triggered when elements
scroll into viewport. ONLY for landing/public pages.

```html
<!-- CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"
  rel="stylesheet"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
```

**Initialize:**

```javascript
AOS.init({ duration: 600, once: true, offset: 80 });
```

**Use on (landing pages only):**

- `index.html` → Hero section, features section, stats section, testimonials.
- `about.html` → Team cards, timeline items.
- `pricing.html` → Pricing cards entrance animation.
- `courses.html` → Course cards fade in on scroll.

**HTML usage:**

```html
<div data-aos="fade-up">Content animates in on scroll</div>
<div data-aos="fade-right" data-aos-delay="100">Delayed</div>
```

**Rule:** Do NOT use AOS on student panel pages (too distracting in a dashboard).
Student panel uses CSS transitions only.

---

### 9.2 Typed.js — Typewriter Text Animation

**Version:** 2.x
**Size:** ~11 KB
**Purpose:** Animated typing effect for hero headline text.
Use sparingly — only one instance per page.

```html
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js"></script>
```

**Use on:**

- `index.html` → Hero section subtitle cycling through value propositions.

**Example usage:**

```javascript
new Typed("#typed-text", {
  strings: [
    "Learn at your own pace.",
    "Get certified online.",
    "Grow your career today.",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
});
```

---

### 9.3 Swiper.js — Touch Slider / Carousel

**Version:** 11.x
**Size:** ~38 KB
**Purpose:** Smooth, mobile-friendly sliders/carousels with touch support.
Better than Bootstrap carousel for image-heavy or card carousels.

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

**Use on:**

- `index.html` → Testimonials carousel (instead of Alpine.js manual slider).
- `index.html` → Instructor spotlight horizontal scroll cards.
- `course-detail.html` → Related courses horizontal slider.
- `student/certificates.html` → Certificates horizontal slider (optional).

**Example usage:**

```javascript
new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 5000 },
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
});
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 10 — UTILITY LIBRARIES

## ━━━━━━━━━━━━━━━━��━━━━━━━━━━━━━━━━

### 10.1 Day.js — Date Formatting & Manipulation

**Version:** Latest
**Size:** ~2 KB (incredibly tiny)
**Purpose:** Format dates, calculate countdowns, relative time ("2 days ago"),
due date calculations. Drop-in replacement for Moment.js.

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@latest/dayjs.min.js"></script>
<!-- Relative Time Plugin -->
<script src="https://cdn.jsdelivr.net/npm/dayjs@latest/plugin/relativeTime.js"></script>
<!-- Initialize plugin -->
<script>
  dayjs.extend(dayjs_plugin_relativeTime);
</script>
```

**Use on:**

- `student/assignments.html` → "Due in 3 days" / "Overdue by 2 days" countdown.
- `student/forum.html` → Thread "last activity" relative time.
- `student/announcements.html` → Posted "2 hours ago" labels.
- `student/live-sessions.html` → Session date formatting.
- Any page showing dates or relative times.

**Example usage:**

```javascript
dayjs("2026-04-10").fromNow(); // "in 14 days"
dayjs("2026-03-20").fromNow(); // "10 days ago"
dayjs().format("MMMM D, YYYY"); // "March 27, 2026"
dayjs("2026-04-05 14:00").diff(dayjs(), "hour"); // hours until deadline
```

---

### 10.2 Lodash — JavaScript Utility Functions

**Version:** 4.x
**Size:** ~24 KB (minified)
**Purpose:** Array manipulation, deep cloning, debouncing search inputs,
grouping data by category, sorting arrays of objects.

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
```

**Use on:**

- `student/my-courses.html` → Sort/group/filter course arrays.
- `student/grades.html` → Calculate averages, sort grade data.
- `courses.html` → Filter + sort course catalog.
- Any page using Alpine.js with complex data manipulation.

**Example usage:**

```javascript
// Debounce live search (avoid firing on every keystroke)
const search = _.debounce((query) => {
  /* filter courses */
}, 300);

// Group assignments by course
const grouped = _.groupBy(assignments, "course");

// Sort by multiple fields
const sorted = _.orderBy(courses, ["progress", "title"], ["desc", "asc"]);
```

---

### 10.3 CountUp.js — Animated Number Counters

**Version:** 2.x
**Size:** ~7 KB
**Purpose:** Smooth animated number counting for statistics sections.
Better than manual Alpine.js setInterval approach for complex counters.

```html
<script src="https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js"></script>
```

**Use on:**

- `index.html` → Statistics section (50K+ students, 500+ courses, etc.).
- `about.html` → Stats section.
- `student/dashboard.html` → Stat cards (optional).

**Example usage:**

```javascript
// Trigger when element enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      new CountUp("studentCount", 50000, {
        duration: 2.5,
        suffix: "+",
        separator: ",",
      }).start();
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(document.getElementById("studentCount"));
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CATEGORY 11 — OPTIONAL / SPECIALIZED

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 11.1 Prism.js — Code Syntax Highlighting

**Version:** 1.x
**Size:** ~6 KB (core)
**Purpose:** Highlight code blocks in blog posts, forum threads,
and course content areas.

```html
<!-- CSS Theme (choose one) -->
<link
  href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css"
  rel="stylesheet"
/>
<!-- JS Core -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<!-- Language support (add as needed) -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js"></script>
```

**Use on:**

- `blog-post.html` → Code blocks in article content.
- `student/forum-thread.html` → Code snippets in replies.
- `student/library.html` → Code resource previews.

---

### 11.2 Particles.js (tsParticles) — Background Particle Effects

**Version:** Latest (tsParticles - maintained fork)
**Size:** ~50 KB
**Purpose:** Subtle animated particle background for hero sections.
Use VERY sparingly — only if needed for visual impact on homepage.

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles-slim@2/tsparticles.slim.bundle.min.js"></script>
```

**Use on:**

- `index.html` → Hero section background (optional, only if design requires it).
- `login.html` → Full-page background animation (optional).

**Rule:** Only use if explicitly requested. Keep particle count low (< 50)
to avoid performance issues on mobile.

---

### 11.3 NProgress — Page Loading Progress Bar

**Version:** 0.2.x
**Size:** ~5 KB
**Purpose:** Slim top progress bar that simulates page loading.
Adds perceived performance improvement on page transitions.

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css"
/>
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.js"></script>
```

**Use on:**

- All student panel pages → Show on page load start, complete after content renders.

**Example usage:**

```javascript
// In <head> or top of body
NProgress.configure({ showSpinner: false, color: "var(--primary)" });
NProgress.start();
window.addEventListener("load", () => NProgress.done());
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## QUICK REFERENCE SUMMARY TABLE

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| #   | Library          | Version | Size   | Purpose                        | Pages                          |
| --- | ---------------- | ------- | ------ | ------------------------------ | ------------------------------ |
| 1   | **Alpine.js**    | 3.x     | 12 KB  | All reactive UI (PRIMARY)      | ALL pages                      |
| 2   | **Bootstrap**    | 5.3     | ~60 KB | Layout, components, grid       | ALL pages                      |
| 3   | **Chart.js**     | 4.x     | 60 KB  | Bar/line/pie charts            | grades, dashboard              |
| 4   | **ApexCharts**   | Latest  | 120 KB | Radial/donut/sparkline charts  | grades, quizzes                |
| 5   | **FullCalendar** | 6.x     | 80 KB  | Month/week/day calendar        | schedule                       |
| 6   | **Flatpickr**    | 4.x     | 16 KB  | Date/time picker input         | profile, assignments, settings |
| 7   | **SweetAlert2**  | 11.x    | 45 KB  | Confirm dialogs, alerts        | settings, quiz, assignments    |
| 8   | **Notyf**        | 3.x     | 7 KB   | Toast notifications            | ALL pages                      |
| 9   | **Quill**        | 2.x     | 43 KB  | Rich text / WYSIWYG editor     | forum, assignments             |
| 10  | **FilePond**     | 4.x     | 31 KB  | Drag & drop file upload        | assignments, profile, help     |
| 11  | **DataTables**   | 1.13    | 85 KB  | Searchable/sortable tables     | grades, help, sessions         |
| 12  | **Grid.js**      | 6.x     | 30 KB  | Modern tables (no jQuery)      | Alt to DataTables              |
| 13  | **SortableJS**   | Latest  | 30 KB  | Drag to reorder lists          | my-courses, settings           |
| 14  | **AOS**          | 2.3     | 14 KB  | Scroll-triggered animations    | Landing pages ONLY             |
| 15  | **Typed.js**     | 2.x     | 11 KB  | Typewriter text effect         | index.html hero only           |
| 16  | **Swiper.js**    | 11.x    | 38 KB  | Touch carousel/slider          | index, course-detail           |
| 17  | **Day.js**       | Latest  | 2 KB   | Date formatting, relative time | ALL pages with dates           |
| 18  | **Lodash**       | 4.x     | 24 KB  | Array/object utilities         | data-heavy pages               |
| 19  | **CountUp.js**   | 2.x     | 7 KB   | Animated number counters       | index, about, dashboard        |
| 20  | **Prism.js**     | 1.x     | 6 KB   | Code syntax highlighting       | blog-post, forum-thread        |
| 21  | **tsParticles**  | Latest  | 50 KB  | Hero background particles      | index (optional)               |
| 22  | **NProgress**    | 0.2     | 5 KB   | Page loading progress bar      | All student pages              |

---

## ⚡ DECISION GUIDE FOR THE AI

```
Need interactivity (tabs, toggles, modals, forms)?
  → USE Alpine.js

Need a chart?
  → Bar/Line/Pie? USE Chart.js
  → Circular/Radial/Donut score? USE ApexCharts

Need a calendar?
  → Full month/week view? USE FullCalendar
  → Just a date input field? USE Flatpickr

Need to show a confirmation before deleting or submitting?
  → USE SweetAlert2

Need to show a brief success/error notification?
  → USE Notyf

Need a text area with formatting (bold, links, code)?
  → USE Quill

Need file upload with drag-and-drop UI?
  → USE FilePond

Need to display a big sortable/searchable table?
  → USE DataTables (if jQuery is already loaded) OR Grid.js (no jQuery)

Need drag-to-reorder a list?
  → USE SortableJS

Need scroll-triggered entrance animations?
  → Landing pages only → USE AOS
  → Student panel → USE CSS transitions only (no AOS)

Need a smooth sliding carousel?
  → USE Swiper.js

Need to format or calculate dates?
  → USE Day.js (always — never manually calculate dates)

Need animated number counters?
  → USE CountUp.js

Need code blocks with syntax colors?
  → USE Prism.js

Need a typing animation in the hero?
  → USE Typed.js (one instance only)

Need a top loading progress bar?
  → USE NProgress on student panel pages
```

---

## 🚫 LIBRARIES NOT ALLOWED

These are explicitly banned from this project:

| Library                  | Reason                                                               |
| ------------------------ | -------------------------------------------------------------------- |
| jQuery                   | Too heavy; Alpine.js replaces it. Exception: DataTables requires it. |
| React / Vue / Angular    | Requires build tools. Not CDN-compatible for this project.           |
| Moment.js                | Deprecated and heavy. Use Day.js instead.                            |
| Bootstrap 4              | Use Bootstrap 5.3 only.                                              |
| Animate.css (for scroll) | Use AOS instead — it handles trigger timing.                         |
| GSAP (free tier)         | Overkill for this project. Use AOS + CSS for animations.             |
| Axios                    | Use native `fetch()` API instead.                                    |
| Lodash FP                | Use standard Lodash 4.x only.                                        |

---

_js-libraries.md v1.0 | EduLearn LMS | 2026-03-27_
_Use alongside plan.md for complete implementation guidance._
