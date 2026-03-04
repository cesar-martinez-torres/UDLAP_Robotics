# Design Patterns and Code Organization

## Architectural Patterns

### 1. Component-Based Architecture
**Pattern**: Atomic Design (partial implementation)

```
Components
├── Elements (Atoms/Molecules)
│   ├── Layout
│   ├── Navbar
│   ├── Sidebar
│   ├── DocPage
│   └── Loading
└── Pages (Organisms)
    └── Home
```

**Implementation**:
- Reusable UI components in `components/elements/`
- Page-level components in `router/pages/`
- Each component in its own directory with index.ts barrel export

### 2. Container/Presentational Pattern
**Partial Implementation**:

**Container Components** (Smart):
- `Router.tsx` - Fetches data, manages routing
- `Home.tsx` - Fetches main README
- `Sidebar.tsx` - Fetches and manages project list

**Presentational Components** (Dumb):
- `Layout.tsx` - Pure layout structure
- `Navbar.tsx` - Pure navigation UI
- `Loading.tsx` - Pure loading indicator
- `DocPage.tsx` - Receives data as props (mostly presentational)

**Issue**: Some components mix concerns (e.g., Sidebar fetches its own data)

### 3. Composition Pattern
**Usage**: Layout composition

```tsx
<Layout>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/docs/:id" element={<DocPage />} />
  </Routes>
</Layout>
```

**Benefits**:
- Flexible component nesting
- Reusable layout structure
- Clear component hierarchy

### 4. Render Props Pattern
**Usage**: React Markdown custom renderers

```tsx
<ReactMarkdown components={ChakraRenderer(colorMode)}>
  {content}
</ReactMarkdown>
```

**Implementation**: Custom component mapping for markdown elements

### 5. Custom Hooks Pattern
**Usage**: Chakra UI hooks

```tsx
const { colorMode, toggleColorMode } = useColorMode();
```

**Missing**: No custom hooks implemented for the application

## Code Organization Patterns

### 1. Feature-Based Organization
**Current Structure**:
```
src/
├── components/     # UI components
├── router/         # Routing logic
├── helpers/        # Utility functions
└── shared/         # Shared resources
```

**Evaluation**: Hybrid approach (partially feature-based, partially type-based)

### 2. Barrel Exports
**Pattern**: Index files for clean imports

```tsx
// components/elements/index.tsx
export { Layout } from "./Layout";
export { Navbar } from "./Navbar";
export { Sidebar } from "./Sidebar";
export { DocPage } from "./DocPage";
export { Loading } from "./Loading";
```

**Usage**:
```tsx
import { Layout, DocPage, Loading } from "../components/elements";
```

**Benefits**: Cleaner imports, easier refactoring

### 3. Separation of Concerns

#### Helpers Directory
- `fetching-helpers.ts` - API calls
- `md-jsx-parser.tsx` - Markdown parsing
- `string-helpers.ts` - String utilities
- `constant-helpers.ts` - Constants

**Good**: Clear separation of utility functions
**Issue**: Parser in helpers (should be in services or parsers directory)

#### Interfaces Directory
- `page.interface.ts` - Page data structure
- `github.interface.ts` - GitHub API types

**Good**: Centralized type definitions

## React Patterns

### 1. Functional Components
**Pattern**: All components use function syntax

```tsx
export const Component: React.FC = () => {
  return <div>Content</div>;
};
```

**With Props**:
```tsx
export const Component: React.FC<IProps> = ({ prop }) => {
  return <div>{prop}</div>;
};
```

**Good**: Modern React best practice

### 2. Hooks Usage

#### useState
```tsx
const [pages, setPages] = useState<IPage[]>([]);
const [loading, setLoading] = useState(true);
```

**Usage**: Local component state management

#### useEffect
```tsx
useEffect(() => {
  const loadPages = async () => {
    const data = await fetchProjectsContents();
    setPages(data);
    setLoading(false);
  };
  loadPages();
}, []);
```

**Pattern**: Data fetching on mount
**Issue**: No cleanup, no error handling

#### useParams
```tsx
const { id } = useParams<{ id: string }>();
```

**Usage**: Extract route parameters

#### useLocation
```tsx
const location = useLocation();

useEffect(() => {
  const handleHashChange = () => {
    const sectionId = window.location.hash.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  handleHashChange();
}, [location]);
```

**Usage**: Hash-based navigation for sections

#### useColorMode (Chakra UI)
```tsx
const { colorMode, toggleColorMode } = useColorMode();
```

**Usage**: Theme management

### 3. Conditional Rendering
```tsx
if (loading) {
  return <Loading />;
}

return <Content />;
```

**Pattern**: Early return for loading states

### 4. List Rendering
```tsx
{pages.map((page) => (
  <Box key={page.id}>
    <Link to={`/docs/${toKebabCase(page.title)}`}>
      {page.title}
    </Link>
  </Box>
))}
```

**Good**: Proper key usage
**Issue**: Using title for keys (should use stable IDs)

## Data Fetching Patterns

### 1. Async/Await Pattern
```tsx
const fetchProjectsContents = async (): Promise<IPage[]> => {
  const contents: IPage[] = [];
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Process data
  } catch (e) {
    console.error(e);
  }
  return contents;
};
```

**Good**: Modern async handling
**Issues**:
- Silent error handling (only console.error)
- No error propagation
- No retry logic

### 2. Sequential API Calls
```tsx
for (let i = 0; i < projects.length; i++) {
  const response = await fetch(url);
  // Process each project
}
```

**Issue**: Sequential processing (slow)
**Better**: Use `Promise.all()` for parallel requests

### 3. Data Transformation Pipeline
```
GitHub API → JSON → Markdown String → Parsed JSX → React Components
```

**Flow**:
1. Fetch directory listing
2. Fetch README.md files
3. Parse markdown to JSX
4. Render with Chakra UI components

## Styling Patterns

### 1. CSS-in-JS (Emotion via Chakra UI)
```tsx
<Box
  bg={colorMode === "dark" ? "gray.900" : "white"}
  color={colorMode === "dark" ? "gray.200" : "gray.800"}
  p={6}
>
```

**Pattern**: Inline style props
**Good**: Type-safe, dynamic theming
**Issue**: Verbose, repeated color logic

### 2. Theme Configuration
```tsx
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});
```

**Pattern**: Centralized theme customization
**Limited**: Only color mode configured

### 3. Responsive Design
**Pattern**: Chakra UI responsive props (not actively used)

**Potential**:
```tsx
<Box w={{ base: "100%", md: "50%" }} />
```

**Current**: Fixed layouts, no responsive breakpoints

## Anti-Patterns and Code Smells

### 1. Duplicate Data Fetching
**Issue**: Both `Router.tsx` and `Sidebar.tsx` fetch the same data

```tsx
// Router.tsx
const data = await fetchProjectsContents(colorMode);

// Sidebar.tsx
const data = await fetchProjectsContents();
```

**Impact**: Double API calls, wasted bandwidth
**Solution**: Lift state up or use context/state management

### 2. Prop Drilling
**Current**: Minimal (pages passed to DocPage)
**Potential Issue**: As app grows, may become problematic

### 3. Magic Strings
```tsx
const GITHUB_CONTENT_URL = "https://api.github.com/repos/cesar-martinez-torres/UDLAP_Robotics/contents";
```

**Good**: Constant defined
**Issue**: Hardcoded repository name (not configurable)

### 4. Inconsistent Error Handling
```tsx
try {
  // API call
} catch (e) {
  console.error("fetchProjectsContents:", e);
}
```

**Issues**:
- No user feedback
- No error state
- No retry mechanism
- Silent failures

### 5. Missing Loading States
**Issue**: Sidebar shows "Loading..." but no skeleton or progressive loading

### 6. Tight Coupling
**Issue**: Components directly call GitHub API
**Better**: Abstract data layer (repository pattern)

### 7. No Memoization
**Issue**: No `useMemo` or `useCallback` for expensive operations
**Impact**: Potential unnecessary re-renders

### 8. Inline Functions in JSX
```tsx
onClick={() => toggleSection(page.title)}
```

**Issue**: New function created on every render
**Better**: Use `useCallback` or extract to handler

## Best Practices Followed

1. ✅ TypeScript for type safety
2. ✅ Functional components with hooks
3. ✅ Proper component composition
4. ✅ Barrel exports for clean imports
5. ✅ Separation of concerns (helpers, components, interfaces)
6. ✅ Consistent naming conventions
7. ✅ Proper key usage in lists
8. ✅ Accessibility (Chakra UI components)

## Best Practices Missing

1. ❌ Error boundaries
2. ❌ Custom hooks for reusable logic
3. ❌ Memoization (useMemo, useCallback)
4. ❌ Code splitting / lazy loading
5. ❌ Unit tests
6. ❌ PropTypes or runtime validation
7. ❌ Documentation comments (JSDoc)
8. ❌ Performance monitoring
9. ❌ Logging strategy
10. ❌ Environment configuration

## Recommended Patterns to Implement

### 1. Custom Hooks
```tsx
// useProjects.ts
export const useProjects = () => {
  const [projects, setProjects] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProjectsContents()
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
};
```

### 2. Context for Shared State
```tsx
// ProjectsContext.tsx
const ProjectsContext = createContext<IProjectsContext | null>(null);

export const ProjectsProvider: React.FC = ({ children }) => {
  const { projects, loading, error } = useProjects();
  return (
    <ProjectsContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
};
```

### 3. Error Boundary
```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 4. Repository Pattern
```tsx
// repositories/github.repository.ts
export class GitHubRepository {
  async getProjects(): Promise<IPage[]> {
    // Implementation
  }
  
  async getReadme(): Promise<IPage> {
    // Implementation
  }
}
```
