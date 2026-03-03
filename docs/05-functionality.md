# Application Functionality

## Overview

UDLAP Robotics is a documentation portal that dynamically fetches and displays robotics project documentation from a GitHub repository. The application provides a navigable interface with dark/light mode support.

## Core Features

### 1. Dynamic Content Loading

**Description**: Fetches project documentation from GitHub repository at runtime

**Flow**:
1. Application loads
2. Fetches list of projects from `/projects` directory
3. For each project, fetches its `README.md` file
4. Parses markdown to React components
5. Displays in navigable interface

**Implementation**:
- `fetchProjectsContents()` in `fetching-helpers.ts`
- Uses GitHub Contents API
- Processes markdown files dynamically

**User Experience**:
- Shows loading spinner during fetch
- Content appears when ready
- No page refresh needed for navigation

### 2. Markdown Rendering

**Description**: Converts markdown files to styled React components

**Supported Markdown Features**:
- Headers (H1, H2)
- Paragraphs
- Lists (ordered and unordered)
- Bold text
- Inline code
- Images
- Links

**Custom Rendering**:
- H1: Chakra Heading with bottom border
- H2: Chakra Heading with anchor ID for navigation
- Paragraphs: Chakra Text with proper spacing
- Images: Automatic GitHub URL transformation
- Links: External links with hover effects
- Code: Inline code with syntax highlighting colors

**Implementation**:
- `react-markdown` library
- Custom component renderers in `md-jsx-parser.tsx`
- Chakra UI components for styling

### 3. Navigation System

#### 3.1 Sidebar Navigation

**Features**:
- Lists all available projects
- Collapsible sections for each project
- Section links within each project
- Persistent across page changes

**Interaction**:
- Click project title to navigate to project page
- Click chevron icon to expand/collapse sections
- Click section link to jump to specific section

**Implementation**:
```tsx
// Sidebar.tsx
const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());

const toggleSection = (pageTitle: string) => {
  // Toggle expansion state
};
```

#### 3.2 Top Navigation (Navbar)

**Features**:
- Home link (returns to main page)
- GitHub link (external)
- Dark/Light mode toggle

**Implementation**:
- React Router Link for internal navigation
- Chakra UI Link for external links
- IconButton for theme toggle

#### 3.3 Hash-Based Section Navigation

**Features**:
- URL hash corresponds to section ID
- Smooth scrolling to sections
- Works with browser back/forward buttons

**Implementation**:
```tsx
// DocPage.tsx
useEffect(() => {
  const sectionId = window.location.hash.replace("#", "");
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}, [location]);
```

**URL Format**: `/docs/project-name#section-name`

### 4. Theme System

#### 4.1 Dark Mode (Default)

**Features**:
- Dark background (gray.900, gray.800)
- Light text (white, gray.200)
- Reduced eye strain
- Better for low-light environments

**Colors**:
- Background: `gray.900`, `gray.800`
- Text: `white`, `gray.200`
- Accents: `yellow.300`, `yellow.400`
- Borders: `#444`

#### 4.2 Light Mode

**Features**:
- Light background (white, gray.100)
- Dark text (gray.800, gray.700)
- Better for bright environments

**Colors**:
- Background: `white`, `gray.100`
- Text: `gray.800`, `gray.700`
- Accents: `blue.500`, `purple.500`

#### 4.3 Theme Toggle

**Implementation**:
- Chakra UI `useColorMode` hook
- Persisted in localStorage
- Instant theme switching
- No page reload required

**Icon**:
- Dark mode: Sun icon (switch to light)
- Light mode: Moon icon (switch to dark)

### 5. Routing

**Routes**:
- `/` - Home page (main README)
- `/docs/:id` - Project documentation page
- `*` - Catch-all redirects to home

**Base Path**: `/UDLAP_Robotics` (GitHub Pages subdirectory)

**URL Structure**:
- Home: `https://cesar-martinez-torres.github.io/UDLAP_Robotics/`
- Project: `https://cesar-martinez-torres.github.io/UDLAP_Robotics/docs/tutorial-pick-and-place-ursim`
- Section: `https://cesar-martinez-torres.github.io/UDLAP_Robotics/docs/tutorial-pick-and-place-ursim#installation`

**Implementation**:
- React Router v7
- Client-side routing (no page reloads)
- Browser history API

### 6. Loading States

**Implementation**:
- Full-screen spinner during initial load
- "Loading..." text in sidebar during project fetch
- No skeleton screens or progressive loading

**Component**: `Loading.tsx`
- Centered spinner
- "Loading..." text
- Covers entire viewport

### 7. 404 Handling

**GitHub Pages SPA Routing**:
- GitHub Pages doesn't support client-side routing by default
- Custom 404.html redirects to index.html
- React Router handles actual routing

**Implementation**:
```html
<!-- public/404.html -->
<meta http-equiv="refresh" content="0; url=/UDLAP_Robotics/" />
```

**Build Process**:
- `scripts/add-404.js` copies 404.html to build directory
- Runs during deployment

## User Workflows

### Workflow 1: View Project Documentation

1. User navigates to site
2. Home page loads with main README
3. User clicks project in sidebar
4. Project page loads with full documentation
5. User can scroll or click section links
6. User can toggle dark/light mode

### Workflow 2: Navigate to Specific Section

1. User clicks project in sidebar
2. User clicks chevron to expand sections
3. User clicks section link
4. Page scrolls to section smoothly
5. URL updates with hash

### Workflow 3: Share Direct Link

1. User copies URL with hash (e.g., `/docs/project#section`)
2. Another user opens link
3. Page loads and scrolls to section automatically

### Workflow 4: Browse Multiple Projects

1. User views project A
2. User clicks project B in sidebar
3. Page updates without reload
4. User can use browser back button
5. Returns to project A

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User Action                          │
│                    (Navigate to page)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Router Component                        │
│                   - Mounts on page load                      │
│                   - Triggers data fetch                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   fetchProjectsContents()                    │
│  1. Fetch /projects directory listing                        │
│  2. For each project:                                        │
│     - Fetch project directory contents                       │
│     - Find README.md file                                    │
│     - Download README.md                                     │
│     - Parse markdown                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   parseMarkdownToChakra()                    │
│  1. Extract title (first # header)                           │
│  2. Extract sections (## headers)                            │
│  3. Convert markdown to JSX with custom renderers            │
│  4. Return structured page object                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Component State                         │
│                   setPages(parsedData)                       │
│                   setLoading(false)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Render UI                            │
│  - Sidebar with project list                                 │
│  - DocPage with content                                      │
│  - Navbar with navigation                                    │
└─────────────────────────────────────────────────────────────┘
```

## Component Interaction Diagram

```
App
├── ChakraProvider (theme)
└── Router
    └── BrowserRouter
        └── Layout
            ├── Sidebar
            │   ├── Fetches projects
            │   ├── Displays project list
            │   └── Handles expand/collapse
            ├── Navbar
            │   ├── Home link
            │   ├── GitHub link
            │   └── Theme toggle
            └── Routes
                ├── Home (/)
                │   ├── Fetches main README
                │   └── Renders DocPage
                └── DocPage (/docs/:id)
                    ├── Receives pages as props
                    ├── Matches route param to page
                    ├── Handles hash navigation
                    └── Renders markdown content
```

## State Management

### Global State
- **Theme**: Managed by Chakra UI (localStorage)
- **No other global state**

### Component State

#### Router.tsx
```tsx
const [pages, setPages] = useState<IPage[]>([]);
const [loading, setLoading] = useState(true);
```

#### Sidebar.tsx
```tsx
const [pages, setPages] = useState<IPage[]>([]);
const [loading, setLoading] = useState(true);
const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
```

#### Home.tsx
```tsx
const [pages, setPages] = useState<IPage[]>([]);
const [loading, setLoading] = useState(true);
```

**Issue**: Duplicate state across components (see issues documentation)

## API Integration

### GitHub Contents API

**Endpoint**: `https://api.github.com/repos/cesar-martinez-torres/UDLAP_Robotics/contents`

**Requests**:
1. `GET /projects` - List project directories
2. `GET /projects/{project-name}` - List project files
3. `GET {download_url}` - Download README.md content
4. `GET /` - List repository root (for main README)

**Response Format**:
```json
{
  "name": "tutorial-Pick_and_Place_URSIM",
  "path": "projects/tutorial-Pick_and_Place_URSIM",
  "type": "dir",
  "url": "https://api.github.com/repos/.../contents/projects/...",
  "download_url": null
}
```

**Rate Limits**:
- Unauthenticated: 60 requests/hour
- Authenticated: 5,000 requests/hour

## Content Structure

### Page Object
```typescript
interface IPage {
  id: string;              // Folder name
  title: string;           // Extracted from markdown
  content: JSX.Element;    // Rendered markdown
  sections: string[];      // Section headers
}
```

### Markdown Format
```markdown
# {Title}

## Section 1
Content...

## Section 2
Content...
```

**Special Syntax**:
- Title wrapped in `{}` for extraction
- H2 headers become navigable sections
- Images with GitHub URLs are transformed

## Performance Characteristics

### Initial Load
1. HTML loads (~2KB)
2. JavaScript bundle loads (~260KB gzipped)
3. React hydrates
4. API calls start (2-10 requests)
5. Content renders

**Total Time**: 2-5 seconds (depending on network and API response)

### Navigation
1. User clicks link
2. React Router updates URL
3. Component re-renders
4. No API calls (data already loaded)

**Total Time**: <100ms (instant)

### Theme Toggle
1. User clicks theme button
2. Chakra UI updates theme
3. All components re-render with new colors
4. Theme saved to localStorage

**Total Time**: <50ms (instant)

## Browser Compatibility

**Supported**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Requirements**:
- ES6 support
- Fetch API
- LocalStorage
- CSS Grid/Flexbox

**Not Tested**:
- Internet Explorer
- Older mobile browsers
- Screen readers (accessibility)

## Deployment Process

1. Developer commits changes to `master` branch
2. Run `yarn deploy` locally
3. Build process:
   - `yarn build` - Create production build
   - `node scripts/add-404.js` - Copy 404.html
   - `gh-pages -d build` - Deploy to gh-pages branch
4. GitHub Pages serves from `gh-pages` branch
5. Site updates within 1-2 minutes

**Manual Steps Required**:
- Local build and deploy
- No CI/CD pipeline
- No automated testing

## Limitations

1. **No Offline Support**: Requires internet connection
2. **No Search**: No search functionality for content
3. **No Pagination**: All projects loaded at once
4. **No Filtering**: Can't filter projects by category/tag
5. **No Comments**: No discussion or feedback mechanism
6. **No Analytics**: No usage tracking
7. **No Versioning**: No version history for documentation
8. **No Multi-language**: Only Spanish content
9. **No Print Styles**: Not optimized for printing
10. **No Export**: Can't export documentation to PDF
