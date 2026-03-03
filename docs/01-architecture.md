# Architecture Documentation

## Overview

UDLAP Robotics is a React-based Single Page Application (SPA) that serves as a documentation portal for the UDLAP Robotics Laboratory. The application dynamically fetches content from GitHub repositories and renders it as a navigable documentation site.

## Architecture Pattern

**Pattern**: JAMstack (JavaScript, APIs, Markup)
- **Frontend**: React 19 with TypeScript
- **Backend**: GitHub API (serverless)
- **Deployment**: GitHub Pages (static hosting)

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Pages (Static Host)                │
│                 https://cesar-martinez-torres.github.io/     │
│                        UDLAP_Robotics/                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      React Application                       │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐   │
│  │   Router   │  │  Components │  │  Helpers/Services   │   │
│  │  (Pages)   │  │   (UI)      │  │  (Data Fetching)    │   │
│  └────────────┘  └────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      GitHub API                              │
│  https://api.github.com/repos/cesar-martinez-torres/        │
│                   UDLAP_Robotics/contents                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Repository                           │
│  - /projects (project documentation)                         │
│  - /templates (content templates)                            │
│  - README.md (home page content)                             │
└─────────────────────────────────────────────────────────────┘
```

## Application Structure

```
app/
├── public/              # Static assets
│   ├── index.html      # HTML entry point
│   ├── 404.html        # GitHub Pages redirect handler
│   └── manifest.json   # PWA manifest
├── src/
│   ├── components/     # React components
│   │   └── elements/   # Reusable UI components
│   │       ├── Layout/     # Main layout wrapper
│   │       ├── Navbar/     # Top navigation
│   │       ├── Sidebar/    # Side navigation
│   │       ├── DocPage/    # Document renderer
│   │       └── Loading/    # Loading spinner
│   ├── router/         # Routing configuration
│   │   ├── Router.tsx      # Main router setup
│   │   └── pages/          # Page components
│   │       └── Home/       # Home page
│   ├── helpers/        # Utility functions
│   │   ├── fetching-helpers.ts    # GitHub API calls
│   │   ├── md-jsx-parser.tsx      # Markdown parser
│   │   ├── string-helpers.ts      # String utilities
│   │   └── constant-helpers.ts    # Constants
│   ├── shared/         # Shared resources
│   │   └── interfaces/ # TypeScript interfaces
│   ├── App.tsx         # Root component
│   └── index.tsx       # Application entry point
└── scripts/            # Build scripts
    └── add-404.js      # Copy 404.html to build
```

## Data Flow

1. **Application Initialization**
   - User navigates to the site
   - React app loads and initializes
   - Router component mounts

2. **Content Fetching**
   - `fetchProjectsContents()` calls GitHub API
   - Retrieves list of project directories from `/projects`
   - For each project, fetches `README.md` file
   - Downloads and parses markdown content

3. **Content Rendering**
   - Markdown is parsed to React components via `react-markdown`
   - Custom Chakra UI components style the content
   - Content is displayed in the DocPage component

4. **Navigation**
   - Sidebar displays all available projects
   - Each project has collapsible sections
   - React Router handles client-side navigation
   - Hash-based navigation for section scrolling

## Component Hierarchy

```
App (ChakraProvider + Theme)
└── Router (BrowserRouter)
    └── Layout
        ├── Sidebar
        │   └── Project Links (dynamic)
        ├── Navbar
        │   ├── Home Link
        │   ├── GitHub Link
        │   └── Theme Toggle
        └── Routes
            ├── Home (/)
            │   └── DocPage (main README)
            └── DocPage (/docs/:id)
                └── Markdown Content
```

## Key Design Decisions

### 1. GitHub as Backend
**Decision**: Use GitHub API to fetch content dynamically
**Rationale**: 
- No need for separate backend server
- Content managed through Git workflow
- Version control built-in
- Free hosting via GitHub Pages

### 2. Client-Side Rendering
**Decision**: Fetch and render content on the client
**Rationale**:
- Simpler deployment (static files only)
- No server infrastructure needed
- Dynamic content updates without rebuilding

**Trade-offs**:
- Initial load time (API calls)
- SEO limitations
- GitHub API rate limits

### 3. Markdown-Based Content
**Decision**: Store all content as Markdown files
**Rationale**:
- Easy to write and maintain
- Version control friendly
- Portable format
- Rich ecosystem of tools

### 4. Chakra UI Component Library
**Decision**: Use Chakra UI for styling
**Rationale**:
- Built-in dark mode support
- Accessible components
- Consistent design system
- TypeScript support

## Routing Strategy

**Pattern**: Client-side routing with React Router v7

- **Base Path**: `/UDLAP_Robotics` (GitHub Pages subdirectory)
- **Routes**:
  - `/` - Home page (main README)
  - `/docs/:id` - Project documentation pages
  - `*` - Catch-all redirects to home

**URL Structure**:
- Project pages: `/docs/tutorial-pick-and-place-ursim`
- Section anchors: `/docs/tutorial-pick-and-place-ursim#installation`

## State Management

**Pattern**: Local component state with React hooks

- No global state management library (Redux, Zustand, etc.)
- State is managed at component level using `useState`
- Data fetching on component mount with `useEffect`
- Color mode managed by Chakra UI's `useColorMode`

**State Locations**:
- `Router.tsx`: Pages data, loading state
- `Sidebar.tsx`: Pages data (duplicate fetch), expanded sections
- `Home.tsx`: Main README data, loading state
- `DocPage.tsx`: Current page data

## Deployment Architecture

**Build Process**:
1. `yarn build` - Create production build with React Scripts
2. `node scripts/add-404.js` - Copy 404.html to build directory
3. `gh-pages -d build` - Deploy to GitHub Pages

**GitHub Pages Configuration**:
- Branch: `gh-pages`
- Directory: root
- Custom 404 handling for SPA routing

## Performance Considerations

**Current Implementation**:
- Multiple API calls on page load
- Duplicate data fetching (Router and Sidebar)
- No caching mechanism
- No code splitting
- No lazy loading of routes

**Optimization Opportunities** (see issues documentation):
- Implement data caching
- Share fetched data between components
- Add loading skeletons
- Implement code splitting
- Add service worker for offline support
