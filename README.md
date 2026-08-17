# Portfolio — Nithipan Sivakanthan

A single-page portfolio site built with Next.js (App Router), TypeScript, and
Tailwind CSS, styled with a hardware/electronics aesthetic (PCB traces,
schematic-style cards, monospace typography, circuit-board green accents).

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- [Shiki](https://shiki.style) for real syntax highlighting of code snippets
- [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) for the project details modal
- [lucide-react](https://lucide.dev) for icons

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build locally
```

## Deploying to Vercel

1. Push this repo to GitHub (or import it directly from your local folder).
2. In [Vercel](https://vercel.com/new), import the repository — the Next.js
   preset is detected automatically, no config needed.
3. Deploy. Every push to your default branch redeploys automatically.

## Content you still need to fill in

**Stats** — `src/data/site.ts` (`STATS`) has placeholder spec-sheet numbers in
the About section. Swap in real figures whenever you have them.

**Images** — all project imagery currently points at generated SVG
placeholders in `public/projects/`. Drop in real files with the same names
(PNG/JPG/WebP all work with `next/image`) to replace them, or update the
paths in `src/data/projects.ts`:

- `placeholder.svg` — used as every project card's thumbnail (except SPI, RISC-V CPU, Current-Sensing PCB, Study Pal, and Robotic Arm, which use their own photos/renders)
- `spi-thumbnail.png` — SPI peripheral project card thumbnail
- `spi-gds-2d.png`, `spi-gds-3d.png` — SPI peripheral project, shown in its details modal
- `riscv-thumbnail.png` — RISC-V CPU project card thumbnail
- `pcb-layout.png`, `pcb-schematic.png`, `pcb-3d-render.png` — Current-Sensing PCB project, shown in its details modal (3D render also used as its card thumbnail)
- `study-pal-thumbnail.jpg` — Study Pal project card thumbnail
- `robotic-arm-thumbnail.jpg` — Autonomous Utility Robotic Arm project card thumbnail

## Project structure

```
src/
  app/            # root layout, global styles, the single page route
  components/      # Nav, Hero, About, Experience, Skills, Projects, Contact, etc.
  data/            # site copy, experience, skills, and project content
  lib/highlight.ts # Shiki wrapper used to pre-render code snippets server-side
public/
  projects/        # project thumbnails / detail images / code screenshots
```

Projects are data-driven: each entry in `src/data/projects.ts` has a
`linkType` of `'details'`, `'github'`, or `'multi-link'`, which controls how
`ProjectCard` renders and behaves (opens a modal, links straight out to
GitHub, or shows multiple action buttons) without duplicating markup.
