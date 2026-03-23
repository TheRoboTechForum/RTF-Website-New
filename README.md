<div align="center">

# 🤖 ROBO-TECH FORUM — Official Website

**The official website of Robo-Tech Forum (RTF), Government College of Engineering, Amravati.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-cyan.svg)](CONTRIBUTING.md)

[**Live Site**](https://rtf-website-new.vercel.app) · [**Report Bug**](https://github.com/TheRoboTechForum/RTF-Website-New/issues) · [**Request Feature**](https://github.com/TheRoboTechForum/RTF-Website-New/issues) · [**Contributing Guide**](CONTRIBUTING.md) · [**Discord**](https://discord.gg/nFcxaYKc)

</div>

---

## 💬 Join Our Discord Community

**Have questions or want to chat with contributors?**

[![Discord](https://img.shields.io/badge/Discord-Join%20RTF%20Server-5865F2?logo=discord&logoColor=white)](https://discord.gg/nFcxaYKc)

👉 **[discord.gg/nFcxaYKc](https://discord.gg/nFcxaYKc)** — Real-time help, discussions, and community support

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [AI Policy](#-ai-policy)
- [Code of Conduct](#-code-of-conduct)
- [License](#-license)
- [Maintainers](#-maintainers)

---

## 🧭 About the Project

RTF (Robo-Tech Forum) is a student-led robotics club at Government College of Engineering, Amravati. This website serves as our digital identity — showcasing projects, team, achievements, and providing a platform for potential sponsors and collaborators to learn about what we do.

### Goals

- **Showcase excellence** — Present RTF's projects, competitions, and technical depth professionally
- **Attract sponsors** — Give corporate decision-makers confidence that RTF is worth investing in
- **Recruit members** — Inspire students across GCoEA to join the robotics ecosystem
- **Open-source learning** — Serve as a real-world React project that students can contribute to and learn from

### Key Features

- Blazing-fast static site — no backend, pure frontend
- Video intro splash screen on first visit
- Terminal-style interactive contact form
- Parallax image sections between content blocks
- Animated stat counters with scroll-triggered animations
- Custom design system with cyan/amber/purple accent palette
- Fully responsive — 375px to 4K
- Accessible — semantic HTML, keyboard navigation, focus management

---

## 🛠️ Tech Stack

| Layer          | Technology                                                         |
| -------------- | ------------------------------------------------------------------ |
| **Framework**  | [React 19](https://react.dev) + [Vite 7](https://vite.dev)        |
| **Styling**    | [Tailwind CSS 3.4](https://tailwindcss.com) (custom design tokens) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/)                 |
| **Icons**      | [Lucide React](https://lucide.dev)                                 |
| **Routing**    | [React Router 7](https://reactrouter.com)                          |
| **Forms**      | [React Hook Form](https://react-hook-form.com)                     |
| **Fonts**      | Space Grotesk · Inter · JetBrains Mono (Google Fonts)              |
| **Linting**    | ESLint 9 with React Hooks + React Refresh plugins                  |

<!-- > **No backend. No database. No auth.** This is a 100% static frontend project. -->

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x ([Download](https://nodejs.org))
- **npm** ≥ 9.x (comes with Node.js) or **yarn** / **pnpm**
- **Git** ([Download](https://git-scm.com))

### Installation

```bash
# 1. Star the Repository and Fork it on GitHub
#    Click the "Fork" button at https://github.com/TheRoboTechForum/RTF-Website-New

# 2. Clone your fork
git clone https://github.com/<your-username>/RTF-Website-New.git
cd RTF-Website-New/rtf-website

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The site will be running at **`http://localhost:5173`**.

### Environment Notes

- No `.env` file is needed — the project has zero environment variables
<!-- - The intro video (`src/assets/video/intro-video.mp4`) is bundled with the project -->
- All images use placeholder URLs from Unsplash — replace with real RTF photos when available

---


### Key UI Components

| Component        | File                        | Description                                      |
| ---------------- | --------------------------- | ------------------------------------------------ |
| `NeoButton`      | `components/ui/NeoButton`   | Primary CTA button with glow effect              |
| `HoloCard`       | `components/ui/HoloCard`    | Glassmorphism card with hover glow               |
| `ParallaxImage`  | `components/ui/ParallaxImage` | Full-width parallax scroll image section        |
| `TerminalText`   | `components/ui/TerminalText` | Typewriter animation with blinking cursor       |
| `SectionHeader`  | `components/ui/SectionHeader`| Consistent section title pattern (label + h2)   |
| `StatCounter`    | `components/ui/StatCounter`  | Animated number count-up on scroll               |
| `ProjectCard`    | `components/ui/ProjectCard`  | Project showcase card with hover effects         |

---

## 📜 Available Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR             |
| `npm run build`   | Production build to `dist/`                |
| `npm run preview` | Preview the production build locally       |
| `npm run lint`    | Run ESLint across the project              |

---

## 🤝 Contributing

We welcome contributions from everyone — whether you're a first-time contributor or an experienced developer.

**Please read our full [Contributing Guide](CONTRIBUTING.md) before submitting a PR.**

Quick summary:

1. Fork the repo & clone locally
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Make your changes following our code style
4. Test on mobile (375px) and desktop (1440px)
5. Commit with [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, etc.)
6. Push to your fork & open a Pull Request

---

## 🤖 AI Policy

We have a detailed AI policy in our [Contributing Guide](CONTRIBUTING.md#-ai-policy). The short version:

> **AI tools are allowed as assistants, but every line of code you submit must be understood, reviewed, and owned by you.**

- ✅ Use AI to learn, debug, generate boilerplate, or explore ideas
- ✅ Always review, test, and understand AI-generated output before committing
- ❌ Do not submit raw, unreviewed AI output as your contribution
- ❌ Do not use AI to mass-generate PRs without genuine understanding

See the full policy in [CONTRIBUTING.md](CONTRIBUTING.md#-ai-policy).

---

## 📜 Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming, inclusive, and respectful community. All contributors are expected to uphold these standards.

**TL;DR:** Be respectful. Be constructive. Be inclusive. Zero tolerance for harassment.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👥 Maintainers

| Name | Role | GitHub |
| ---- | ---- | ------ |
| Daksh | Lead Maintainer | [@dakshtitarmare](https://github.com/dakshtitarmare) |
| RTF Core Team | Reviewers | [@TheRoboTechForum](https://github.com/TheRoboTechForum) |

---

<div align="center">

**Built with ❤️ by the students of Robo-Tech Forum, GCoEA Amravati.**

⭐ Star this repo if you find it useful — it helps us attract contributors and sponsors!

</div>
