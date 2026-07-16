export interface ProjectCase {
    slug: string;
    title: string;
    tagline: string;
    tech: string[];
    github: string;
    githubBackend?: string;
    liveUrl?: string;
    videoUrl?: string;
    npmCommand?: string;
    image: string;
    overview: string[];
    highlights: string[];
}

export const projectCases: ProjectCase[] = [
    {
        slug: 'nextnews',
        title: 'NextNews',
        tagline: 'Real-time news aggregation with AI-powered summarization',
        tech: ['Next.js', 'NewsAPI', 'Groq', 'LLaMA', 'Tailwind CSS'],
        github: 'https://github.com/Satpal777/NextNews',
        liveUrl: 'https://github.com/Satpal777/NextNews',
        image: '/project-nextnews.png',
        overview: [
            'NextNews is a real-time news aggregation platform that pulls stories from multiple news APIs into a single unified stream. Instead of forcing readers to skim full articles, it uses LLaMA models served through Groq to generate fast AI summaries, so a reader can scan the day\'s news in minutes.',
            'The app is built with Next.js and Tailwind CSS on the frontend, with server-side routes orchestrating the news providers and the LLM summarization pipeline. Sentiment analysis is applied to incoming stories to enrich the feed and enable personalized filtering.',
        ],
        highlights: [
            'Aggregates multiple news APIs into one deduplicated, unified feed',
            'AI-powered article summarization using Groq-hosted LLaMA models',
            'Rapid sentiment analysis applied across the incoming stream',
            'Personalized feeds built on reader interests',
        ],
    },
    {
        slug: 'carpool',
        title: 'Carpool',
        tagline: 'Carpool matching with interactive route visualization',
        tech: ['AngularJS', 'Node.js', 'Express.js', 'MongoDB', 'Leaflet'],
        github: 'https://github.com/Satpal777/Carpool',
        liveUrl: 'https://github.com/Satpal777/Carpool',
        image: '/project-carpool.png',
        overview: [
            'Carpool is a full-stack web application that matches riders and drivers travelling along similar routes. Routes are plotted and visualized on interactive Leaflet.js maps, making it easy to see where journeys overlap and which matches actually make sense geographically.',
            'The backend is built on Node.js, Express and MongoDB, handling user accounts, ride listings and the matching logic, while the AngularJS frontend renders live route overlays with custom clustering metrics to group nearby pickup points.',
        ],
        highlights: [
            'Interactive route plotting and visualization with Leaflet.js',
            'Route matching with custom clustering metrics for pickup points',
            'Full CRUD ride management backed by MongoDB',
            'Classic MEAN-style architecture with clean REST APIs',
        ],
    },
    {
        slug: 'aetheria',
        title: 'Aetheria',
        tagline: 'Immersive cosmic data visualization dashboard',
        tech: ['React', 'Three.js', 'WebGL', 'Framer Motion'],
        github: 'https://github.com/Satpal777/aetheria',
        liveUrl: 'https://github.com/Satpal777/aetheria',
        image: '/project-aetheria.png',
        overview: [
            'Aetheria is a data visualization platform that renders simulated deep-space telemetry as an immersive, sci-fi styled dashboard. Orbital graphs, neon HUD overlays and high-performance charts turn raw telemetry into something that feels like a spacecraft control room.',
            'It leans on Three.js and WebGL for GPU-accelerated 3D rendering, with React managing dashboard state and Framer Motion driving the interface animations. The project was an exercise in pushing browser rendering performance while keeping the UI responsive.',
        ],
        highlights: [
            'GPU-accelerated 3D orbital visualizations with Three.js and WebGL',
            'Neon HUD-style overlays and high-performance realtime charts',
            'Smooth interface motion built with Framer Motion',
            'Optimized render loops to keep frame rates high in the browser',
        ],
    },
    {
        slug: 'tiktak',
        title: 'Tik-Tak',
        tagline: 'Tic-Tac-Toe with character avatars and game AI',
        tech: ['React', 'Game AI', 'CSS Grid', 'Tailwind CSS'],
        github: 'https://github.com/Satpal777/tik-tak',
        liveUrl: 'https://tiktak.satpal.cloud',
        image: '/project-tiktak.png',
        overview: [
            'Tik-Tak is a playful twist on classic Tic-Tac-Toe: custom character avatars, a polished interactive board, and an intelligent computer opponent. Play against the AI or challenge a friend in local multiplayer.',
            'Built with React and Tailwind CSS on a CSS Grid board, the game logic implements an AI opponent that evaluates board states to play competitively rather than randomly — small game, real game-AI fundamentals.',
        ],
        highlights: [
            'Intelligent computer opponent driven by board-state evaluation',
            'Custom character avatars instead of plain X and O',
            'Local two-player mode alongside the AI mode',
            'Live at tiktak.satpal.cloud',
        ],
    },
    {
        slug: 'ratiod',
        title: "Ratio'd",
        tagline: 'Blazing fast real-time polling platform',
        tech: ['Next.js', 'React', 'Live Data', 'Tailwind CSS'],
        github: 'https://github.com/Satpal777/Ratiod',
        liveUrl: 'https://ratiod.satpal.cloud/',
        image: '/project-ratiod.png',
        overview: [
            "Ratio'd is a real-time polling platform: launch a quick poll, share the link, and watch votes stream in live. Results update instantly for every connected viewer, turning any question into a live event.",
            'The platform is built with Next.js and React with live data synchronization keeping all clients consistent. A modern creator toolkit makes poll creation fast, and the UI is optimized to feel instant from creation to first vote.',
        ],
        highlights: [
            'Live vote streaming — results update in real time for all viewers',
            'Instant poll creation with a modern creator toolkit',
            'Real-time data synchronization across connected clients',
            'Live at ratiod.satpal.cloud',
        ],
    },
    {
        slug: 'lively',
        title: 'Lively',
        tagline: 'Real-time location tracking on Kafka event streams',
        tech: ['React', 'Kafka', 'Bun', 'WebSockets'],
        github: 'https://github.com/Satpal777/Lively-Frontend',
        githubBackend: 'https://github.com/Satpal777/Lively-Backend',
        videoUrl: 'https://youtu.be/jegLFE0CEzk',
        image: '/project-lively-v2.png',
        overview: [
            'Lively is a real-time location tracking platform that visualizes the live positions of connected users on an interactive map. As users move, their positions stream to every connected client with minimal latency.',
            'Under the hood it uses a high-throughput event streaming architecture: location events flow through Apache Kafka, a Bun-powered backend fans them out over WebSockets, and a React frontend renders the moving markers. The project demonstrates how event streaming infrastructure typically found in large distributed systems applies to a live consumer experience.',
        ],
        highlights: [
            'High-throughput event streaming architecture built on Apache Kafka',
            'Bun runtime on the backend for fast WebSocket fan-out',
            'Live map visualization of all connected users in real time',
            'Demo video walkthrough available on YouTube',
        ],
    },
    {
        slug: 'emitly',
        title: 'Emitly',
        tagline: 'High-performance real-time WebSocket messaging platform',
        tech: ['React', 'Node.js', 'WebSockets', 'Tailwind CSS'],
        github: 'https://github.com/Satpal777/socket-box-frontend',
        githubBackend: 'https://github.com/Satpal777/socket-box',
        liveUrl: 'https://emitly.satpal.cloud',
        videoUrl: 'https://youtu.be/H6wHaHviP0U',
        image: '/project-emitly.png',
        overview: [
            'Emitly is a real-time WebSocket messaging platform focused on ultra-low latency data transmission between connected clients. It gives developers a clean dashboard for inspecting connections, channels and message flow.',
            'The stack is a Node.js WebSocket backend with a React and Tailwind CSS frontend. The emphasis throughout is developer experience: predictable APIs, observable message flow, and latency kept as close to the wire as possible.',
        ],
        highlights: [
            'Ultra-low latency WebSocket message delivery',
            'Developer-focused dashboard for connections and channels',
            'Separate open-source frontend and backend repositories',
            'Live at emitly.satpal.cloud',
        ],
    },
    {
        slug: 'aura-auth',
        title: 'Aura Auth',
        tagline: 'OIDC-compliant Single Sign-On authentication server',
        tech: ['Node.js', 'OAuth 2.0', 'OIDC', 'Security'],
        github: 'https://github.com/Satpal777/aura-auth',
        liveUrl: 'https://auth.satpal.cloud/',
        image: '/project-aura-auth.png',
        overview: [
            'Aura Auth is an OpenID Connect (OIDC) compliant Single Sign-On server: a plug-and-play identity provider that lets multiple applications share one secure login. Sign in once, and every connected app trusts the same identity.',
            'Built on Node.js implementing the OAuth 2.0 and OIDC specifications, it handles authorization flows, token issuance and session management. The project is a deep dive into authentication security — the flows, the token lifetimes, and the many ways to get them wrong.',
        ],
        highlights: [
            'Standards-compliant OAuth 2.0 / OpenID Connect implementation',
            'Single Sign-On across multiple client applications',
            'Secure token issuance and session management',
            'Running live at auth.satpal.cloud',
        ],
    },
    {
        slug: 'chainmoj',
        title: 'ChainMoj',
        tagline: 'Full-stack movie ticket booking platform',
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
        github: 'https://github.com/Satpal777/movie-ticket-booking-frontend',
        githubBackend: 'https://github.com/Satpal777/movie-ticket-booking-backend',
        liveUrl: 'https://chainmoj.satpal.cloud',
        image: '/project-chainmoj.png',
        overview: [
            'ChainMoj is a full-stack movie ticket booking platform with real-time interactive theater seat selection. Pick a movie, choose your seats on a live seat map, and complete the booking — the whole cinema workflow in one app.',
            'A React frontend renders the interactive seat maps while a Node.js, Express and MongoDB backend manages movies, showtimes, seat inventory and automated booking workflows, including comprehensive cinema management for operators.',
        ],
        highlights: [
            'Real-time interactive theater seat selection',
            'Automated booking workflows from selection to confirmation',
            'Cinema management features for theaters and showtimes',
            'Live at chainmoj.satpal.cloud',
        ],
    },
    {
        slug: 'tss',
        title: 'TSS — Tea Simple Smart CSS',
        tagline: 'Lightweight CSS utility framework on npm',
        tech: ['CSS', 'NPM Package', 'Documentation', 'Open Source'],
        github: 'https://github.com/Satpal777/TSS',
        githubBackend: 'https://github.com/Satpal777/TSS-DOCS',
        liveUrl: 'https://tss-docs.vercel.app',
        npmCommand: 'npm i tea-simple-smart-css',
        image: '/project-tss.png',
        overview: [
            'Tea Simple Smart CSS (TSS) is a lightweight, intelligent CSS utility framework designed for modern web development. It is installable straight from npm as tea-simple-smart-css and ships with comprehensive developer documentation.',
            'Publishing and maintaining TSS covered the full open-source lifecycle: API design for utility classes, semantic versioning and npm releases, and a dedicated documentation site so developers can adopt it in minutes.',
        ],
        highlights: [
            'Published npm package: tea-simple-smart-css',
            'Lightweight utility-class approach to styling',
            'Dedicated documentation site with usage examples',
            'Fully open source, docs source included',
        ],
    },
];

export function getProjectCase(slug: string): ProjectCase | undefined {
    return projectCases.find((p) => p.slug === slug);
}
