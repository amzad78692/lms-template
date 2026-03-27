# 🎓 EduLearn LMS — AI Implementation Plan (Section-by-Section Method)

> Version: 2.0 | Date: 2026-03-27
> Stack: HTML5 · Bootstrap 5.3 CDN · Alpine.js 3.x CDN · Bootstrap Icons CDN · Google Fonts (Poppins)
> Colors: Configurable via CSS Custom Properties — Blue (#0d6efd) · Black (#000000) · White (#ffffff)
> Rule: Give the AI ONE task at a time. Wait for output. Then move to next task.

---

## ⚙️ HOW TO USE THIS PLAN

1. Copy the **"Prompt to send"** block for each step exactly as written.
2. Paste it into the AI chat (Claude / GPT-4o / Gemini).
3. Wait for the **complete output** before moving to the next step.
4. If output is still cut off — ask: `"Continue from where you stopped."`
5. Paste all outputs into your project files in order.

---

## 🌐 CDN BLOCK (Include in every prompt as reference)

```
ALWAYS use these CDNs. No npm. No build tools. Browser-ready only.

<!-- Poppins Font -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<!-- Bootstrap 5.3 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
<!-- Bootstrap 5.3 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- Alpine.js 3.x -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PHASE 0 — FOUNDATION (Do this FIRST)

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### STEP 0.1 — CSS Variables (theme.css)

**Prompt to send:**

```
Create a file called assets/css/theme.css.
It must contain ONLY CSS custom properties inside :root and a [data-theme="dark"] block.
No other CSS. No classes. Just variables.

Include these variables:
:root {
  --primary: #0d6efd;
  --primary-dark: #0a58ca;
  --primary-light: #cfe2ff;
  --primary-gradient: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  --accent: #000000;
  --surface: #ffffff;
  --surface-alt: #f8f9fa;
  --surface-elevated: #ffffff;
  --sidebar-bg: #000000;
  --sidebar-text: #ffffff;
  --sidebar-muted: #adb5bd;
  --sidebar-active-bg: #0d6efd;
  --sidebar-hover-bg: rgba(255,255,255,0.08);
  --sidebar-width: 260px;
  --sidebar-collapsed: 64px;
  --text-primary: #212529;
  --text-secondary: #495057;
  --text-muted: #6c757d;
  --font-family: 'Poppins', sans-serif;
  --border-color: #dee2e6;
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  --card-shadow: 0 2px 12px rgba(0,0,0,0.08);
  --card-shadow-hover: 0 8px 24px rgba(0,0,0,0.14);
  --success: #198754;
  --warning: #ffc107;
  --danger: #dc3545;
  --info: #0dcaf0;
  --navbar-height: 64px;
  --navbar-bg: #ffffff;
  --transition-base: 0.25s ease;
}
[data-theme="dark"] {
  --surface: #1a1a2e;
  --surface-alt: #16213e;
  --surface-elevated: #0f3460;
  --text-primary: #e9ecef;
  --text-secondary: #adb5bd;
  --border-color: #2d3748;
  --navbar-bg: #1a1a2e;
  --card-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

Output the complete theme.css file content only.
```

---

### STEP 0.2 — Alpine.js Shared Components (app.js)

**Prompt to send:**

```
Create a file called assets/js/app.js.
This file registers reusable Alpine.js components using Alpine.data().
Use Alpine.js 3.x syntax only. No jQuery. No other libraries.

Include these 6 components:

1. toastManager — manages toast notifications array.
   Methods: show(message, type, duration). Types: success, error, warning, info.
   Auto-removes toast after duration (default 4000ms).

2. confirmModal — reusable confirmation dialog.
   Properties: open (bool), title, message, onConfirm (function).
   Methods: trigger(title, message, callback), confirm(), cancel().

3. themeToggle — dark/light mode switcher.
   Reads/writes to localStorage key 'lms-theme'.
   On init: applies saved theme to document.documentElement dataset.
   Method: toggle().

4. sidebarState — manages sidebar collapsed/expanded and mobile drawer.
   Reads/writes localStorage key 'lms-sidebar'.
   Properties: collapsed (bool), mobileOpen (bool).
   Methods: toggle(), toggleMobile(), close().

5. globalSearch — search overlay.
   Properties: open (bool), query (string).
   Opens on CMD+K or CTRL+K keyboard shortcut.
   Method: search() filters a hardcoded array of page links by query.

6. fileUpload — drag and drop file upload UI (visual only, no actual upload).
   Properties: dragging (bool), files (array).
   Methods: handleDrop(event), handleSelect(event), removeFile(index).

Output the complete app.js file.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PHASE 1 — SHARED LAYOUT COMPONENTS

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### STEP 1.1 — Public Navbar Component

**Prompt to send:**

```
Build ONLY the top navigation bar HTML component for a public LMS website.
Save it as: components/public-navbar.html

Rules:
- Use Bootstrap 5.3 and Bootstrap Icons only. No custom JS frameworks except Alpine.js.
- All colors must use CSS variables (e.g., var(--primary), var(--sidebar-bg)).
- Must be fully responsive (mobile hamburger → off-canvas drawer on small screens).

Include:
1. Left: Logo icon (bi-mortarboard) + text "EduLearn" in var(--primary) color.
2. Center (desktop only): Nav links — Home, Courses, About, Blog, Pricing, Contact.
   Active link has bottom border in var(--primary).
3. Right side:
   - Dark/Light toggle button (moon/sun icon, Alpine.js themeToggle component).
   - Language dropdown (EN / AR / FR — labels only, no functionality).
   - "Log In" button (outlined, var(--primary) border).
   - "Get Started Free" button (filled, var(--primary) background).
4. Scroll behavior: navbar starts transparent, becomes white with shadow after 50px scroll.
   Use Alpine.js window scroll listener and a CSS class toggle.
5. Mobile: hamburger opens Bootstrap off-canvas with same nav links stacked vertically.

Output complete HTML snippet (not a full page).
```

---

### STEP 1.2 — Public Footer Component

**Prompt to send:**

```
Build ONLY the footer HTML component for a public LMS website.
Save it as: components/public-footer.html

Rules:
- Bootstrap 5.3 only. CSS variables for all colors.
- No JavaScript needed.

Include:
1. Top section — 4 equal columns:
   Column 1: Logo (bi-mortarboard) + tagline "Learn Without Limits."
             + social icons row: Facebook, Twitter, LinkedIn, Instagram, YouTube
             (Bootstrap Icons, links to #).
   Column 2: "Company" heading + links: About Us, Careers, Blog, Press, Partners.
   Column 3: "Platform" heading + links: Courses, Pricing, Features, Mobile App, API.
   Column 4: "Support" heading + links: Help Center, Contact Us, Privacy Policy,
             Terms of Service, Cookie Policy.
2. Divider line.
3. Bottom bar: "© 2026 EduLearn LMS. All rights reserved." (left)
              + payment icons row (use bi-credit-card, bi-paypal icons) (right).
4. On mobile: all 4 columns stack to 1 column.

Output complete HTML snippet only.
```

---

### STEP 1.3 — Student Panel Sidebar

**Prompt to send:**

```
Build ONLY the sidebar HTML component for the student panel.
Save it as: components/student-sidebar.html

Rules:
- Bootstrap 5.3 + Alpine.js 3.x. CSS variables for all colors.
- Background: var(--sidebar-bg) = black. Text: var(--sidebar-text) = white.
- Width: var(--sidebar-width) = 260px. Collapsed width: var(--sidebar-collapsed) = 64px.

Include:
1. Top section:
   - Logo: bi-mortarboard icon + "EduLearn" text (hidden when collapsed).
   - Collapse toggle button (bi-chevron-left / bi-chevron-right, Alpine.js toggle).

2. Student profile card:
   - Avatar: https://placehold.co/40x40/0d6efd/ffffff?text=AJ
   - Name: "Alex Johnson" (hidden when collapsed).
   - Badge: "Student" (hidden when collapsed).

3. Navigation — grouped into 4 sections with small section label (hidden when collapsed):
   MAIN: Dashboard (bi-house), My Courses (bi-journal-bookmark),
         Schedule (bi-calendar3), Assignments (bi-pencil-square),
         Quizzes (bi-patch-question), Grades (bi-bar-chart-line).
   RESOURCES: Library (bi-folder2-open), Live Sessions (bi-camera-video),
              Forum (bi-chat-dots), Announcements (bi-megaphone) [red badge "3"].
   ACCOUNT: Profile (bi-person-circle), Certificates (bi-award), Settings (bi-gear).
   OTHER: Help (bi-question-circle), Logout (bi-box-arrow-right) [danger color].

4. Each nav item:
   - Icon + label (label hidden in collapsed mode).
   - Active state: var(--sidebar-active-bg) background, rounded.
   - Hover state: var(--sidebar-hover-bg) background.
   - Bootstrap tooltip showing label when sidebar is collapsed.

5. Alpine.js behavior:
   - Use sidebarState component (x-data="sidebarState()").
   - Persist collapsed state in localStorage key 'lms-sidebar'.
   - On mobile (< 992px): sidebar is hidden, opens as off-canvas drawer.

Output complete HTML snippet only.
```

---

### STEP 1.4 — Student Panel Top Navbar

**Prompt to send:**

```
Build ONLY the top navbar for the student panel (not the public website).
Save it as: components/student-navbar.html

Rules:
- Bootstrap 5.3 + Alpine.js 3.x. CSS variables for all colors.
- Height: var(--navbar-height) = 64px. Background: var(--navbar-bg).
- Bottom border: 1px solid var(--border-color).

Include (left to right):
1. Hamburger button (bi-list) — visible on mobile only, toggles sidebar drawer.
2. Page title — dynamic placeholder text "Dashboard" (change per page).
3. Breadcrumb — small, muted. Example: Home / Dashboard.
4. Spacer (flex-grow).
5. Global search bar — input with bi-search icon, placeholder "Search... (Ctrl+K)".
   On click or Ctrl+K: opens a full-screen search overlay (Alpine.js globalSearch component).
6. Notification bell (bi-bell) with badge "3":
   - Click opens Bootstrap dropdown with 3 sample notifications.
   - Each notification: icon, text, time ago.
   - "Mark all read" link at bottom.
7. Dark/Light mode toggle (bi-moon / bi-sun, Alpine.js themeToggle).
8. Student avatar dropdown:
   - Avatar: https://placehold.co/36x36/0d6efd/ffffff?text=AJ
   - Name: "Alex Johnson".
   - Dropdown items: View Profile, Settings, Logout (with icons).

Output complete HTML snippet only.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PHASE 2 — LANDING PAGES

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Each page = multiple steps. Build one section at a time.

---

### PAGE: index.html (Homepage)

---

#### STEP 2.1 — Homepage: Hero Section

**Prompt to send:**

```
Build ONLY the Hero Section for an LMS homepage. Output a standalone HTML snippet.
Do NOT include navbar or footer. Do NOT build the full page.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables for all colors.

Hero layout (split — 2 columns on desktop, stacked on mobile):
LEFT COLUMN:
- Small pill badge: "🚀 #1 Learning Platform 2026" (var(--primary-light) background).
- H1: "Learn Without Limits. Grow Without Boundaries."
- Subtitle paragraph (2 lines about online learning).
- Two CTA buttons:
  a) "Start Free Today" — filled, var(--primary) background, large.
  b) "Watch Demo" — outlined, var(--primary) border, large, with bi-play-circle icon.
- Stats row (4 items inline): 50K+ Students · 500+ Courses · 200+ Instructors · 4.9★ Rating.
  Each stat has a bold number and small muted label.

RIGHT COLUMN:
- A styled div (CSS box-shadow, rounded, var(--primary-light) background) acting as hero image placeholder.
- Text inside: "Platform Preview" centered.
- 3 floating badge cards (CSS position absolute) overlapping the box:
  a) Top-left: bi-check-circle icon + "Certificate Included" (white card, shadow).
  b) Bottom-right: bi-people icon + "50K+ Students" (white card, shadow).
  c) Top-right: bi-star-fill icon + "4.9 Rating" (white card, shadow).
- Floating badges have CSS animation: subtle up-down float (keyframes).

Background: subtle var(--primary-gradient) at 5% opacity as overlay on white.

Output HTML + embedded <style> block only.
```

---

#### STEP 2.2 — Homepage: Trusted By Section

**Prompt to send:**

```
Build ONLY the "Trusted By" logos section for an LMS homepage.
Output a standalone HTML snippet with embedded <style> block.

Rules: Bootstrap 5.3 only. No JavaScript needed. CSS variables for colors.

Include:
1. Small centered heading: "Trusted by 500+ organizations worldwide".
2. A horizontal scrolling marquee row of 8 company name placeholders.
   Use styled <span> boxes with muted text as logo placeholders.
   Example names: "TechCorp", "EduGroup", "LearnCo", "GlobalEd",
                  "SkillsHub", "ProLearn", "InnovateCo", "EduWorld".
3. Logos are grayscale (CSS filter: grayscale(100%)) and become full color on hover.
4. Use CSS @keyframes marquee animation for infinite horizontal scroll.
5. Section has light background: var(--surface-alt). Padding top/bottom: 40px.

Output HTML + embedded <style> block only.
```

---

#### STEP 2.3 — Homepage: Features Section

**Prompt to send:**

```
Build ONLY the Features Section for an LMS homepage.
Output a standalone HTML snippet with embedded <style> block.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables for colors.

Include:
1. Section heading: "Everything You Need to Learn" + subtitle.
2. Three tab buttons (Alpine.js active tab switching):
   Tab 1: "For Students" | Tab 2: "For Instructors" | Tab 3: "For Organizations".
   Active tab button has var(--primary) background.
3. Each tab shows a 3-column grid (1 col mobile, 2 col tablet, 3 col desktop) of feature cards.
   Each feature card has:
   - Large Bootstrap Icon in a circle (var(--primary-light) background).
   - Feature title (bold).
   - Short description (2 lines).
   - "Learn more →" link in var(--primary) color.

For Students (9 features):
   bi-play-circle "Interactive Video Lessons",
   bi-camera-video "Live Virtual Classes",
   bi-patch-question "Quizzes & Assessments",
   bi-bar-chart-line "Progress Tracking",
   bi-award "Certificates & Badges",
   bi-phone "Mobile Learning",
   bi-chat-dots "Discussion Forums",
   bi-cloud-download "Offline Downloads",
   bi-cpu "AI Recommendations".

Tab switch uses x-show with x-transition:enter/leave fade.
Cards have hover lift: transform translateY(-4px) + var(--card-shadow-hover).

Output HTML + embedded <style> block only.
```

---

#### STEP 2.4 — Homepage: How It Works Section

**Prompt to send:**

```
Build ONLY the "How It Works" section for an LMS homepage.
Output a standalone HTML snippet with embedded <style> block.

Rules: Bootstrap 5.3 + Bootstrap Icons. CSS variables. No JavaScript needed.

Include:
1. Centered section heading: "Get Started in 3 Simple Steps" + subtitle.
2. Three steps in a horizontal row (stacked on mobile):
   Step 1: Number circle "01" (var(--primary) bg) + bi-person-plus icon +
           Title: "Create Your Account" + Description.
   Step 2: Number circle "02" + bi-journal-bookmark icon +
           Title: "Browse & Enroll" + Description.
   Step 3: Number circle "03" + bi-award icon +
           Title: "Learn & Get Certified" + Description.
3. A dashed connector line between steps (desktop only, CSS — hide on mobile).
4. Centered CTA button below: "Create Free Account" (var(--primary) filled).
5. Background: white. Light decorative dots pattern using CSS radial-gradient.

Output HTML + embedded <style> block only.
```

---

#### STEP 2.5 — Homepage: Course Showcase Section

**Prompt to send:**

```
Build ONLY the Course Showcase section for an LMS homepage.
Output a standalone HTML snippet with embedded <style> block.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Section heading: "Explore Our Top Courses" + subtitle.
2. Filter pill buttons (Alpine.js active filter):
   All | Development | Design | Business | Marketing | Data Science.
   Active pill: var(--primary) filled. Inactive: outlined.
3. 6 course cards in a grid (1 col mobile, 2 col tablet, 3 col desktop).
   Each course card contains:
   - Thumbnail: https://placehold.co/400x225/0d6efd/ffffff?text=CourseName
   - Top-left category badge (Bootstrap badge, var(--primary)).
   - Title (bold, 2 lines max with text overflow ellipsis).
   - Instructor avatar (https://placehold.co/30x30) + instructor name (small).
   - Star rating row: 5 bi-star-fill icons in warning color + "(4.8)" text.
   - Bottom row: student count (bi-people icon) + duration (bi-clock icon) + price.
   - "Enroll Now" button (full width, var(--primary), outlined).
   Card has hover lift animation.

6 Sample courses:
   "Advanced JavaScript" / Sarah Mitchell / Development / $49
   "UX Design Fundamentals" / James Lee / Design / Free
   "Data Science with Python" / Priya Sharma / Data Science / $79
   "Digital Marketing 101" / David Clark / Marketing / $29
   "Cloud Computing Basics" / Sarah Mitchell / Development / $59
   "Graphic Design Essentials" / James Lee / Design / Free

4. "View All Courses →" button centered below grid.

Output HTML + embedded <style> block only.
```

---

#### STEP 2.6 — Homepage: Statistics Counter Section

**Prompt to send:**

```
Build ONLY the Statistics / Impact section for an LMS homepage.
Output a standalone HTML snippet with embedded <style> block.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Full-width band with background: var(--primary-gradient).
   Text color: white. Padding: 60px 0.
2. 4 stat items in a row (2x2 on mobile, 4 on desktop):
   Each item has:
   - Large Bootstrap Icon (white, bi-people / bi-journal-bookmark / bi-patch-check / bi-star).
   - Animated counter number (Alpine.js):
     Use IntersectionObserver to trigger when section enters viewport.
     Count from 0 to target over 2 seconds using setInterval.
   - Bold large number: 50,000+ / 500+ / 95% / 200+
   - Small label below: "Students Enrolled" / "Expert Courses" /
     "Completion Rate" / "Certified Instructors"
3. Divider lines between items (desktop only, CSS border-right).

Output HTML + embedded <style> block only.
```

---

#### STEP 2.7 — Homepage: Testimonials Section

**Prompt to send:**

```
Build ONLY the Testimonials section for an LMS homepage.
Output a standalone HTML snippet with embedded <style> block.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Centered section heading: "What Our Students Say" + subtitle.
2. Auto-playing testimonial slider (Alpine.js):
   - Shows 1 testimonial at a time on mobile, 3 on desktop.
   - Auto-advances every 5 seconds (Alpine.js setInterval).
   - Prev / Next arrow buttons.
   - Dot indicator row below (click to go to slide).
3. Each testimonial card:
   - Large quote icon (bi-quote, var(--primary) color, large).
   - Quote text (italic, 3–4 lines).
   - Bottom: avatar (https://placehold.co/50x50/000000/ffffff?text=S1),
     name (bold), course name (muted), 5 star rating.
   - White card, var(--card-shadow), rounded-lg.

5 sample testimonials with varied names and courses.
Section background: var(--surface-alt).

Output HTML + embedded <style> block only.
```

---

#### STEP 2.8 — Homepage: Instructor Spotlight + Mobile App + Newsletter Sections

**Prompt to send:**

```
Build THREE small sections for an LMS homepage in one output.
Each section is clearly commented. Output combined HTML + embedded <style> block.

Rules: Bootstrap 5.3 + Bootstrap Icons. CSS variables. Alpine.js only where needed.

SECTION A — Instructor Spotlight:
- Heading: "Meet Our Expert Instructors".
- 4 instructor cards in a row (horizontal scroll on mobile):
  Each card: avatar (placehold.co 80x80), name, specialty,
  course count, student count, star rating, "View Courses" button.
  Instructors: Sarah Mitchell (Dev), James Lee (Design),
               Priya Sharma (Data Science), David Clark (Marketing).
- Below cards: "Become an Instructor" CTA banner
  (var(--primary-gradient) background, white text, button).

SECTION B — Mobile App:
- Split layout: left text + right phone mockup (styled CSS box).
- Heading: "Learn Anywhere, Anytime".
- 3 feature bullets with icons: Offline Mode, Push Notifications, Progress Sync.
- Two download badges (styled buttons): "App Store" (bi-apple) + "Google Play" (bi-google).

SECTION C — Newsletter:
- Full-width band. Background: var(--accent) = black. Text: white.
- Heading: "Start Learning Today. It's Free."
- Email input + "Subscribe" button inline (Alpine.js: validates email format, shows success message).
- Small note: "No spam. Unsubscribe anytime. 🔒 Privacy protected."

Output HTML + embedded <style> block only.
```

---

#### STEP 2.9 — Homepage: Assemble Full Page

**Prompt to send:**

```
Assemble a complete index.html file for an LMS homepage.
Do NOT rewrite any section content — just combine the sections I provide.

Use this exact HTML shell:

<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduLearn LMS — Learn Without Limits</title>
  [INSERT ALL CDN LINKS]
  <link rel="stylesheet" href="assets/css/theme.css">
  <script src="assets/js/app.js" defer></script>
</head>
<body x-data="themeToggle()" :data-theme="dark ? 'dark' : 'light'">

  <!-- Toast Container (top-right fixed) -->
  [INSERT toast container using toastManager component]

  <!-- Confirm Modal -->
  [INSERT confirmModal component]

  <!-- Global Search Overlay -->
  [INSERT globalSearch overlay]

  <!-- PUBLIC NAVBAR -->
  [PASTE: components/public-navbar.html content]

  <!-- HERO SECTION -->       [PASTE Step 2.1 output]
  <!-- TRUSTED BY -->         [PASTE Step 2.2 output]
  <!-- FEATURES -->           [PASTE Step 2.3 output]
  <!-- HOW IT WORKS -->       [PASTE Step 2.4 output]
  <!-- COURSE SHOWCASE -->    [PASTE Step 2.5 output]
  <!-- STATISTICS -->         [PASTE Step 2.6 output]
  <!-- TESTIMONIALS -->       [PASTE Step 2.7 output]
  <!-- INSTRUCTORS + APP + NEWSLETTER --> [PASTE Step 2.8 output]

  <!-- PUBLIC FOOTER -->
  [PASTE: components/public-footer.html content]

  <!-- Back to Top Button (Alpine.js scroll detection) -->
  [BUILD: small fixed bottom-right button, bi-arrow-up, appears after 300px scroll]

</body>
</html>

Output the complete, browser-ready index.html file.
```

---

### PAGE: courses.html (Public Course Catalog)

---

#### STEP 2.10 — Course Catalog: Filter Sidebar + Course Grid

**Prompt to send:**

```
Build the full courses.html page for a public LMS course catalog.
Include the shared navbar (copy from components/public-navbar.html)
and footer (components/public-footer.html) as inline HTML.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Page layout: sidebar (left, 280px) + main content (right), stacked on mobile.

FILTER SIDEBAR (left):
- "Filters" heading + "Clear All" link (Alpine.js resets all filters).
- Search input: live filter (Alpine.js x-model).
- Category checkboxes: Development, Design, Business, Marketing, Data Science, Photography.
- Level radio buttons: All Levels, Beginner, Intermediate, Advanced.
- Price radio buttons: All, Free, Paid, Under $20, $20–$50, $50+.
- Duration checkboxes: Under 2hrs, 2–5hrs, 5–10hrs, 10hrs+.
- Rating filter: Show only 4★+ / 3★+ / All.
- "Apply Filters" button (var(--primary) filled, full width).

MAIN CONTENT AREA (right):
- Top sort bar: "Showing 12 courses" + Sort dropdown (Most Popular, Newest, Price ↑, Rating).
  + Grid/List view toggle buttons (bi-grid / bi-list-ul, Alpine.js).
- 12 course cards (same design as homepage Step 2.5 cards).
- Bootstrap pagination below (5 pages, page 1 active).
- Empty state div (Alpine.js x-show when filter returns 0 results):
  bi-search icon + "No courses found" + "Reset Filters" button.

Output complete browser-ready courses.html file.
```

---

### PAGE: course-detail.html

---

#### STEP 2.11 — Course Detail Page

**Prompt to send:**

```
Build the full course-detail.html page for a single LMS course.
Include inline navbar and footer from prior steps.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.
Course: "Advanced JavaScript" by Sarah Mitchell.

Include:
1. Breadcrumb: Home > Courses > Development > Advanced JavaScript.
2. Hero banner (dark gradient background, white text):
   - H1 course title, subtitle, star rating + count, student count,
     last updated date, language badge, level badge.
   - Instructor small info line.

3. TWO-COLUMN LAYOUT (col-lg-8 + col-lg-4):

LEFT COLUMN:
- "What You'll Learn" — 2-column checklist grid (10 items, bi-check-circle icons).
- "Requirements" — bullet list (4 items).
- "Course Description" — 3 paragraphs + "Show more" toggle (Alpine.js).
- Curriculum Accordion (Bootstrap accordion):
  5 sections, each with 3–4 lessons.
  Each lesson row: bi-play-circle or bi-file-text icon, title, duration.
  Section header shows lesson count + total time.
  "Expand All / Collapse All" toggle button (Alpine.js).
- Instructor Bio card: avatar, name, rating, students, bio paragraph.
- Reviews: overall 4.8 rating + 5-bar breakdown (CSS width %) + 3 review cards.

RIGHT STICKY COLUMN (sticky-top):
- Thumbnail placeholder (placehold.co 400x225) with bi-play-circle overlay.
- Price: $49 (strikethrough $99) + "50% OFF" badge.
- Sale countdown timer (Alpine.js: counts down from 24 hours, updates every second).
- "Enroll Now" button (full width, var(--primary), large).
- "Try Free Preview" button (full width, outlined).
- Course includes checklist:
  bi-camera-video 12 hours video, bi-file-text 8 articles,
  bi-download 15 downloadable resources, bi-phone Mobile access,
  bi-award Certificate of completion.
- 30-day guarantee badge (bi-shield-check icon).

Output complete browser-ready course-detail.html file.
```

---

### PAGES: pricing.html, about.html, blog.html, contact.html, faq.html

---

#### STEP 2.12 — Pricing Page

**Prompt to send:**

```
Build the full pricing.html page for an LMS.
Include inline navbar and footer.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Page hero: "Simple, Transparent Pricing" heading + subtitle.
2. Monthly/Yearly billing toggle (Alpine.js):
   Toggle switch button — yearly shows 20% discount badge.
3. 3 pricing cards in a row (1 col mobile, 3 col desktop):

   FREE ($0/month):
   - 5 free courses, community support, basic progress tracking.
   - Features list (5 items with bi-check / bi-x icons).
   - CTA: "Get Started Free".

   PRO ($19/mo or $15/mo yearly) — "Most Popular" badge (animated pulse):
   - Highlighted with var(--primary) border + box-shadow.
   - Unlimited courses, certificates, live sessions, offline access,
     priority email support, advanced analytics.
   - CTA: "Start Pro Trial".

   ENTERPRISE (Custom pricing):
   - Everything in Pro + dedicated manager, custom branding,
     API access, SSO, bulk enrollment, SLA guarantee.
   - CTA: "Contact Sales".

4. Full feature comparison table (collapsible on mobile with Alpine.js toggle).
   Rows: 15 features. Columns: Free / Pro / Enterprise.
   Use bi-check-circle (success) and bi-x-circle (danger) icons.

5. FAQ accordion (5 pricing-specific questions, Bootstrap collapse).
6. Bottom CTA banner: "Not sure? Start free, upgrade anytime." + buttons.

Output complete browser-ready pricing.html file.
```

---

#### STEP 2.13 — About, Blog, Contact, FAQ Pages (one at a time)

**Prompt to send for about.html:**

```
Build the full about.html page for an LMS website.
Include inline navbar and footer.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include these sections (each in its own <section> tag with comment):
1. Hero: full-width banner, heading "Our Mission", subtitle, 2 CTA buttons.
2. Our Story: 2-column layout — text (left) + vertical timeline (right).
   Timeline: 4 milestones (2018 Founded, 2020 First 1K students,
   2023 Reached 10K, 2026 50K+ students).
3. Mission / Vision / Values: 3 icon cards in a row.
4. Team section: 8 member cards (placehold.co avatars, name, role,
   LinkedIn/Twitter icons).
5. Stats band (same as homepage counters).
6. Partners logos row (same as trusted by section style).
7. Careers CTA banner.

Output complete browser-ready about.html file.
```

**Prompt to send for contact.html:**

```
Build the full contact.html page for an LMS website.
Include inline navbar and footer.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Page hero: "Get In Touch" heading.
2. Two-column layout (col-lg-7 form + col-lg-5 info):

LEFT — Contact form:
   Fields: Full Name, Email, Phone (optional), Subject (dropdown with 5 options),
           Message (textarea, 5 rows), File attachment (styled file input).
   Alpine.js: validates name (required), email (format), message (min 20 chars).
   Shows inline error messages below invalid fields.
   Submit button shows spinner while "submitting" (Alpine.js 2 second delay),
   then shows green success toast.

RIGHT — Info cards:
   4 cards: Address (bi-geo-alt), Phone (bi-telephone),
            Email (bi-envelope), Hours (bi-clock).
   Social links row below cards.
   Map placeholder: styled div (300px height, var(--surface-alt) bg,
   "Map Placeholder" centered text, bi-map icon).

Output complete browser-ready contact.html file.
```

**Prompt to send for faq.html:**

```
Build the full faq.html page for an LMS website.
Include inline navbar and footer.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Hero with live search input (Alpine.js filters all FAQ items in real time).
2. Category tab buttons (Alpine.js): General | Courses | Payments | Technical | Certificates.
3. Per tab: Bootstrap accordion with 6 FAQs each.
   Each FAQ: question as accordion header, detailed answer as body.
4. "Still have questions?" CTA section with contact button.

Output complete browser-ready faq.html file.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PHASE 3 — AUTH PAGES

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### STEP 3.1 — Login Page

**Prompt to send:**

```
Build the full login.html page for an LMS.
Do NOT include the main navbar/footer. Use a minimal full-page auth layout.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Layout: Full viewport height. Split screen:
LEFT HALF (desktop only): var(--primary-gradient) background.
   - Large logo + tagline.
   - 3 feature bullets with icons (why join EduLearn).
   - Decorative geometric shapes (pure CSS circles).

RIGHT HALF (full width on mobile):
   - "Welcome Back" heading + subtitle.
   - Google OAuth button (bi-google icon, outlined).
   - Microsoft OAuth button (bi-microsoft icon, outlined).
   - Divider: "or sign in with email".
   - Email input (with bi-envelope icon inside).
   - Password input (bi-lock icon inside + bi-eye toggle for show/hide, Alpine.js).
   - "Remember Me" checkbox (left) + "Forgot Password?" link (right).
   - "Sign In" button (full width, var(--primary), shows spinner on click).
   - "Don't have an account? Register →" link.

Alpine.js validation: email format + password required. Shows error messages.

Output complete browser-ready login.html file.
```

---

### STEP 3.2 — Registration Page (Multi-Step)

**Prompt to send:**

```
Build the full register.html page for an LMS with a multi-step form.
Use the same split layout as login.html (reuse the left panel design).

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

STEP CONTROLLER (Alpine.js): currentStep (1–4), canProceed() validation.

TOP PROGRESS BAR: 4 steps with icons + labels. Completed steps filled in var(--primary).
Step 1: Personal Info (bi-person), Step 2: Account Setup (bi-lock),
Step 3: Preferences (bi-heart), Step 4: Done (bi-check-circle).

STEP 1 — Personal Info:
Fields: First Name, Last Name, Email, Phone number.
"Next →" button (Alpine.js validates all fields before proceeding).

STEP 2 — Account Setup:
Fields: Username, Password, Confirm Password.
Password strength meter (Alpine.js: checks length, uppercase, number, symbol).
Displays: Weak / Fair / Strong / Very Strong with colored bar.

STEP 3 — Preferences:
Interest checkboxes (6 options in 2-col grid): Development, Design, Business,
   Marketing, Data Science, Photography.
Learning goal radio: Personal Growth, Career Change, Skill Upgrade, Academic.
"How did you hear?" dropdown.
Terms & Privacy policy checkbox (required to proceed).

STEP 4 — Success:
Animated checkmark (CSS animation: scale + fade in).
"Welcome, [First Name]! Your account is ready." heading.
"Go to Dashboard" button + "Explore Courses" button.

Output complete browser-ready register.html file.
```

---

### STEP 3.3 — Forgot Password + Reset Password + Verify Email

**Prompt to send:**

```
Build THREE small auth pages. Each is a separate file.
All use the same full-page centered card layout (no split screen, simpler design).
Background: var(--surface-alt). Centered card (max-width 460px), white, shadow, rounded.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

FILE 1: forgot-password.html
- Logo at top.
- Heading: "Forgot Your Password?" + subtitle.
- Email input + "Send Reset Link" button.
- Alpine.js: on submit, shows 2s loading, then success state:
  bi-envelope-check icon (large, var(--primary)),
  "Check your email!" message, "Resend Email" link.
- "← Back to Login" link.

FILE 2: reset-password.html
- Logo at top.
- Heading: "Set New Password".
- New password input + show/hide toggle.
- Confirm password input + show/hide toggle.
- Password strength meter (same as register.html).
- "Update Password" button.
- On success (Alpine.js): green success card → "Password updated! Redirecting..."
  (3 second countdown then conceptually redirects — no actual redirect needed).

FILE 3: verify-email.html
- Logo at top.
- Two states (Alpine.js):
  State A (pending): bi-envelope (large animated bounce),
    "Verify Your Email" heading, subtitle,
    "Resend Email" button with 60-second cooldown timer (Alpine.js setInterval).
  State B (verified): bi-check-circle (large, green, scale-in animation),
    "Email Verified!" heading, "Go to Dashboard" button.
- Toggle button below to switch between states (for demo purposes).

Output three complete browser-ready HTML files.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PHASE 4 — STUDENT PANEL PAGES

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> All student pages use the same shell. Build it once, reuse it.

### STEP 4.0 — Student Shell Template

**Prompt to send:**

```
Build a reusable student panel shell file: student/_shell.html
This is the base template all student pages will copy and fill in.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.
Use x-data="sidebarState()" and x-data="themeToggle()" from app.js.

Shell structure:
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  [CDN links]
  <link rel="stylesheet" href="../assets/css/theme.css">
  <link rel="stylesheet" href="../assets/css/student.css">
  <script src="../assets/js/app.js" defer></script>
</head>
<body x-data="{ ...sidebarState(), ...themeToggle() }" :data-theme="dark ? 'dark' : 'light'">

  <!-- Toast Container -->
  <!-- Confirm Modal -->
  <!-- Global Search Overlay -->

  <div class="d-flex" style="min-height:100vh">
    <!-- SIDEBAR (paste components/student-sidebar.html) -->

    <!-- MAIN WRAPPER -->
    <div class="flex-grow-1 d-flex flex-column"
         :style="'margin-left:' + (collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)')">

      <!-- TOP NAVBAR (paste components/student-navbar.html) -->

      <!-- PAGE CONTENT -->
      <main class="flex-grow-1 p-4" style="background:var(--surface-alt); margin-top:var(--navbar-height)">
        <!-- PAGE CONTENT GOES HERE -->
      </main>

      <!-- FOOTER -->
      <footer style="background:var(--surface); border-top:1px solid var(--border-color); padding:16px 24px;">
        <small class="text-muted">© 2026 EduLearn LMS. All rights reserved.</small>
      </footer>
    </div>
  </div>

</body>
</html>

Output complete student/_shell.html file.
```

---

### STEP 4.1 — Student Dashboard (section by section)

**Prompt to send for Stats Cards:**

```
Build ONLY the Stats Cards row for the student dashboard page.
This is the FIRST section of student/dashboard.html main content.
Output a standalone HTML snippet (no full page, no sidebar, no navbar).

Rules: Bootstrap 5.3 + Bootstrap Icons. CSS variables.

4 stat cards in a row (col-6 on mobile, col-3 on desktop):
Each card: icon circle (var(--primary-light) bg), label, large bold number,
trend badge (▲ +5% this month — green, or ▼ -2% — red).

Cards:
1. bi-journal-bookmark (blue)  "Enrolled Courses"  → 6
2. bi-patch-check (green)      "Completed"         → 2
3. bi-pencil-square (orange)   "Pending Assignments" → 4
4. bi-bar-chart-line (purple)  "Overall GPA"       → 3.7

Cards have var(--card-shadow), rounded, white bg, hover lift animation.

Output HTML + <style> block only.
```

**Prompt to send for Continue Learning:**

```
Build ONLY the "Continue Learning" card for the student dashboard.
This is the SECOND section of student/dashboard.html.
Output standalone HTML snippet + embedded <style> block.

Rules: Bootstrap 5.3 + Bootstrap Icons + Alpine.js. CSS variables.

Large card with heading "Continue Learning" + "View All →" link.
Inside: 3 course progress items stacked vertically.
Each item:
- Course thumbnail (placehold.co 80x80).
- Course title (bold) + instructor name (muted).
- Bootstrap progress bar (animated, var(--primary) fill) + "X% complete" label.
- "Continue" button (var(--primary), small, right side).
- Last accessed: "2 hours ago" (muted, bi-clock icon).

Courses:
1. Advanced JavaScript — 87% — Sarah Mitchell
2. UX Design Fundamentals — 45% — James Lee
3. Data Science with Python — 12% — Priya Sharma
```

**Prompt to send for Upcoming Deadlines + Activity Chart:**

```
Build TWO sections for the student dashboard. Output combined HTML + <style> block.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

SECTION A — Upcoming Deadlines (card, col-lg-6):
List of 5 deadline items. Each item:
- bi-calendar-event icon, assignment title, course name (muted),
  due date, priority badge (High=danger, Medium=warning, Low=success).
- Overdue items: red text on date.

SECTION B — Weekly Activity Chart (card, col-lg-6):
Pure CSS bar chart (NO external chart libraries).
7 bars for Mon–Sun. Each bar:
- A div with height proportional to activity value (use inline style).
- Bar color: var(--primary). Background: var(--primary-light).
- Value label above bar, day label below.
- Alpine.js data: [45, 80, 30, 95, 60, 20, 70] (activity minutes per day).
Animate bars on load (CSS transition: height 0.8s ease).
```

**Prompt to send for Announcements + Quick Links + Live Sessions:**

```
Build THREE final dashboard widget sections. Output combined HTML + <style> block.

Rules: Bootstrap 5.3 + Bootstrap Icons. CSS variables.

SECTION A — Recent Announcements (card):
3 announcement items. Each: bi-megaphone icon (var(--primary)),
title, 1-line excerpt, date + course badge.
"View All Announcements →" link at bottom.

SECTION B — Quick Links (card):
2x4 icon grid of quick action buttons:
bi-camera-video "Join Live Class", bi-folder2-open "Library",
bi-chat-dots "Forum", bi-bar-chart-line "Grades",
bi-calendar3 "Schedule", bi-award "Certificates",
bi-patch-question "Quizzes", bi-gear "Settings".
Each: rounded square (var(--primary-light) bg), icon + label below.
Hover: var(--primary) bg + white text.

SECTION C — Upcoming Live Sessions (card):
Table with 3 upcoming sessions:
Columns: Session Name, Instructor, Date & Time, Duration, Action.
"Join" button (var(--primary), small) for today's sessions.
"Reminder" button (outlined) for future sessions.
"LIVE" badge with pulsing red dot CSS animation for any active session.
```

---

### STEP 4.2 — My Courses Page

**Prompt to send:**

```
Build the full student/my-courses.html page.
Use the student shell layout (sidebar + navbar + footer inline).

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Page header: "My Courses" title + breadcrumb.
2. Tab navigation (Alpine.js): All (6) | In Progress (3) | Completed (2) | Bookmarked (1) | Archived (0).
3. Filter/sort bar:
   - Search input (Alpine.js live filter on course title).
   - Category dropdown filter.
   - Sort by dropdown (Recent, Name A-Z, Progress %).
   - View toggle: Grid (bi-grid) / List (bi-list-ul) — Alpine.js.
4. Grid view: 3 cards per row (same course card design as public catalog
   but with progress bar and "Continue" button instead of "Enroll").
   Additional card elements: enrolled date, hours remaining, bookmark
   toggle (bi-bookmark / bi-bookmark-fill, Alpine.js toggle + warning color).
   If completed: show "View Certificate" button (success color) instead of Continue.
5. List view: each course as a horizontal row
   (thumbnail 100px + details + progress bar + actions all inline).
6. Course Detail Modal (Bootstrap modal, Alpine.js trigger):
   Tabs inside modal: Overview | Curriculum | Reviews | Resources.
   Curriculum: accordion showing 5 modules with lesson items.
7. Empty state (if filtered to 0): large icon + "No courses found" + Reset button.

Use 6 sample courses from plan data.
Output complete browser-ready student/my-courses.html file.
```

---

### STEP 4.3 — Assignments Page

**Prompt to send:**

```
Build the full student/assignments.html page.
Use the student shell layout.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Stats summary bar (5 pills): Total (10) | Pending (4) | Submitted (3) | Graded (2) | Overdue (1).
2. Filter bar: Course dropdown, Due date range, Status dropdown.
3. Tab navigation (Alpine.js): All | Pending | Submitted | Graded | Overdue.
4. Assignment cards (list style, stacked):
   Each card:
   - Left colored bar (pending=warning, submitted=info, graded=success, overdue=danger).
   - Assignment title (bold), course name (badge), assigned date.
   - Due date with countdown (Alpine.js — shows "X days left" or "Overdue by X days").
   - Description excerpt (2 lines, truncated).
   - Points: "__ / __ pts".
   - Status badge + action button:
     Pending → "Submit Assignment" (primary)
     Submitted → "View Submission" (info, outlined)
     Graded → "View Feedback" (success, outlined)
     Overdue → "Submit Late" (danger, outlined)

5. Submission Modal (Bootstrap modal, Alpine.js):
   - Assignment title + description (full).
   - Attached files list (2 sample files with bi-file-earmark icon).
   - Answer textarea (required, min 50 chars).
   - Drag-and-drop file upload zone (Alpine.js fileUpload component, visual only).
   - Submit button + cancel.

6. Graded view in modal: score display (e.g., "85 / 100"),
   letter grade (B+), instructor feedback text, rubric table.

Include 5 sample assignments across different states.
Output complete browser-ready student/assignments.html file.
```

---

### STEP 4.4 — Quizzes Page + Quiz Taking Screen

**Prompt to send for quizzes.html:**

```
Build the full student/quizzes.html page.
Use the student shell layout.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Three sections (accordion-style grouping):
   A) Upcoming Quizzes (2 items)
   B) Available Now (1 item — highlighted)
   C) Completed (3 items)

2. Quiz card design:
   - Quiz title, course badge, date/time, duration (bi-clock),
     question count, total marks, status badge.
   - Countdown timer for upcoming quizzes (Alpine.js setInterval, shows HH:MM:SS).
   - Action button: "Start Quiz" (primary) / "View Results" (success, outlined) /
     "Retake" (warning, outlined, if allowed).

3. Results summary card for completed quizzes:
   - Score: 78/100 · Grade: B+ · Time taken: 24 min · Pass/Fail badge.
   - "Review Answers" button.

Output complete browser-ready student/quizzes.html file.
```

**Prompt to send for quiz-taking.html:**

```
Build the full student/quiz-taking.html page.
Do NOT use the standard student sidebar layout.
This page uses a special full-screen quiz layout.

Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

LAYOUT:
- Fixed top bar (no sidebar): Quiz title "Advanced JavaScript Quiz" +
  bi-clock icon + countdown timer (Alpine.js: 30:00 counting down) +
  Question progress "Question 3 of 10" + "Submit Quiz" button (danger).

- Main area: 2 columns — question panel (col-lg-8) + navigation panel (col-lg-4).

QUESTION PANEL (left):
- Question number badge + question text (sample JS question).
- 4 multiple choice options as styled radio cards (Bootstrap card click to select).
  Selected option: var(--primary) border + light background (Alpine.js selectedAnswer).
- "Flag for Review" toggle button (bi-flag, Alpine.js flagged state).
- Previous / Next buttons (bottom of panel).

NAVIGATION PANEL (right, sticky):
- Heading "Question Navigator".
- 10 numbered buttons in a grid (3×4):
  White = unanswered, var(--primary) = answered, warning = flagged, current = outlined.
- Legend below grid explaining colors.
- Stats: Answered (3), Unanswered (6), Flagged (1).

SUBMIT CONFIRMATION MODAL (Bootstrap modal, Alpine.js trigger):
- Summary table: Total (10), Answered (8), Unanswered (2), Flagged (1).
- Warning: "2 questions unanswered."
- "Submit Anyway" (danger) + "Go Back" (outlined) buttons.

Alpine.js data: 10 questions array with text, options, selectedAnswer, flagged properties.

Output complete browser-ready student/quiz-taking.html file.
```

---

### STEP 4.5 — Grades, Schedule, Library, Live Sessions

**Prompt for grades.html:**

```
Build full student/grades.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Sections:
1. Overall GPA hero card: large "3.7 / 4.0" display + letter grade "A-" +
   "Top 15% of class" badge + semester selector dropdown.
2. Grade breakdown progress bars (4 rows):
   Assignments 35% weight → 88% score,
   Quizzes 25% weight → 72% score,
   Exams 30% weight → 91% score,
   Participation 10% weight → 95% score.
3. Per-course grades table:
   Columns: Course | Assignments | Quizzes | Exams | Final | Grade | Status.
   Expandable rows (Alpine.js x-show) showing individual item grades.
   Color-coded grade cells (A=success, B=info, C=warning, D/F=danger).
4. Pure CSS grade trend chart (6 months, bar chart, same technique as dashboard).
5. "Download Transcript" button (primary, bi-download icon) — UI only.

Output complete browser-ready student/grades.html file.
```

**Prompt for schedule.html:**

```
Build full student/schedule.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. View toggle buttons (Alpine.js): Week View | Month View | List View.

WEEK VIEW:
- 7-column grid (Mon–Sun) with time rows (8AM–8PM, each 60px tall).
- 5 sample events as colored blocks overlaid on grid:
  Blue = Live Session, Orange = Assignment Due, Red = Exam, Green = Completed.
- Events show: title (truncated), time, on click shows popover (Bootstrap) with details.

MONTH VIEW:
- CSS calendar grid (7 cols × 6 rows).
- Alpine.js generates current month dates.
- Colored dots on dates that have events.
- Click on date highlights it and shows a side panel with that day's events.

LIST VIEW:
- Events grouped by date heading.
- Each event: color-coded left border, icon, title, course, time, action button.

"Add to Calendar" button per event (UI only, bi-calendar-plus icon).

Output complete browser-ready student/schedule.html file.
```

**Prompt for library.html:**

```
Build full student/library.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Search bar (Alpine.js live filter by title, course, tag).
2. Filter pills: All | PDF | Video | Audio | Slides | Links.
3. Folder/category accordion (left sidebar):
   5 course folders. Click to filter materials by course.
4. Material cards grid (3 col desktop, 1 col mobile):
   Each card:
   - File type icon (bi-file-pdf=red, bi-camera-video=blue,
     bi-headphones=green, bi-file-slides=orange).
   - Title, course badge, upload date, file size.
   - Tags (1–2 Bootstrap badges).
   - Bookmark toggle (Alpine.js).
   - "Download" + "Preview" buttons.
5. "Recently Viewed" horizontal scroll row (5 items).
6. "Bookmarked" section below main grid.
7. Empty state when filter returns no results.

Include 10 sample materials across different courses and types.
Output complete browser-ready student/library.html file.
```

**Prompt for live-sessions.html:**

```
Build full student/live-sessions.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Tabs (Alpine.js): Upcoming | Live Now | Past Recordings.

UPCOMING tab:
- 3 session cards. Each: banner (placehold.co 400x200), title, course,
  instructor, date/time, duration, attendees count.
- Countdown timer (Alpine.js setInterval, HH:MM:SS until start).
- "Add to Calendar" (outlined) + "Set Reminder" toggle buttons.

LIVE NOW tab (highlighted section with pulsing red border):
- "LIVE NOW" banner with pulsing dot (CSS animation: 1s infinite pulse).
- 1 active session card with "Join Now" button (danger color, large).

PAST RECORDINGS tab:
- 4 past sessions. Each: thumbnail with bi-play-circle overlay,
  title, date, duration, "Watch Recording" button (outlined, primary).

Output complete browser-ready student/live-sessions.html file.
```

---

### STEP 4.6 — Forum, Announcements

**Prompt for forum.html:**

```
Build full student/forum.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

LAYOUT: left category sidebar (240px) + main thread list.

LEFT SIDEBAR:
- "New Thread" button (var(--primary), full width, bi-plus icon).
- Course categories list: 6 course names as clickable items.
  Active course highlighted. Unread count badge per category.

MAIN AREA:
- Search bar + Sort by dropdown (Latest, Most Replied, Top Voted).
- Thread list (8 threads):
  Each thread row: author avatar, author name, thread title (bold),
  category badge, excerpt (1 line), reply count (bi-chat),
  view count (bi-eye), time ago, "Solved" badge (if resolved).
- Pagination (3 pages).

CLICK on thread title → navigate to forum-thread.html.
"New Thread" button → Bootstrap modal with:
  Title input, Category dropdown, Content textarea, Tags input, Submit button.

Output complete browser-ready student/forum.html file.
```

**Prompt for forum-thread.html:**

```
Build full student/forum-thread.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Breadcrumb: Dashboard > Forum > Course Name > Thread Title.
2. Original post card:
   - Author avatar, name, role badge (Student), posted date.
   - Full post content (3 paragraphs).
   - Tag badges row.
   - Action bar: bi-hand-thumbs-up Like (5) | bi-share Share | bi-flag Report
     | "Mark Resolved" button (if thread author).

3. Replies section (3 replies):
   Each reply: avatar, name, date, content, Like button.
   1 reply is highlighted as "Best Answer" (green border + badge).
   Nested reply (1 level deep) shown indented.

4. Reply form at bottom:
   - Simple textarea with placeholder.
   - Mini toolbar (UI only): Bold (B), Italic (I), Link, Code, Image icons.
   - "Post Reply" button + character count.

Output complete browser-ready student/forum-thread.html file.
```

**Prompt for announcements.html:**

```
Build full student/announcements.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Filter bar: Search input + dropdown (All, Unread, By Course, System).
2. "Mark All as Read" button (outlined, top right).
3. Announcement list (8 items):
   Each item is a card row:
   - Left colored dot (blue=course, gray=system) indicating type.
   - bi-megaphone icon.
   - Title (bold if unread, normal if read).
   - Source badge (course name or "System").
   - Date + time.
   - Unread items have light var(--primary-light) background tint.
   - Click to expand full announcement text inline (Alpine.js x-show + x-transition).
   - Expanded view shows full message + "Mark as Read" button.
4. Pagination (3 pages).

Output complete browser-ready student/announcements.html file.
```

---

### STEP 4.7 — Profile, Certificates, Settings, Help

**Prompt for profile.html:**

```
Build full student/profile.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

TWO-COLUMN layout (col-lg-4 left + col-lg-8 right):

LEFT CARD (Profile summary):
- Large avatar (placehold.co 120x120) with "Change Photo" overlay button.
  Alpine.js: file input triggers image preview (use FileReader API).
- Name: Alex Johnson, Email, Student ID: STU-2026-0042.
- "Enrolled since January 2025".
- Mini stats: 6 Enrolled | 2 Completed | 3.7 GPA.
- Social links: LinkedIn, GitHub (bi icons, outlined buttons).

RIGHT SECTION (Tab navigation — Alpine.js):
Tab 1 — Personal Info:
  Editable form: First Name, Last Name, Phone, Date of Birth,
  Bio textarea, Address. "Save Changes" button with success toast.

Tab 2 — Account Security:
  Change Password form (current + new + confirm).
  Two-factor authentication toggle switch (Alpine.js).
  Active sessions table (Device, Location, Last Active, "Revoke" button).

Tab 3 — Notification Preferences:
  Toggle switches (Alpine.js) organized in a table:
  Rows: New Assignment, Grade Released, Live Session Reminder,
        Forum Reply, Announcement, Certificate Earned.
  Columns: Email | SMS | Push.

Tab 4 — Learning Preferences:
  Language select, Timezone select, Date format radio,
  Autoplay videos toggle, Subtitle language select,
  Accessibility: high contrast toggle, font size radio (S/M/L).

Output complete browser-ready student/profile.html file.
```

**Prompt for certificates.html:**

```
Build full student/certificates.html. Use student shell layout.
Rules: Bootstrap 5.3 + Bootstrap Icons. CSS variables.

Include:
1. Summary bar: 2 certificates earned + shareable count.
2. Certificate cards grid (2 per row desktop, 1 mobile):
   Each card:
   - Certificate preview (styled div, var(--primary-gradient) bg,
     "Certificate of Completion" centered in elegant text, border with gold color).
   - Course name below, completion date, "Issued by EduLearn LMS".
   - Credential ID (small, monospace font, bi-shield-check icon).
   - Action buttons row: "Download PDF" (bi-download) | "Share LinkedIn" (bi-linkedin)
     | "Verify" (bi-patch-check).
3. Empty state section below (for future certificates not yet earned — greyed out cards with lock icon).

Certificates:
1. Digital Marketing 101 — Completed: Nov 15, 2025 — ID: EL-2025-1122-DM
2. Cloud Computing Basics — Completed: Dec 02, 2025 — ID: EL-2025-1202-CC

Output complete browser-ready student/certificates.html file.
```

**Prompt for settings.html:**

```
Build full student/settings.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

LAYOUT: left vertical nav (fixed) + right content panel (Alpine.js tab switching).

LEFT NAV sections (8 items with icons):
General, Appearance, Notifications, Privacy, Integrations,
Billing (Pro badge), Downloads, Danger Zone.

RIGHT PANELS (one per nav item, Alpine.js x-show):

General: Language select, Timezone, Date format, Default homepage radio.

Appearance:
  Theme: 5 color preset circles (click to apply — Alpine.js updates --primary CSS variable).
  Dark/Light toggle. Font size slider (12px–18px, Alpine.js updates font-size on body).
  Sidebar style: Full / Icon Only.

Notifications: Full table of toggles (same as profile tab 3 but more detailed).

Privacy: Profile visibility (Public/Private/Students Only) radio.
  Data sharing toggles. "Download My Data" button. Cookie preferences.

Integrations: 3 cards (Google Calendar, Zoom, Slack).
  Each: logo icon, description, "Connect" button (or "Disconnect" if connected, Alpine.js toggle).

Danger Zone: Red-bordered card.
  "Deactivate Account" button → confirm modal.
  "Delete Account" button → confirm modal with type-to-confirm input (Alpine.js).

Output complete browser-ready student/settings.html file.
```

**Prompt for help.html:**

```
Build full student/help.html. Use student shell layout.
Rules: Bootstrap 5.3 + Alpine.js 3.x + Bootstrap Icons. CSS variables.

Include:
1. Search bar (large, centered): live filters all FAQ content (Alpine.js).
2. Quick help cards row (4 cards):
   bi-book "Documentation", bi-camera-video "Video Tutorials",
   bi-chat-dots "Live Chat" (pulsing green dot), bi-envelope "Email Support".

3. FAQ section:
   Category tabs (Alpine.js): Getting Started | Courses | Payments | Technical | Account.
   6 accordion FAQs per tab (Bootstrap collapse + Alpine.js tab switching).

4. Contact Support form:
   Name (pre-filled from student data), Email (pre-filled),
   Category dropdown, Priority radio (Low/Medium/High/Urgent),
   Description textarea, File attachment.
   Alpine.js validation + submit with loading spinner + success toast.

5. Support ticket history table (3 sample tickets):
   Ticket ID, Subject, Category, Priority badge, Status badge, Created date, Action.

Output complete browser-ready student/help.html file.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PHASE 5 — POLISH & MICRO-INTERACTIONS

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### STEP 5.1 — Global CSS Animations (add to theme.css)

**Prompt to send:**

```
Add the following CSS animations and utility classes to assets/css/theme.css.
Output ONLY the CSS to append to the existing file.

Include:
1. @keyframes shimmer — loading skeleton animation (gradient sweep left to right).
2. @keyframes float — subtle up-down floating (for hero badges).
3. @keyframes pulse-dot — scale 1 → 1.3 → 1, for live now indicators.
4. @keyframes fadeInUp — opacity 0 + translateY(20px) → opacity 1 + translateY(0).
5. @keyframes countUp — for counter sections (used with Alpine.js).
6. @keyframes marquee — infinite left scroll for logo ticker.
7. .skeleton class — shimmer background animation for loading placeholders.
8. .card-hover — transition + transform translateY(-4px) on :hover.
9. .ripple — CSS ripple effect on click (pseudo-element).
10. .fade-in — fadeInUp animation, 0.5s ease, applied on .is-visible class.
    (Alpine.js IntersectionObserver will toggle .is-visible).
11. .btn-primary-custom — uses var(--primary) bg, hover uses var(--primary-dark).
12. Scrollbar styling (WebKit) — thin, var(--primary) thumb, var(--surface-alt) track.
```

---

### STEP 5.2 — Skeleton Loading Screens

**Prompt to send:**

```
Build skeleton loading screen snippets for 3 common components.
Output HTML + CSS only. These are shown while content loads (Alpine.js x-show toggle).

Rules: Use the .skeleton class from theme.css (shimmer animation).

SKELETON 1 — Course card skeleton (matches the course card design):
- Gray rectangle (thumbnail area).
- 3 gray bars (title, instructor, rating — different widths).
- Bottom bar (price + button placeholder).

SKELETON 2 — Dashboard stats card skeleton:
- Circle placeholder (icon).
- 2 gray bars (number + label).

SKELETON 3 — Table row skeleton:
- 5 cells, each a gray bar of varying width.
- 5 rows total.

Wrap each skeleton in a div.
Add Alpine.js demo: a button that toggles between skeleton and real content
to demonstrate the loading state switch.

Output HTML + embedded <style> block.
```

---

## 📋 MASTER FILE CHECKLIST

Track your progress below. Check off each file as completed.

### Foundation

- [ ] `assets/css/theme.css` (Step 0.1)
- [ ] `assets/js/app.js` (Step 0.2)

### Shared Components

- [ ] `components/public-navbar.html` (Step 1.1)
- [ ] `components/public-footer.html` (Step 1.2)
- [ ] `components/student-sidebar.html` (Step 1.3)
- [ ] `components/student-navbar.html` (Step 1.4)

### Landing Pages

- [ ] `index.html` (Steps 2.1–2.9)
- [ ] `courses.html` (Step 2.10)
- [ ] `course-detail.html` (Step 2.11)
- [ ] `pricing.html` (Step 2.12)
- [ ] `about.html` (Step 2.13)
- [ ] `contact.html` (Step 2.13)
- [ ] `faq.html` (Step 2.13)
- [ ] `blog.html` _(prompt: "Build blog.html using the same section-by-section approach as other pages. Include hero, featured post, category filter pills (Alpine.js), 8 article cards in a grid, and Bootstrap pagination.")_
- [ ] `blog-post.html` _(prompt: "Build blog-post.html with breadcrumb, article header, featured image, full article body with styled elements, sticky TOC sidebar with scroll-spy (Alpine.js), author bio card, 3 related posts, and a comment form.")_

### Auth Pages

- [ ] `login.html` (Step 3.1)
- [ ] `register.html` (Step 3.2)
- [ ] `forgot-password.html` (Step 3.3)
- [ ] `reset-password.html` (Step 3.3)
- [ ] `verify-email.html` (Step 3.3)

### Student Panel

- [ ] `student/_shell.html` (Step 4.0)
- [ ] `student/dashboard.html` (Step 4.1 — 4 sub-prompts)
- [ ] `student/my-courses.html` (Step 4.2)
- [ ] `student/assignments.html` (Step 4.3)
- [ ] `student/quizzes.html` (Step 4.4)
- [ ] `student/quiz-taking.html` (Step 4.4)
- [ ] `student/grades.html` (Step 4.5)
- [ ] `student/schedule.html` (Step 4.5)
- [ ] `student/library.html` (Step 4.5)
- [ ] `student/live-sessions.html` (Step 4.5)
- [ ] `student/forum.html` (Step 4.6)
- [ ] `student/forum-thread.html` (Step 4.6)
- [ ] `student/announcements.html` (Step 4.6)
- [ ] `student/profile.html` (Step 4.7)
- [ ] `student/certificates.html` (Step 4.7)
- [ ] `student/settings.html` (Step 4.7)
- [ ] `student/help.html` (Step 4.7)

### Polish

- [ ] Animations added to `theme.css` (Step 5.1)
- [ ] Skeleton screens (Step 5.2)

---

## 🚦 GOLDEN RULES FOR PROMPTING THE AI

| Rule                                                                    | Why                                          |
| ----------------------------------------------------------------------- | -------------------------------------------- |
| ✅ One section per prompt                                               | Prevents length limit errors                 |
| ✅ Always say "Output HTML + embedded style block only"                 | Keeps response short and focused             |
| ✅ Say "standalone snippet, not a full page" for components             | Stops AI from regenerating the shell         |
| ✅ Say "complete browser-ready file" for full pages                     | Ensures proper DOCTYPE + CDN links           |
| ✅ Reference CSS variables by name                                      | AI will use them instead of hardcoded colors |
| ✅ Paste prior component HTML in context when assembling                | Ensures consistency across sections          |
| ✅ If output cuts off, reply: "Continue exactly from where you stopped" | Resumes without restarting                   |
| ❌ Never ask for "the full LMS" in one prompt                           | Will always hit length limits                |
| ❌ Never skip the CDN block reminder                                    | AI may use wrong library versions            |

---

_Plan v2.0 — Section-by-Section Implementation Strategy_
_EduLearn LMS · HTML5 + Bootstrap 5.3 + Alpine.js 3.x_
_Created: 2026-03-27_
