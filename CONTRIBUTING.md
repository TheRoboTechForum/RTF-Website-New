# 🤝 Contributing to RTF Website

First off — **thank you for wanting to contribute!** Whether you're fixing a typo, adding a feature, or reporting a bug, every contribution helps RTF's website get better.

This guide will walk you through everything you need to know.

---

## � Join Our Community

**We'd love to have you in real-time communication with the team!**

[![Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?logo=discord&logoColor=white)](https://discord.gg/nFcxaYKc)

👉 **[Join the RTF Discord](https://discord.gg/nFcxaYKc)** — Get help, ask questions, discuss features, and connect with other contributors and maintainers.

---

## �📋 Table of Contents

- [Getting Started](#-getting-started)
- [How to Contribute](#-how-to-contribute)
- [Development Workflow](#-development-workflow)
- [Code Style Guide](#-code-style-guide)
- [Commit Convention](#-commit-convention)
- [Pull Request Process](#-pull-request-process)
- [Issue Template and Assignment Process](#-issue-template-and-assignment-process)
- [What We're Looking For](#-what-were-looking-for)
- [AI Policy](#-ai-policy)
- [Reporting Bugs](#-reporting-bugs)
- [Requesting Features](#-requesting-features)
- [Getting Help](#-getting-help)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Git**
- A code editor (we recommend [VS Code](https://code.visualstudio.com/) with the Tailwind CSS IntelliSense extension)

### Setup

```bash
# 1. Fork the repo on GitHub
# 2. Clone your fork
git clone https://github.com/<your-username>/RTF-Website-New.git
cd RTF-Website-New/rtf-website

# 3. Add upstream remote (to stay in sync with the main repo)
git remote add upstream https://github.com/TheRoboTechForum/RTF-Website-New.git

# 4. Install dependencies
npm install

# 5. Start dev server
npm run dev
```

### Verify Your Setup

After running `npm run dev`, open `http://localhost:5173` in your browser. You should see the RTF website with the video intro screen. If everything loads — you're good to go.

---

## 💡 How to Contribute

### Types of Contributions We Accept

| Type | Examples |
| ---- | ------- |
| 🐛 **Bug fixes** | Broken layouts, animation glitches, console errors |
| ✨ **Features** | New sections, components, pages, interactions |
| 🎨 **Design improvements** | Better responsiveness, visual polish, hover states |
| ♿ **Accessibility** | Keyboard navigation, screen reader support, contrast fixes |
| 📝 **Documentation** | README improvements, code comments, JSDoc |
| 🧹 **Code quality** | Refactoring, removing dead code, performance improvements |
| 🖼️ **Assets** | Real RTF photos to replace placeholder images |

### First-Time Contributors

New to open source? Look for issues labeled **[`good first issue`](https://github.com/TheRoboTechForum/RTF-Website-New/labels/good%20first%20issue)**. These are intentionally scoped to be beginner-friendly.

Some easy first contributions:

- Fix a responsive layout issue on mobile
- Add `alt` text to images that are missing it
- Improve a component's JSDoc comments
- Replace a placeholder image with a real RTF photo
- Add a missing hover state to an interactive element

---

## 🔄 Development Workflow

### 1. Sync Your Fork

Before starting any work, make sure your fork is up to date:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### 2. Create a Branch

Always create a new branch for your work. Never commit directly to `main`.

```bash
# Use a descriptive branch name
git checkout -b feat/terminal-contact-animation
git checkout -b fix/navbar-mobile-overflow
git checkout -b docs/update-readme
```

**Branch naming convention:**

| Prefix | Use for |
| ------ | ------- |
| `feat/` | New features or enhancements |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `style/` | UI/CSS changes (no logic change) |
| `refactor/` | Code restructuring (no behavior change) |
| `chore/` | Config, dependencies, tooling |

### 3. Make Your Changes

- Follow the [Code Style Guide](#-code-style-guide) below
- Test your changes at **375px** (mobile) and **1440px** (desktop) minimum
- Run `npm run lint` and fix any errors before committing
- Check the browser console — there should be **zero errors or warnings** from your code

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add parallax scroll to about section"
```

See [Commit Convention](#-commit-convention) for the full format.

### 5. Push and Open a PR

```bash
git push origin feat/your-feature-name
```

Then go to GitHub and open a Pull Request against `main` on the upstream repo.

---

## 🎨 Code Style Guide

### General Rules

- **No inline styles** — use Tailwind classes or CSS custom properties only
- **No `px` for font sizes on headings** — use the design system classes (`.text-display`, `.text-h1`, etc.) or `clamp()`
- **No unused imports** — ESLint will catch these
- **No `console.log`** in committed code (use it for debugging, remove before commit)
- **Use semantic HTML** — `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, not `<div>` soup

### React / JSX

```jsx
// ✅ Good — functional component with JSDoc
/**
 * ProjectCard — Displays a single project with hover effects.
 * @param {object} props
 * @param {object} props.project - Project data object
 * @param {function} props.onOpenModal - Callback when "Details" is clicked
 */
export default function ProjectCard({ project, onOpenModal }) {
  return (
    <article className="group relative bg-surface rounded-card border border-border">
      {/* ... */}
    </article>
  );
}

// ❌ Bad — anonymous export, no docs, div instead of semantic HTML
export default ({ project, onOpenModal }) => {
  return (
    <div class="...">
      {/* ... */}
    </div>
  );
}
```

### Tailwind CSS

```jsx
// ✅ Good — design system colors, responsive classes
<div className="bg-surface border border-border rounded-card p-6 md:p-8">
  <h2 className="text-h2 text-text-primary mb-4">Title</h2>
  <p className="text-body text-text-secondary">Description</p>
</div>

// ❌ Bad — hardcoded colors, fixed sizes, no responsive
<div className="bg-[#0D1520] border-[#1E2D42] rounded-[12px] p-8">
  <h2 className="text-[2.5rem] text-[#F1F5F9]">Title</h2>
</div>
```

**Rules:**
- Use Tailwind's design tokens from `tailwind.config.js` — don't hardcode hex values with arbitrary `[]` syntax
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Use the typography scale classes defined in `globals.css` (`.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-body`, `.text-mono`, `.text-label`)

### Framer Motion / Animations

```jsx
// ✅ Good — use shared animation variants from lib/animations.js
import { fadeUp, staggerContainer } from '../../lib/animations';

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  <motion.h2 variants={fadeUp}>Title</motion.h2>
</motion.div>

// ❌ Bad — inline animation objects duplicated across components
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
```

**Rules:**
- Reuse animation variants from `src/lib/animations.js` — don't duplicate inline
- Only animate `transform` and `opacity` (GPU-accelerated properties)
- Use `whileInView` with `viewport={{ once: true }}` for scroll animations
- Respect `prefers-reduced-motion` — the global CSS already handles this

### File Naming

| Type | Convention | Example |
| ---- | ---------- | ------- |
| Components | PascalCase | `ProjectCard.jsx` |
| Pages | PascalCase | `Projects.jsx` |
| Hooks | camelCase with `use` prefix | `useScrollAnimation.js` |
| Data files | camelCase | `projects.js` |
| Utilities | camelCase | `animations.js` |
| Styles | lowercase | `globals.css` |

### Component Structure

When creating a new component, follow this order:

```jsx
// 1. Imports (React, libraries, local components, hooks, data, assets)
import { useState } from 'react';
import { motion } from 'framer-motion';
import NeoButton from '../ui/NeoButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// 2. Constants (outside component)
const ANIMATION_DURATION = 500;

// 3. Component with JSDoc
/**
 * MyComponent — One-line description of what it does.
 */
export default function MyComponent({ title, items }) {
  // 4. Hooks
  const [ref, isInView] = useScrollAnimation();
  const [active, setActive] = useState(false);

  // 5. Handlers
  const handleClick = () => setActive(!active);

  // 6. Render
  return (
    <section ref={ref}>
      {/* JSX */}
    </section>
  );
}
```

---

## 📝 Commit Convention

We use **[Conventional Commits](https://www.conventionalcommits.org/)** for all commit messages:

```
<type>: <short description>

[optional body — explain what and why, not how]
```

### Types

| Type | When to use |
| ---- | ----------- |
| `feat` | New feature or enhancement |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | CSS/UI changes (no logic change) |
| `refactor` | Code change that doesn't fix a bug or add a feature |
| `perf` | Performance improvement |
| `chore` | Build config, dependencies, tooling |
| `revert` | Revert a previous commit |

### Examples

```bash
feat: add terminal-style contact form to homepage
fix: resolve navbar overflow on mobile safari
docs: add JSDoc to all UI components
style: improve card hover glow consistency
refactor: extract scroll animation into shared hook
perf: lazy-load gallery images below the fold
chore: update framer-motion to v12.35
```
## 📁 Project Structure

```
rtf-website/
├── public/                     # Static assets served as-is
├── src/
│   ├── assets/
│   │   ├── images/             # Local images (RTF logo, etc.)
│   │   ├── icons/              # Custom SVG icons
│   │   └── video/              # Intro video
│   ├── components/
│   │   ├── layout/             # App shell — Navbar, Footer, ScrollProgress, VideoIntro
│   │   ├── sections/           # Page sections — HeroSection, StatsBar, FeaturedProjects, etc.
│   │   └── ui/                 # Reusable UI primitives — NeoButton, HoloCard, ParallaxImage, etc.
│   ├── data/                   # Static data files (projects, team, timeline, stats, gallery)
│   ├── hooks/                  # Custom React hooks (useScrollAnimation, useCountUp)
│   ├── lib/                    # Utility libraries (Framer Motion animation variants)
│   ├── pages/                  # Route-level page components
│   └── styles/
│       └── globals.css         # Tailwind directives + CSS custom properties + utility classes
├── tailwind.config.js          # Extended Tailwind theme (colors, fonts, shadows, animations)
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint flat config
└── package.json
```

### Architecture Principles

- **Components are split into 3 tiers:** `layout/` (app shell), `sections/` (page-level blocks), `ui/` (reusable primitives)
- **Data lives in `src/data/`** — hardcoded JS arrays/objects, no API calls
- **Animations are centralized** in `src/lib/animations.js` as reusable Framer Motion variants
- **Scroll-triggered animations** use a shared `useScrollAnimation` hook (Intersection Observer)
- **Design tokens** are defined in both `tailwind.config.js` (Tailwind classes) and `globals.css` (CSS custom properties)

---

## 🎨 Design System

### Color Palette

| Token            | Hex       | Usage                       |
| ---------------- | --------- | --------------------------- |
| `void`           | `#020408` | Deepest background          |
| `deep`           | `#080D14` | Page background             |
| `surface`        | `#0D1520` | Cards, panels               |
| `elevated`       | `#141E2E` | Hover/active surfaces       |
| `border`         | `#1E2D42` | Borders                     |
| `cyan-400`       | `#22D3EE` | Primary accent              |
| `amber-400`      | `#FBBF24` | Secondary accent (CTAs)     |
| `purple-400`     | `#8B5CF6` | Tertiary accent             |
| `text-primary`   | `#F1F5F9` | Headings, primary text      |
| `text-secondary` | `#94A3B8` | Body text, descriptions     |
| `text-muted`     | `#475569` | Labels, hints, placeholders |

### Typography

| Class          | Font           | Usage                  |
| -------------- | -------------- | ---------------------- |
| `.text-display`| Space Grotesk  | Hero headlines         |
| `.text-h1`     | Space Grotesk  | Page titles            |
| `.text-h2`     | Space Grotesk  | Section headings       |
| `.text-h3`     | Space Grotesk  | Card titles            |
| `.text-body`   | Inter          | Body paragraphs        |
| `.text-mono`   | JetBrains Mono | Code/terminal text     |
| `.text-label`  | JetBrains Mono | Uppercase labels/tags  |


### Rules

- Use **lowercase** for the description (no capital first letter)
- Use **imperative mood** ("add feature" not "added feature")
- Keep the first line under **72 characters**
- Reference issue numbers in the body if applicable: `Closes #42`

---

## 🔀 Pull Request Process

### Before Opening a PR

- [ ] Your branch is up to date with `main`
- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` succeeds without errors
- [ ] You've tested on mobile (375px) and desktop (1440px)
- [ ] No `console.log` statements left in the code
- [ ] New components have JSDoc comments
- [ ] All interactive elements have hover states
- [ ] All images have `alt` text

### PR Template

When you open a PR, include:

```markdown
## What does this PR do?
<!-- Brief description of the change -->

## Type of change
<!-- Check one -->
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 🎨 Design/style improvement
- [ ] ♿ Accessibility improvement
- [ ] 📝 Documentation
- [ ] 🧹 Refactor / code quality
- [ ] 🔧 Chore (config, dependencies)

## Screenshots / Screen recordings
<!-- Add before/after screenshots for any visual change. Mandatory for UI PRs. -->

## Tested on
- [ ] Chrome (desktop)
- [ ] Mobile viewport (375px)
- [ ] Firefox or Safari (at least one)

## AI Disclosure
<!-- If AI tools were used, briefly describe how. See AI Policy. -->
- [ ] No AI tools were used
- [ ] AI tools were used as described below:
  <!-- e.g., "Used GitHub Copilot for autocomplete suggestions on Tailwind classes" -->
```

### Review Process

1. A maintainer will review your PR within **48–72 hours**
2. You may receive feedback — this is normal. Address comments and push new commits.
3. Once approved, a maintainer will merge your PR
4. Your contribution will appear on the live site after the next deployment 🎉

### What Will Get Your PR Rejected

- Raw AI-generated code that the contributor clearly doesn't understand (see [AI Policy](#-ai-policy))
- Changes that break mobile responsiveness
- Hardcoded colors/sizes instead of using the design system
- No description or screenshots for visual changes
- Failing lint or build

---

## 🎫 Issue Template and Assignment Process

### How to Open/Raise an Issue

Before starting work on any bug fix or feature, please [open an issue](https://github.com/TheRoboTechForum/RTF-Website-New/issues/new) describing what you'd like to fix or build. This helps prevent duplicate work and allows maintainers and contributors to discuss the best approach.

### Issue Template

When opening an issue, please provide the following information:

```markdown
## 🐛 Issue Type
<!-- Check one -->
- [ ] Bug report
- [ ] Feature request
- [ ] Documentation improvement
- [ ] Design/UI improvement
- [ ] Other (please specify)

## 📝 Description
### What is the issue?
Clearly describe the problem or feature request. What is broken? What is missing? What should be improved?

### Expected Behavior
Describe what should happen or how it should look/work.

### Proof/Evidence
<!-- Provide screenshots, recordings, or a link to a live example -->
- **Screenshots:** [Attach before/after images]
- **Screen Recording:** [Link to video showing the issue]
- **Live URL:** [If applicable]

## 🖥️ Environment Details
<!-- Please tell us where you encountered this -->

### Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Browser (specify): ___________

### Device
- [ ] Desktop (Windows/Mac/Linux) - specify: ___________
- [ ] Mobile (iOS/Android) - Device: ___________
- [ ] Tablet - Device: ___________

### Viewport Size (if applicable)
- Approximate width: _____ px

### Additional Context
Any other relevant information? Links to related issues? Configuration details?
```

### Assignment Workflow

⚠️ **Important:** Issues are not automatically assigned to anyone. If you want to work on an issue, you must **request assignment** first.

#### How to Get Assigned to an Issue

1. **Find an issue** you'd like to work on
2. **Comment on the issue** with the command: `/assign`
3. **Wait for confirmation** — The workflow will automatically:
   - Assign you to the issue
   - Add the `in-progress` label
   - Post a confirmation comment with an expiry date

```
💬 Comment to request assignment:
/assign
```

#### Assignment Rules

- **Assignment Duration:** 5 days
- **Once 5 days pass:** The assignment automatically expires, the `in-progress` label is removed, and the issue becomes available for others
- **Already Assigned?** If someone else is already assigned, you'll see a message. Wait for them to finish or ask in the issue if they need help
- **Want to Unassign?** Comment `/unassign` to release the issue back to the community
- **Stuck?** If you're nearing the 5-day limit and need more time, comment on the issue to request a renewal

#### Workflow Details

Our automated workflow ensures fair assignment and prevents issues from being left idle:

- **`/assign` command** → Triggers the Smart Assign workflow
  - Checks if the issue is already assigned
  - Assigns to you (or a mentioned user if you use `/assign @username`)
  - Adds the `in-progress` label
  - Sets a 5-day expiry date

- **Auto Unassign** → Daily checks for expired assignments
  - If 5 days have passed since assignment, automatically unassigns
  - Removes the `in-progress` label
  - Posts a message that the issue is open again

### Example Workflow

```
1️⃣ You find issue #42: "Fix navbar overflow on mobile"

2️⃣ You comment:
   /assign

3️⃣ Workflow responds:
   ✅ Assigned to @yourname until Mar 28, 2026
   Issue gets the "in-progress" label

4️⃣ You create a branch and open a PR within 5 days

5️⃣ Your PR gets merged → Issue is closed ✨
```

**Never start work on an issue without being assigned** — this prevents duplicate effort and confusion.

#### Need Help with Assignment?

If you're unsure about anything related to the assignment process, feel free to ask:
- **On Discord:** [discord.gg/nFcxaYKc](https://discord.gg/nFcxaYKc) — Quickest way to get answers
- **In the GitHub issue:** Comment with your questions

---

## 🔍 What We're Looking For

### High-priority contributions right now:

- 🖼️ **Real RTF photos** — Replace Unsplash placeholders with actual club photos (workshops, competitions, lab)
- 📱 **Mobile polish** — Test edge cases on various mobile viewports and fix layout issues
- ♿ **Accessibility audit** — Test with keyboard-only navigation and screen readers
- 🧪 **Cross-browser testing** — Safari, Firefox, Edge compatibility
- ✨ **Page completions** — Some pages may still need sections or polish
- 📝 **Content updates** — Real project descriptions, team member data, timeline events

---

## 🤖 AI Policy

RTF is a student engineering club. We value **learning, understanding, and genuine skill development**. This AI policy reflects those values.

### Our Position

> **AI tools are welcome as assistants. They are not welcome as replacements for understanding.**

We recognise that tools like GitHub Copilot, ChatGPT, Claude, Cursor, and others are part of the modern development workflow. Banning them outright would be impractical and counterproductive. But we also know that submitting code you don't understand helps nobody — not the project, and not you as a developer.

### ✅ Acceptable Uses of AI

| Use Case | Example | Why It's OK |
| -------- | ------- | ----------- |
| **Learning** | "Explain how Intersection Observer works" | You're building understanding |
| **Debugging** | "Why is this Framer Motion animation janky?" | You're solving a specific problem you encountered |
| **Boilerplate generation** | "Generate a basic React component skeleton" | You'll customize and build on top of it |
| **Exploring approaches** | "What are three ways to implement a parallax effect in React?" | You're comparing options before choosing |
| **Autocomplete / IntelliSense** | Using Copilot's inline suggestions while typing | You're reviewing each suggestion as it appears |
| **Refactoring assistance** | "Help me extract this repeated logic into a custom hook" | You already wrote the original code and understand it |
| **Writing tests** | "Generate test cases for this utility function" | You verify the tests are correct and meaningful |
| **Documentation** | "Help me write a JSDoc comment for this component" | You review it matches the actual component behavior |

### ❌ Unacceptable Uses of AI

| Use Case | Example | Why It's Not OK |
| -------- | ------- | --------------- |
| **Wholesale code generation** | Prompting "build me the entire Gallery page" and submitting the output | You haven't written or understood the code |
| **Copy-paste without review** | Pasting AI output directly into a file without reading it | You can't vouch for its correctness or quality |
| **PR farming** | Using AI to mass-generate PRs across files to inflate contribution count | This is contribution spam, not contribution |
| **Bypassing learning** | Using AI to avoid understanding how a library or pattern works | The whole point of contributing is to learn |
| **Generating fake content** | Using AI to write "testimonials" or fake achievement descriptions | Our content must be real and honest |
| **Hiding AI usage** | Using AI heavily but claiming the work is entirely manual | Transparency matters — just disclose it |

### Disclosure Requirement

**If you used AI tools in a meaningful way while working on your PR, disclose it.** There's an "AI Disclosure" section in the PR template for this.

You do **NOT** need to disclose:
- IDE autocomplete (Copilot inline suggestions, TabNine, etc.)
- Spell-checking tools
- Linting / formatting tools

You **DO** need to disclose:
- Prompting a chat-based AI to generate a component, function, or section
- Using AI to write commit messages or PR descriptions (yes, really)
- Having AI refactor or rewrite significant portions of code

### How We'll Evaluate AI-Assisted PRs

When reviewing a PR that discloses AI usage, maintainers will ask:

1. **Does the contributor understand the code?** — We may ask you to explain what a specific block does
2. **Has it been adapted to our codebase?** — AI-generated code often ignores the existing design system, naming conventions, and project structure. Raw AI output is obvious.
3. **Is it correct?** — AI makes mistakes. Has the contributor tested and verified the output?
4. **Does it follow our style guide?** — AI tools don't know our Tailwind config or animation conventions. The contributor must adapt the output.

If we suspect a PR is raw, unreviewed AI output, we'll ask the contributor to explain their changes. If they can't, the PR will be closed with a note explaining why.

### The Spirit of This Policy

We're not trying to police how you code. Use whatever tools make you productive. But at the end of the day:

> **If your name is on the commit, you should be able to explain every line in it.**

This is about respect — for the project, for other contributors who review your code, and for yourself as a developer who's here to learn and grow.

---

## 🐛 Reporting Bugs

Found a bug? [Open an issue](https://github.com/TheRoboTechForum/RTF-Website-New/issues/new) with:

- **Title:** Short, descriptive summary
- **Description:** What happened vs. what you expected
- **Steps to reproduce:** How can we see the bug?
- **Screenshots:** Especially for visual/layout bugs
- **Environment:** Browser, OS, viewport size

```markdown
**Bug:** Navbar overlaps hero section on iPhone SE (375px)

**Expected:** Navbar should be above the hero content with no overlap

**Steps:**
1. Open the site on a 375px viewport
2. Scroll down slightly
3. Notice the fixed navbar covers the hero headline

**Browser:** Safari iOS 17.2
**Device:** iPhone SE (3rd gen)
```

---

## 💡 Requesting Features

Have an idea? [Open an issue](https://github.com/TheRoboTechForum/RTF-Website-New/issues/new) with:

- **What** you'd like to see
- **Why** it would be useful (who benefits?)
- **How** you envision it working (mockups/sketches welcome)

Don't worry about whether it's feasible — just describe the idea. We'll discuss it.

---

## ❓ Getting Help

Stuck on something? Here's how to get unblocked:

1. **Check existing issues** — Someone may have asked the same question
2. **Read the code** — The codebase has JSDoc comments and the design system is documented in the README
3. **Join our Discord** — Quick questions? [Join the RTF Discord server](https://discord.gg/nFcxaYKc) for real-time discussion with contributors and maintainers
4. **Open a Discussion/Issue** — Ask on GitHub. No question is too basic.
5. **Reach out to maintainers** — Tag `@dakshtitarmare` or `@TheRoboTechForum` in your issue

### 💬 Communication Channels

- **Discord:** [https://discord.gg/nFcxaYKc](https://discord.gg/nFcxaYKc) — Real-time communication, quick questions, and community support
- **GitHub Issues:** Ask anything in the repository issues
- **GitHub Discussions:** Join conversations about features and improvements
- **Email:** Reach out to maintainers in GitHub issues for more complex discussions

---

## 🙏 Recognition

All contributors will be recognized:

- Your GitHub profile will appear in the repository's Contributors graph
- Significant contributions will be highlighted in release notes
- Active contributors may be invited to join the RTF core team

---

<div align="center">

**Every contribution, no matter how small, makes the RTF website better.**

**Thank you for being part of this. 🚀**

</div>
