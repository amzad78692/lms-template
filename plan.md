# 🎓 EduLearn LMS — Complete UI Implementation Plan

> Stack: HTML5 + Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons + Google Fonts
> Colors: Configurable via CSS Custom Properties (Blue, Black, White)
> Scope: Public Landing Pages + Student Panel (14 pages)

---

## 📁 PROJECT FILE STRUCTURE

```
edulearn-lms/
│
├── index.html                  ← Landing Page (Home)
├── about.html                  ← About Us
├── courses.html                ← Course Catalog (Public)
├── course-detail.html          ← Single Course Detail (Public)
├── pricing.html                ← Pricing Plans
├── blog.html                   ← Blog / Articles List
├── blog-post.html              ← Single Blog Post
├── contact.html                ← Contact Us
├── faq.html                    ← FAQ Page
├── login.html                  ← Login Page
├── register.html               ← Register / Sign Up Page
├── forgot-password.html        ← Forgot Password
├── reset-password.html         ← Reset Password
├── verify-email.html           ← Email Verification
│
├── student/
│   ├── dashboard.html          ← Student Dashboard
│   ├── my-courses.html         ← My Enrolled Courses
│   ├── assignments.html        ← Assignments
│   ├── quizzes.html            ← Quizzes & Exams
│   ├── quiz-taking.html        ← Active Quiz Screen
│   ├── grades.html             ← Grades & Progress
│   ├── schedule.html           ← My Schedule / Calendar
│   ├── library.html            ← Library & Study Materials
│   ├── live-sessions.html      ← Live Sessions
│   ├── forum.html              ← Discussion Forum
│   ├── forum-thread.html       ← Single Forum Thread
│   ├── announcements.html      ← Announcements
│   ├── profile.html            ← My Profile
│   ├── certificates.html       ← My Certificates
│   ├── settings.html           ← Account Settings
│   └── help.html               ← Help & Support
│
├── assets/
│   ├── css/
│   │   ├── theme.css           ← CSS Variables + Global Styles
│   │   ├── landing.css         ← Landing pages specific styles
│   │   └── student.css         ← Student panel specific styles
│   └── js/
│       ├── app.js              ← Shared Alpine.js components
│       └── theme-toggle.js     ← Dark/Light mode logic
```

---

## 🎨 GLOBAL THEME CONFIGURATION

> All colors must be defined in `assets/css/theme.css` as CSS custom properties.
> Changing a variable here updates the ENTIRE project.

```css
:root {
  /* ── Brand Colors ─────────────────────────── */
  --primary: #0d6efd; /* Main Blue          */
  --primary-dark: #0a58ca; /* Hover Blue         */
  --primary-light: #cfe2ff; /* Light Blue Tint    */
  --primary-gradient: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);

  /* ── Neutral Colors ───────────────────────── */
  --accent: #000000; /* Black              */
  --surface: #ffffff; /* White              */
  --surface-alt: #f8f9fa; /* Off White / Page BG*/
  --surface-elevated: #ffffff; /* Cards BG           */

  /* ── Sidebar ──────────────────────────────── */
  --sidebar-bg: #000000;
  --sidebar-text: #ffffff;
  --sidebar-muted: #adb5bd;
  --sidebar-active-bg: #0d6efd;
  --sidebar-hover-bg: rgba(255, 255, 255, 0.08);
  --sidebar-width: 260px;
  --sidebar-collapsed: 64px;

  /* ── Typography ───────────────────────────── */
  --text-primary: #212529;
  --text-secondary: #495057;
  --text-muted: #6c757d;
  --text-light: #adb5bd;
  --font-family: "Poppins", sans-serif;
  --font-size-base: 14px;

  /* ── Borders & Shadows ────────────────────── */
  --border-color: #dee2e6;
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  --card-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.14);

  /* ── Status Colors ────────────────────────── */
  --success: #198754;
  --warning: #ffc107;
  --danger: #dc3545;
  --info: #0dcaf0;

  /* ── Navbar ───────────────────────────────── */
  --navbar-height: 64px;
  --navbar-bg: #ffffff;
  --navbar-border: #dee2e6;

  /* ── Transitions ──────────────────────────── */
  --transition-fast: 0.15s ease;
  --transition-base: 0.25s ease;
  --transition-slow: 0.4s ease;
}

/* Dark Mode Overrides */
[data-theme="dark"] {
  --surface: #1a1a2e;
  --surface-alt: #16213e;
  --surface-elevated: #0f3460;
  --text-primary: #e9ecef;
  --text-secondary: #adb5bd;
  --border-color: #2d3748;
  --navbar-bg: #1a1a2e;
  --card-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}
```

---

## 🌐 SECTION A — PUBLIC LANDING PAGES

---

### PAGE A1: `index.html` — Homepage / Landing Page

#### 🔷 Navigation Bar (Sticky)

- Logo (left): Icon + "EduLearn" text
- Nav Links (center): Home, Courses, About, Blog, Pricing, Contact
- Right side:
  - 🌙 Dark/Light mode toggle (Alpine.js + localStorage)
  - Language selector dropdown (EN/AR/FR — placeholder)
  - "Log In" button (outlined)
  - "Get Started Free" button (filled, primary color)
- Mobile: hamburger → full-height off-canvas drawer
- Scroll behavior: transparent on top → white/dark on scroll (Alpine.js)
- Active link underline indicator

#### 🔷 Hero Section

- Split layout: left text + right visual (mockup screenshot or illustration)
- Headline: "Learn Without Limits. Grow Without Boundaries."
- Sub-headline: 2-line value proposition
- Two CTA buttons: "Start Free Today" (primary) + "Watch Demo" (outlined with play icon)
- Hero stats bar (inline): 🎓 50K+ Students | 📚 500+ Courses | 🏆 200+ Instructors | ⭐ 4.9 Rating
- Background: subtle gradient using --primary-gradient with low opacity overlay
- Floating badges (CSS animated): "New Course!", "Certificate Included", "#1 LMS 2026"
- Scroll-down arrow indicator (CSS bounce animation)

#### 🔷 Trusted By / Partners Section

- Section title: "Trusted by leading organizations"
- Logos row (grayscale → color on hover): 6–8 company logo placeholders
- CSS marquee/scroll animation for logos

#### 🔷 Features Highlight Section

- Section title + subtitle
- Tab switcher (Alpine.js): Students | Instructors | Organizations
- Each tab shows 3 feature cards with:
  - Large icon (Bootstrap Icons, primary color)
  - Feature title
  - Short description
  - "Learn more →" link
- Features to cover:
  - Interactive Video Lessons
  - Live Virtual Classes
  - Quizzes & Assessments
  - Progress Tracking
  - Certificates & Badges
  - Mobile Learning App
  - Discussion Forums
  - Offline Downloads
  - AI-Powered Recommendations
  - Analytics Dashboard
  - Multi-language Support
  - SCORM/xAPI Compatible

#### 🔷 How It Works Section

- 3-step process with numbered icons:
  1. Create Your Account (icon: person-plus)
  2. Browse & Enroll in Courses (icon: journal-bookmark)
  3. Learn & Earn Certificates (icon: award)
- Connector line between steps (CSS)
- CTA button below

#### 🔷 Course Showcase Section

- Section title: "Explore Our Top Courses"
- Filter pills (Alpine.js): All | Development | Design | Business | Marketing | Data Science
- 6-course grid (3×2 on desktop, 1 col mobile):
  - Thumbnail (placehold.co)
  - Category badge
  - Title
  - Instructor avatar + name
  - Star rating + review count
  - Student count
  - Price (or "Free")
  - "Enroll Now" button
- "View All Courses →" button below grid

#### 🔷 Statistics / Impact Section

- Full-width band with primary-gradient background
- 4 animated counters (Alpine.js intersection observer + setInterval):
  - 50,000+ Students Enrolled
  - 500+ Expert Courses
  - 95% Completion Rate
  - 200+ Certified Instructors
- Icons above each counter

#### 🔷 Testimonials Section

- Section title: "What Our Students Say"
- Carousel/Slider (Alpine.js auto-play):
  - Student avatar, name, course, star rating
  - Quote text
  - Prev/Next buttons + dot indicators
- 5 sample testimonials

#### 🔷 Instructor Spotlight Section

- "Meet Our Expert Instructors"
- 4 instructor cards (horizontal scroll on mobile):
  - Avatar, Name, Specialty, Course count, Student count, Rating
  - "View Courses" button
- "Become an Instructor" CTA banner below

#### 🔷 Mobile App Section

- Split layout: phone mockup (CSS box) + text
- "Learn Anywhere, Anytime"
- Feature bullets: Offline mode, Push notifications, Progress sync
- App Store + Google Play download badges (UI only)

#### 🔷 Pricing Preview Section

- "Simple, Transparent Pricing"
- 3 plan cards (Free, Pro, Enterprise) — preview only
- "View Full Pricing →" link to pricing.html

#### 🔷 Blog / Latest Articles Section

- 3 blog post cards:
  - Thumbnail, Category tag, Title, Excerpt, Author, Date, Read time
  - "Read More →"
- "View All Articles →" link

#### 🔷 Newsletter / CTA Banner Section

- Full-width section with gradient background
- Headline: "Ready to Start Learning?"
- Email input + "Subscribe" button (Alpine.js validation)
- Privacy note: "No spam. Unsubscribe anytime."
- Decorative background pattern (CSS)

#### 🔷 FAQ Teaser Section

- 5 accordion FAQs (Bootstrap collapse)
- "View All FAQs →" link

#### 🔷 Footer (Shared across all landing pages)

- 4-column layout:
  - Column 1: Logo + tagline + social icons (Facebook, Twitter, LinkedIn, Instagram, YouTube)
  - Column 2: Company links (About, Careers, Blog, Press, Partners)
  - Column 3: Platform links (Courses, Pricing, Features, Mobile App, API)
  - Column 4: Support links (Help Center, Contact, Privacy Policy, Terms, Cookie Policy)
- Bottom bar: Copyright + payment icons (placeholder)
- Back-to-top button (Alpine.js)

---

### PAGE A2: `courses.html` — Public Course Catalog

#### Layout: Sidebar filters (left) + Course grid (right)

#### Filter Sidebar:

- Search input (live Alpine.js filter)
- Category (checkboxes): Development, Design, Business, Marketing, Data, Photography
- Level (checkboxes): Beginner, Intermediate, Advanced
- Price (radio): All, Free, Paid, Under $20, $20–$50
- Duration: Under 2hrs, 2–5hrs, 5–10hrs, 10hrs+
- Rating: ⭐⭐⭐⭐+ and above filters
- Language dropdown
- "Clear All Filters" button

#### Course Grid:

- Sort bar: showing "X results" + Sort by dropdown (Most Popular, Newest, Rating, Price)
- View toggle (Grid/List — Alpine.js)
- 12 course cards (same design as Homepage showcase)
- Pagination (Bootstrap)
- "No results" empty state

---

### PAGE A3: `course-detail.html` — Single Course Detail (Public)

#### Sticky Course Header (appears on scroll):

- Course title (truncated) + Enroll button + Price

#### Hero Banner:

- Course title (H1), subtitle
- Breadcrumb: Home > Courses > Category > Course Name
- Star rating + review count + student count + last updated
- Instructor info (small)
- Language + Level badges

#### Two-Column Layout:

**Left (Main Content):**

- "What You'll Learn" (grid checklist, Bootstrap grid)
- Course Requirements (bullet list)
- Course Description (expandable — Alpine.js "read more")
- Curriculum Accordion:
  - Section headers (count of lessons + total duration)
  - Lesson items: icon (video/quiz/text), title, duration, free preview badge
  - Show/hide all sections toggle
- Instructor Bio card (avatar, name, rating, students, bio)
- Student Reviews:
  - Overall rating breakdown (5-star bars — CSS width)
  - 4 individual review cards with avatar, name, date, rating, text
  - "Load More Reviews" button

**Right Column (Sticky Enrollment Card):**

- Course preview thumbnail (play button overlay)
- Price (+ strikethrough original price + discount badge)
- Countdown timer for sale (Alpine.js)
- "Enroll Now" / "Start Free Preview" buttons
- Course includes checklist:
  - Video hours, Articles, Downloadable resources
  - Full lifetime access, Certificate of completion
  - Mobile + desktop access
- Share buttons (UI only)
- "30-Day Money Back Guarantee" badge

---

### PAGE A4: `pricing.html` — Pricing Plans

#### Toggle: Monthly / Yearly billing (Alpine.js — shows different prices)

#### 3 Pricing Cards:

| Feature        | Free      | Pro ($19/mo)   | Enterprise (Custom) |
| -------------- | --------- | -------------- | ------------------- |
| Courses        | 5 free    | Unlimited      | Unlimited           |
| Certificates   | ✗         | ✓              | ✓                   |
| Live Sessions  | ✗         | ✓              | ✓                   |
| Offline Access | ✗         | ✓              | ✓                   |
| Support        | Community | Priority Email | Dedicated Manager   |

- Most Popular badge (animated)
- CTA button per plan
- Hover lift effect (CSS)

#### Feature Comparison Table (full detail — collapsible on mobile)

#### FAQ Section (pricing-specific, 5 questions)

#### Money-Back Guarantee Banner

---

### PAGE A5: `about.html` — About Us

- Hero: Mission statement + team photo placeholder
- Our Story (timeline — CSS vertical line with nodes)
- Mission, Vision, Values (3 icon cards)
- Team Section: 8 member cards (avatar, name, role, social links)
- Stats Section (same counters as homepage)
- Partners & Accreditations logos
- Careers CTA banner

---

### PAGE A6: `blog.html` — Blog / Articles

- Hero with search bar
- Featured Post (large card)
- Category filter pills (Alpine.js)
- Article grid (2 cols desktop, 1 col mobile)
- Each card: thumbnail, category, title, excerpt, author avatar + name, date, read time, tags
- Sidebar: Popular Posts, Categories, Tags cloud, Newsletter signup
- Pagination

---

### PAGE A7: `blog-post.html` — Single Blog Post

- Breadcrumb
- Article header: title, subtitle, author, date, read time, tags, share buttons
- Featured image
- Article body with:
  - Headings, paragraphs, blockquotes, code blocks (styled), inline images, bullet lists
- Table of Contents (sticky sidebar — Alpine.js scroll spy)
- Author bio card
- Related articles (3 cards)
- Comments section (UI only — name, email, comment textarea, submit)

---

### PAGE A8: `contact.html` — Contact Us

- Split layout: form (left) + info (right)
- Contact form:
  - Name, Email, Phone, Subject dropdown, Message, File attachment
  - Alpine.js validation + success toast
- Info cards: Address, Phone, Email, Business hours
- Embedded map placeholder (styled div)
- Social media links
- FAQ CTA

---

### PAGE A9: `faq.html` — FAQ Page

- Hero with search (live Alpine.js filter across all FAQs)
- Category tabs (Alpine.js): General, Courses, Payments, Technical, Certificates
- Accordion per category (Bootstrap collapse)
- 8–10 FAQs per category
- "Still have questions?" contact CTA

---

### PAGE A10: `login.html` — Login

- Centered card layout (full-page background gradient)
- Logo at top
- Email + Password fields
- "Remember Me" checkbox
- "Forgot Password?" link
- Sign In button
- Divider: "or continue with"
- OAuth buttons: Google, Microsoft, Apple (UI only)
- "Don't have an account? Register →"
- Alpine.js: form validation, show/hide password toggle, loading state on submit

---

### PAGE A11: `register.html` — Registration

- Multi-step form (Alpine.js step controller):
  - Step 1: Personal Info (First name, Last name, Email, Phone)
  - Step 2: Account Setup (Username, Password, Confirm Password)
  - Step 3: Preferences (Interests checkboxes, Learning goal, How did you hear)
  - Step 4: Confirmation (Success animation + "Go to Dashboard" button)
- Progress bar at top (steps indicator)
- Password strength meter (Alpine.js)
- Terms & Privacy checkbox
- "Already have an account? Login →"

---

### PAGE A12: `forgot-password.html`

- Email input + "Send Reset Link" button
- Success state (Alpine.js): envelope icon + confirmation message
- Back to login link

### PAGE A13: `reset-password.html`

- New password + Confirm password fields
- Password strength indicator
- Submit button
- Redirect to login on success (Alpine.js simulated)

### PAGE A14: `verify-email.html`

- Success/pending states (Alpine.js)
- Resend email button with cooldown timer (Alpine.js setInterval)

---

## 🖥️ SECTION B — STUDENT PANEL (14 Pages)

> Full detail already defined in the original prompt.
> All 14 pages use the shared student panel shell below.

### Shared Student Shell Components:

#### Fixed Sidebar:

- Width: `var(--sidebar-width)` = 260px (collapsed: 64px)
- Background: `var(--sidebar-bg)` = #000000
- Logo + App name at top
- Student avatar + name + badge
- Navigation groups with icons (see original prompt)
- Collapse toggle (Alpine.js, persisted in localStorage)
- Icon-only mode with Bootstrap tooltip on hover
- Active state: `var(--sidebar-active-bg)`

#### Top Navbar:

- Height: `var(--navbar-height)` = 64px
- Hamburger (mobile sidebar drawer)
- Dynamic page title + breadcrumb
- Global search (CMD+K shortcut — Alpine.js overlay)
- Notifications dropdown (Alpine.js)
- Dark/Light mode toggle
- Student avatar dropdown

#### Student Pages List:

| #   | File                         | Title               |
| --- | ---------------------------- | ------------------- |
| 1   | `student/dashboard.html`     | Dashboard           |
| 2   | `student/my-courses.html`    | My Courses          |
| 3   | `student/assignments.html`   | Assignments         |
| 4   | `student/quizzes.html`       | Quizzes & Exams     |
| 5   | `student/quiz-taking.html`   | Quiz Taking Screen  |
| 6   | `student/grades.html`        | Grades & Progress   |
| 7   | `student/schedule.html`      | My Schedule         |
| 8   | `student/library.html`       | Library & Materials |
| 9   | `student/live-sessions.html` | Live Sessions       |
| 10  | `student/forum.html`         | Discussion Forum    |
| 11  | `student/forum-thread.html`  | Forum Thread        |
| 12  | `student/announcements.html` | Announcements       |
| 13  | `student/profile.html`       | My Profile          |
| 14  | `student/certificates.html`  | Certificates        |
| 15  | `student/settings.html`      | Settings            |
| 16  | `student/help.html`          | Help & Support      |

> For full page-by-page detail of all student panel pages,
> refer to the Student Panel prompt (already defined separately).

---

## 🧩 GLOBAL REUSABLE COMPONENTS

Define these as Alpine.js components via `Alpine.data()` in `assets/js/app.js`:

```javascript
// 1. Toast Notification System
Alpine.data('toastManager', () => ({
  toasts: [],
  show(message, type = 'success', duration = 4000) { ... }
}))

// 2. Confirmation Modal
Alpine.data('confirmModal', () => ({
  open: false, title: '', message: '', onConfirm: null,
  trigger(title, message, callback) { ... }
}))

// 3. Dark Mode
Alpine.data('themeToggle', () => ({
  dark: localStorage.getItem('theme') === 'dark',
  toggle() { ... }
}))

// 4. Sidebar State
Alpine.data('sidebarState', () => ({
  collapsed: localStorage.getItem('sidebar') === 'collapsed',
  mobileOpen: false,
  toggle() { ... }
}))

// 5. Search Overlay
Alpine.data('globalSearch', () => ({
  open: false, query: '', results: [],
  search() { ... }
}))

// 6. Form Validator
Alpine.data('formValidator', () => ({
  errors: {}, validate(field, value, rules) { ... }
}))

// 7. Counter Animation
Alpine.data('counter', (target) => ({
  count: 0, start() { ... }
}))

// 8. File Upload
Alpine.data('fileUpload', () => ({
  dragging: false, files: [],
  handleDrop(e) { ... }
}))
```

---

## 🎯 MICRO-INTERACTIONS & ANIMATIONS CHECKLIST

Apply these consistently across all pages:

| #   | Interaction                 | Implementation                                |
| --- | --------------------------- | --------------------------------------------- |
| 1   | Sidebar active highlight    | CSS transition on background-color            |
| 2   | Skeleton loading screens    | CSS shimmer animation (@keyframes)            |
| 3   | Toast notifications         | Alpine.js + CSS slide-in from top-right       |
| 4   | Counter animation           | Alpine.js setInterval + IntersectionObserver  |
| 5   | Dark/light mode             | CSS variables swap + Alpine.js + localStorage |
| 6   | Smooth page transitions     | CSS opacity fade (0→1 on load)                |
| 7   | Card hover lift             | CSS transform: translateY(-4px) + shadow      |
| 8   | Ripple click effect         | CSS pseudo-element animation                  |
| 9   | Progress bar animation      | CSS width transition on load                  |
| 10  | Scroll-triggered animations | Alpine.js IntersectionObserver                |
| 11  | Sticky navbar on scroll     | Alpine.js window scroll listener              |
| 12  | Back-to-top button          | Alpine.js scroll detection                    |
| 13  | Countdown timers            | Alpine.js setInterval                         |
| 14  | Tab switch fade             | Alpine.js x-transition                        |
| 15  | Modal open/close            | Alpine.js x-show + x-transition               |
| 16  | Navbar transparent→solid    | Alpine.js scroll + CSS class toggle           |
| 17  | Hamburger → X animation     | CSS transform                                 |
| 18  | Star rating display         | CSS + Alpine.js loop                          |
| 19  | Password strength meter     | Alpine.js computed + CSS width                |
| 20  | Drag-and-drop upload zone   | Alpine.js dragover/drop events                |
| 21  | Accordion collapse          | Bootstrap collapse API                        |
| 22  | Search live filter          | Alpine.js x-model + computed filter           |
| 23  | Notification badge pulse    | CSS @keyframes pulse                          |
| 24  | Logo marquee / ticker       | CSS animation: marquee infinite               |
| 25  | Form field focus glow       | CSS box-shadow with --primary-light           |

---

## 📐 RESPONSIVE BREAKPOINTS GUIDE

| Breakpoint | Width    | Sidebar         | Columns | Nav       |
| ---------- | -------- | --------------- | ------- | --------- |
| xs         | < 576px  | Hidden (drawer) | 1       | Hamburger |
| sm         | ≥ 576px  | Hidden (drawer) | 1–2     | Hamburger |
| md         | ≥ 768px  | Hidden (drawer) | 2       | Partial   |
| lg         | ≥ 992px  | Visible (full)  | 2–3     | Full      |
| xl         | ≥ 1200px | Visible (full)  | 3–4     | Full      |
| xxl        | ≥ 1400px | Visible (full)  | 4       | Full      |

- All touch targets: minimum 44×44px
- All tables: `overflow-x: auto` wrapper on mobile
- Font size base: 14px (scales up on larger screens)

---

## ♿ ACCESSIBILITY REQUIREMENTS

- [ ] Skip to main content link at top of every page
- [ ] All images: meaningful `alt` attributes
- [ ] All icons used decoratively: `aria-hidden="true"`
- [ ] All icon-only buttons: `aria-label` attribute
- [ ] Form inputs: `<label>` elements or `aria-label`
- [ ] Modal: `role="dialog"`, `aria-modal="true"`, focus trap
- [ ] Navbar: `role="navigation"` + `aria-label`
- [ ] Color contrast: WCAG AA (4.5:1 for text, 3:1 for UI components)
- [ ] Keyboard navigable: Tab, Enter, Escape, Arrow keys
- [ ] Focus visible: custom `:focus-visible` outline using --primary

---

## 📦 CDN DEPENDENCIES (All pages)

```html
<!-- Google Fonts -->
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>

<!-- Bootstrap 5.3 CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<!-- Bootstrap Icons -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
  rel="stylesheet"
/>

<!-- Bootstrap 5.3 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Alpine.js 3.x -->
<script
  defer
  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
></script>
```

---

## 🖼️ PLACEHOLDER IMAGES GUIDE

Use `https://placehold.co/` for all images:

| Usage               | Size    | Example URL                                                   |
| ------------------- | ------- | ------------------------------------------------------------- |
| Course thumbnail    | 400×225 | `https://placehold.co/400x225/0d6efd/ffffff?text=Course`      |
| Instructor avatar   | 80×80   | `https://placehold.co/80x80/000000/ffffff?text=JL`            |
| Student avatar      | 40×40   | `https://placehold.co/40x40/0d6efd/ffffff?text=AJ`            |
| Blog thumbnail      | 600×400 | `https://placehold.co/600x400/0d6efd/ffffff?text=Blog`        |
| Certificate preview | 400×280 | `https://placehold.co/400x280/000000/ffffff?text=Certificate` |
| Hero illustration   | 600×500 | `https://placehold.co/600x500/cfe2ff/0d6efd?text=LMS+Hero`    |
| Team member photo   | 200×200 | `https://placehold.co/200x200/f8f9fa/000000?text=Team`        |

---

## 📊 SAMPLE DUMMY DATA (Use consistently across all pages)

```
Platform Name:    EduLearn LMS
Tagline:          "Learn Without Limits. Grow Without Boundaries."
Year:             2026

Student:
  Name:           Alex Johnson
  Username:       alexj
  Email:          alex.johnson@email.com
  Student ID:     STU-2026-0042
  Enrolled Since: January 2025
  GPA:            3.7 / 4.0
  Enrolled:       6 courses
  Completed:      2 courses

Courses:
  1. Advanced JavaScript        → Sarah Mitchell  → Development → 87% progress
  2. UX Design Fundamentals     → James Lee       → Design      → 45% progress
  3. Data Science with Python   → Priya Sharma    → Data        → 12% progress
  4. Digital Marketing 101      → David Clark     → Marketing   → 100% (Completed)
  5. Cloud Computing Basics     → Sarah Mitchell  → IT          → 100% (Completed)
  6. Graphic Design Essentials  → James Lee       → Design      → 0% (Not started)

Instructors:
  - Sarah Mitchell  → Full-Stack Development → ⭐ 4.9 → 12,000 students
  - James Lee       → UI/UX & Design         → ⭐ 4.8 → 9,500 students
  - Priya Sharma    → Data Science & AI      → ⭐ 4.9 → 15,200 students
  - David Clark     → Business & Marketing   → ⭐ 4.7 → 8,300 students

Platform Stats:
  Students:         50,000+
  Courses:          500+
  Instructors:      200+
  Completion Rate:  95%
  Rating:           4.9/5
```

---

## 🚀 IMPLEMENTATION ORDER (Recommended)

Build in this sequence for fastest visible progress:

```
Phase 1 — Foundation (Day 1)
  [1] assets/css/theme.css     ← CSS Variables (do this FIRST)
  [2] assets/js/app.js          ← Alpine.js shared components
  [3] Navbar component (shared)
  [4] Footer component (shared)
  [5] Student sidebar (shared)

Phase 2 — Landing Pages (Day 2–3)
  [6]  index.html         ← Homepage (highest priority)
  [7]  courses.html        ← Course Catalog
  [8]  course-detail.html  ← Course Detail
  [9]  pricing.html
  [10] about.html
  [11] blog.html + blog-post.html
  [12] contact.html
  [13] faq.html

Phase 3 — Auth Pages (Day 3)
  [14] login.html
  [15] register.html
  [16] forgot-password.html
  [17] reset-password.html
  [18] verify-email.html

Phase 4 — Student Panel (Day 4–6)
  [19] student/dashboard.html      ← Start here
  [20] student/my-courses.html
  [21] student/assignments.html
  [22] student/quizzes.html
  [23] student/quiz-taking.html
  [24] student/grades.html
  [25] student/schedule.html
  [26] student/library.html
  [27] student/live-sessions.html
  [28] student/forum.html
  [29] student/forum-thread.html
  [30] student/announcements.html
  [31] student/profile.html
  [32] student/certificates.html
  [33] student/settings.html
  [34] student/help.html

Phase 5 — Polish (Day 7)
  [ ] Test all responsive breakpoints
  [ ] Verify all Alpine.js interactions
  [ ] Check dark mode on all pages
  [ ] Accessibility audit
  [ ] Cross-browser check (Chrome, Firefox, Safari, Edge)
```

---

## ✅ FINAL QUALITY CHECKLIST

Before marking any page as complete:

- [ ] Opens in browser with zero errors (no broken links/scripts)
- [ ] Mobile responsive (test at 375px, 768px, 1280px, 1440px)
- [ ] Dark mode works correctly
- [ ] All Alpine.js interactions functional
- [ ] CSS variables used (no hardcoded colors)
- [ ] All images use placehold.co
- [ ] Consistent typography (Poppins)
- [ ] Consistent spacing (Bootstrap spacing utilities)
- [ ] All CTAs and buttons functional (visual feedback)
- [ ] Forms show validation states
- [ ] Page has correct `<title>` tag
- [ ] Sidebar active link matches current page

---

_Plan version: 1.0 | Created: 2026-03-27 | Stack: HTML5 + Bootstrap 5.3 + Alpine.js 3.x_
