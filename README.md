# Satpalsinh Rana — Portfolio

A modern, responsive developer portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Features smooth Framer Motion animations, dark/light theme support with a clip-path reveal transition, and live Hashnode blog integration.

> **Live:** [satpal.cloud](https://satpal.cloud)

---

## ✨ Sections

| Section            | Description                                       |
| ------------------ | ------------------------------------------------- |
| **Hero**           | Animated initials (Geist Pixel font), social links |
| **Stats**          | Key numbers at a glance                            |
| **Experience**     | Work history timeline                              |
| **Skills**         | Tech stack overview                                |
| **Projects**       | Highlighted project cards                          |
| **Articles**       | Latest posts fetched from Hashnode via API route    |
| **Education**      | Academic background                                |
| **Certifications** | Certificate cards with image modal                 |
| **Contact**        | Social links & CTA                                 |

Additional components: **Header** (sticky nav with scroll-spy & keyboard shortcuts), **Search Modal** (<kbd>⌘ K</kbd>), **Theme Toggle** (clip-path reveal animation).

---

## 🛠️ Tech Stack

- **Framework** — Next.js 16 (App Router)
- **UI** — React 19, Tailwind CSS v4
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Fonts** — Geist Sans, Geist Mono, Geist Pixel Square
- **API** — Hashnode GraphQL (articles)
- **Package Manager** — Bun

---

## 🎨 Design Tokens

### Colors

| Token             | Light        | Dark         |
| ----------------- | ------------ | ------------ |
| `--background`    | `#f0f0ee`    | `#0a0a0a`    |
| `--foreground`    | `#171717`    | `#fafafa`    |
| `--border`        | `#d9d9d6`    | `#262626`    |
| Accent (teal-500) | `#0d9488`    | `#0d9488`    |

### Typography

| Font                | Usage               |
| ------------------- | ------------------- |
| Geist Sans          | Body / headings     |
| Geist Mono          | Code / monospace    |
| Geist Pixel Square  | Hero logo initials  |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Bun** (recommended) or npm / yarn / pnpm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Satpal777/portfolio-2.0.git
cd portfolio-2.0

# Install dependencies
bun install      # or: npm install

# Start dev server
bun dev          # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_HASHNODE_HOST=your-hashnode-blog.hashnode.dev
NEXT_PUBLIC_GITHUB_URL=https://github.com/Satpal777
```

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── api/articles/route.ts   # Hashnode GraphQL API route
│   ├── globals.css             # Theme tokens & global styles
│   ├── layout.tsx              # Root layout (fonts, ThemeProvider)
│   └── page.tsx                # Home page (all sections)
├── components/
│   ├── header.tsx              # Sticky nav, scroll-spy, mobile dock
│   ├── hero.tsx                # Animated hero section
│   ├── stats.tsx               # Stats counters
│   ├── experience.tsx          # Work experience timeline
│   ├── skills.tsx              # Skills grid
│   ├── projects.tsx            # Project showcase cards
│   ├── articles.tsx            # Blog articles (Hashnode)
│   ├── education.tsx           # Education section
│   ├── certifications.tsx      # Certs with image modal
│   ├── contact.tsx             # Contact & socials
│   ├── footer.tsx              # Footer
│   ├── search-modal.tsx        # ⌘K search
│   ├── theme-toggle.tsx        # Dark/light toggle
│   └── theme-provider.tsx      # next-themes wrapper
└── public/                     # Static assets & cert images
```

---

## 📜 Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `bun dev`        | Start development server |
| `bun run build`  | Production build       |
| `bun start`      | Serve production build |
| `bun run lint`   | Run ESLint             |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
