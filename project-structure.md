# RTF Website Project Structure

This document provides a comprehensive overview of the project's file structure and describes what kind of data or logic each file contains.

## 📂 Root Directory
Configuration files for the project's tooling, dependencies, and environment.
- `package.json` / `package-lock.json`: Contains project dependencies, scripts, and metadata.
- `vite.config.js`: Configuration for the Vite build tool and development server.
- `tailwind.config.js`: Configuration for Tailwind CSS (custom themes, colors, plugins).
- `postcss.config.js`: Configuration for processing CSS.
- `eslint.config.js`: Rules for ESLint to maintain code quality.
- `index.html`: The main entry HTML file for the React application.
- `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`: Project documentation and guidelines.

## 📂 src/
The main source code directory for the React application.

### 📁 src/data/
Contains static data arrays and objects used to populate the UI without needing a backend.
- `gallery.js`: Data for the gallery page (image URLs, captions, categories).
- `projects.js`: Information about different projects (titles, descriptions, tech stacks, links).
- `stats.js`: Statistical data (e.g., numbers for achievements or community stats).
- `team.js`: Information about team members (names, roles, social links, profile pictures).
- `timeline.js`: Data for the project or organization's historical timeline/milestones.

### 📁 src/pages/
Contains the main route/page components of the application. Each file represents a distinct page.
- `Home.jsx`: The main landing page.
- `About.jsx`: Information about the organization.
- `Achievement.jsx`: Highlights of accomplishments.
- `Contact.jsx`: Contact forms and information.
- `Gallery.jsx`: Displays the photo/video gallery.
- `Login.jsx`: User authentication page.
- `Projects.jsx`: Showcases different projects.
- `Sponsors.jsx`: Details about sponsors and partners.
- `Team.jsx`: Renders the team members grid.
- `Timeline.jsx`: Page dedicated to showing the timeline.

### 📁 src/components/
Reusable React components split into logical categories.

#### 📁 layout/
Components that form the structural shell of the application.
- `Navbar.jsx`: The top navigation bar.
- `Footer.jsx`: The bottom footer.
- `LoadingScreen.jsx`: Full-screen loader used during initial page load.
- `VideoIntro.jsx` / `VideoIntroEnhanced.jsx`: Introductory video components.
- `ScrollProgress.jsx` / `ScrollProgressFixed.jsx`: UI indicators for page scroll depth.

#### 📁 sections/
Larger blocks of content that make up parts of pages.
- `CyberpunkHero.jsx` / `HeroSection.jsx`: Top intro sections for pages.
- `HorizontalTimeline.jsx`: A horizontal timeline layout component.
- `SponsorShowcase.jsx` / `SponsorCTA.jsx`: Sections to display and attract sponsors.
- `StatsBar.jsx`: A banner displaying key statistics.
- `TerminalContact.jsx`: A terminal-styled contact section.
- `WhyRTF.jsx`: A section explaining the benefits of RTF.

#### 📁 ui/
Small, reusable visual elements (buttons, cards, effects).
- `DotGrid.jsx`, `GridScan.jsx`, `LightRays.jsx`, `ParticleCanvas.jsx`: Background effects and visual flair.
- `HoloCard.jsx`, `ProjectCard.jsx`: Reusable card components for displaying content.
- `NeoButton.jsx`: Custom stylized buttons.
- `OptimizedImage.jsx`, `ParallaxImage.jsx`: Image components with performance/visual enhancements.
- `Skeletons.jsx`, `SkeletonLoaders.jsx`: Placeholder loading states.
- `ThemeToggle.jsx`: Component to switch between light/dark modes.

### 📁 Other src/ Directories
- `src/assets/`: Static assets like images, SVGs, or fonts imported directly into components.
- `src/styles/`: Global CSS or styling files.
- `src/context/`: React Context providers for global state management.
- `src/hooks/`: Custom React hooks (reusable logic).
- `src/utils/` / `src/lib/`: Helper functions, constants, and third-party library configurations.
