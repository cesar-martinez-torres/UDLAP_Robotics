# Issues, Bugs, and Technical Debt

## Critical Issues

### 1. GitHub API Rate Limiting
**Severity**: 🔴 Critical
**Impact**: Site stops working when rate limit exceeded

**Problem**:
- Unauthenticated GitHub API requests: 60/hour per IP
- Multiple API calls per page load
- No authentication implemented
- No caching mechanism

**Symptoms**:
- 403 Forbidden responses from GitHub API
- Empty content on pages
- Silent failures (only console errors)

**Solution**:
```tsx
// Add GitHub token authentication
const headers = {
  'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
};

const response = await fetch(url, { headers });
```

**Additional Recommendations**:
- Implement request caching (localStorage or IndexedDB)
- Add rate limit detection and user feedback
- Consider pre-building content at deploy time

### 2. Duplicate Data Fetching
**Severity**: 🟢 RESOLVED (was 🟠 High)
**Impact**: Performance, unnecessary API calls

**Problem**:
- `Router.tsx` fetches projects data
- `Sidebar.tsx` fetches the same data independently
- Double API calls on every page load

**Resolution** (2026-03-03):
- Created `ProjectsContext` to share data between components
- Single source of truth at app level
- Eliminated duplicate fetching

**Code Locations**:
```tsx
// BEFORE: Router.tsx line ~15
const data = await fetchProjectsContents(colorMode);

// BEFORE: Sidebar.tsx line ~25
const data = await fetchProjectsContents();

// AFTER: ProjectsContext.tsx
// Single fetch shared across all components
```

### 3. No Error Handling UI
**Severity**: 🟠 High
**Impact**: Poor user experience

**Problem**:
- All errors are silently caught and logged to console
- No user feedback when API calls fail
- No retry mechanism
- No error boundaries

**Affected Functions**:
- `fetchProjectsContents()`
- `fetchMainReadme()`
- All component data fetching

**Solution**:
```tsx
const [error, setError] = useState<Error | null>(null);

try {
  const data = await fetchProjectsContents();
  setPages(data);
} catch (e) {
  setError(e as Error);
} finally {
  setLoading(false);
}

if (error) {
  return <ErrorMessage error={error} onRetry={loadPages} />;
}
```

### 4. Sequential API Calls
**Severity**: 🟢 RESOLVED (was 🟠 High)
**Impact**: Slow page load times

**Problem**:
```tsx
// fetching-helpers.ts
for (let i = 0; i < interpretedProjects.length; i++) {
  const projectResponse = await fetch(url);
  // Process each project sequentially
}
```

**Impact**: If there are 10 projects, they load one by one instead of in parallel

**Resolution** (2026-03-03):
```tsx
const projectPromises = interpretedProjects.map(async (project) => {
  const response = await fetch(`${GITHUB_CONTENT_URL}/${project.path}`);
  // Process project
  return processedProject;
});

const projects = await Promise.all(projectPromises);
```

## Code Quality Issues

### 5. Inconsistent Naming Conventions in Source Directories
**Severity**: 🟡 Medium
**Impact**: Maintainability, professionalism, developer experience

**Problem**:
- Source code directories not fully in English
- Inconsistent naming conventions across directories
- Mixed language (Spanish/English)
- Inconsistent use of hyphens vs underscores
- Mixed case (camelCase, snake_case, kebab-case)
- Unexpected characters (parentheses in directory names)

**Examples**:
```
/templates/proyecto/proyecto-nombre_proyecto(Hardware)  ❌
/templates/proyecto/proyecto-nombre_proyecto(sim)      ❌
/templates/Instrucciones/instrucciones                 ❌
/projects/tutorial-Pick_and_Place_URSIM                ❌
```

**Issues**:
- `proyecto` (Spanish) instead of `project` (English)
- `nombre_proyecto` (Spanish placeholder with underscore)
- Parentheses in directory names: `(Hardware)`, `(sim)`
- Mixed separators: hyphens and underscores in same name
- Inconsistent capitalization: `Pick_and_Place_URSIM`
- `Instrucciones` (Spanish) instead of `Instructions` (English)

**Expected Convention**:
```
/templates/project/project-hardware-template          ✅
/templates/project/project-simulation-template        ✅
/templates/instructions/getting-started               ✅
/projects/tutorial-pick-and-place-ursim               ✅
```

**Recommended Naming Convention**:
- **Language**: English only
- **Case**: kebab-case (lowercase with hyphens)
- **Separators**: Hyphens only (no underscores, no parentheses)
- **Descriptive**: Clear, descriptive names
- **Consistent**: Same pattern across all directories

**Impact**:
- Harder to navigate codebase
- Confusing for international contributors
- URL generation issues (special characters)
- Inconsistent user experience
- Professional appearance

**Solution**:
1. Rename all directories to follow consistent convention
2. Update references in code
3. Document naming convention in contribution guidelines
4. Add linting/validation for directory names

**Migration Plan**:
```bash
# Example renames
mv templates/proyecto templates/project
mv templates/Instrucciones templates/instructions
mv templates/proyecto/proyecto-nombre_proyecto\(Hardware\) templates/project/project-hardware-template
mv templates/proyecto/proyecto-nombre_proyecto\(sim\) templates/project/project-simulation-template
mv projects/tutorial-Pick_and_Place_URSIM projects/tutorial-pick-and-place-ursim
```

**Note**: This will require updating:
- GitHub repository structure
- Any hardcoded paths in code
- Documentation references
- Deployment scripts

## Bugs

### 6. Color Mode Dependency Issue
**Severity**: 🟢 RESOLVED (was 🟡 Medium)
**Impact**: Unnecessary re-fetching

**Problem**:
```tsx
// Router.tsx
useEffect(() => {
  const loadPages = async () => {
    const data = await fetchProjectsContents(colorMode);
    setPages(data);
    setLoading(false);
  };
  loadPages();
}, [colorMode]); // Re-fetches when color mode changes
```

**Issue**: Content is re-fetched when user toggles dark/light mode
**Expected**: Only styling should change, not content

**Resolution** (2026-03-03):
- Removed `colorMode` from dependency array
- Data now fetches only once on mount
- Theme changes are instant without re-fetching

### 7. Hardcoded GitHub Repository
**Severity**: 🟡 Medium
**Impact**: Not reusable, difficult to maintain

**Problem**:
```tsx
// constant-helpers.ts
export const GITHUB_CONTENT_URL =
  "https://api.github.com/repos/cesar-martinez-torres/UDLAP_Robotics/contents";
```

**Issue**: Repository name is hardcoded
**Better**: Use environment variables

**Solution**:
```tsx
const GITHUB_OWNER = process.env.REACT_APP_GITHUB_OWNER || 'cesar-martinez-torres';
const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO || 'UDLAP_Robotics';
export const GITHUB_CONTENT_URL = 
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
```

### 7. Hardcoded GitHub Repository
**Severity**: 🟡 Medium
**Impact**: Not reusable, difficult to maintain

**Problem**:
```tsx
// constant-helpers.ts
export const GITHUB_CONTENT_URL =
  "https://api.github.com/repos/cesar-martinez-torres/UDLAP_Robotics/contents";
```

**Issue**: Repository name is hardcoded
**Better**: Use environment variables

**Solution**:
```tsx
const GITHUB_OWNER = process.env.REACT_APP_GITHUB_OWNER || 'cesar-martinez-torres';
const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO || 'UDLAP_Robotics';
export const GITHUB_CONTENT_URL = 
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
```

### 8. Incorrect GitHub Link
**Severity**: 🟡 Medium
**Impact**: Broken navigation

**Problem**:
```tsx
// Navbar.tsx
<Link href="https://github.com/your-repo" isExternal>
  GitHub
</Link>
```

**Issue**: Placeholder URL not replaced with actual repository
**Should be**: `https://github.com/cesar-martinez-torres/UDLAP_Robotics`

### 9. Missing Key Prop Warning
**Severity**: 🟢 Low
**Impact**: React warnings in console

**Problem**: Using `page.id` as key, but `id` is the folder name (e.g., "tutorial-Pick_and_Place_URSIM")
**Issue**: Not a stable unique identifier if folder names change

**Better**: Use index or generate stable IDs

### 10. Image URL Transformation Logic
**Severity**: 🟢 Low
**Impact**: May break with certain URL formats

**Problem**:
```tsx
// md-jsx-parser.tsx
if (imageUrl.includes("github.com")) {
  imageUrl = imageUrl.replace("github.com", "raw.githubusercontent.com");
  imageUrl = imageUrl.replace("/blob/", "/");
}
```

**Issue**: Simple string replacement may fail with complex URLs
**Better**: Use URL parsing and proper path manipulation

### 11. No Loading Skeleton
**Severity**: 🟢 Low
**Impact**: Poor perceived performance

**Problem**: Shows generic spinner instead of content skeleton
**Better**: Show skeleton of expected content layout

## Technical Debt

### 12. No Tests
**Severity**: 🟠 High
**Impact**: No confidence in refactoring, potential regressions

**Status**: Testing libraries installed but no tests written
**Recommendation**: 
- Add unit tests for helpers
- Add integration tests for components
- Add E2E tests for critical flows

### 13. No TypeScript Strict Mode Features
**Severity**: 🟡 Medium
**Impact**: Potential type safety issues

**Current**: Basic TypeScript usage
**Missing**:
- Proper return type annotations
- Exhaustive type checking
- No `any` types (currently using `any` in markdown renderers)

**Example Issues**:
```tsx
// md-jsx-parser.tsx
h1: (props: any) => <Heading {...props} />
```

**Better**:
```tsx
import { Components } from 'react-markdown';

const ChakraRenderer: Components = {
  h1: ({ node, ...props }) => <Heading as="h1" {...props} />
};
```

### 14. No Code Splitting
**Severity**: 🟡 Medium
**Impact**: Larger initial bundle size

**Current**: All code loaded upfront
**Recommendation**: Implement lazy loading

```tsx
const Home = lazy(() => import('./pages/Home'));
const DocPage = lazy(() => import('./components/elements/DocPage'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</Suspense>
```

### 15. Inconsistent File Naming Conventions
**Severity**: 🟢 Low
**Impact**: Code readability

**Issues**:
- File names: `md-jsx-parser.tsx` (kebab-case) vs `DocPage.tsx` (PascalCase)
- Interface names: `IPage` (Hungarian notation) vs modern conventions
- Function names: `fetchProjectsContents` (inconsistent plural)

**Recommendation**: Establish and document naming conventions

### 16. No Environment Configuration
**Severity**: 🟡 Medium
**Impact**: Difficult to configure for different environments

**Missing**:
- `.env` file
- Environment-specific configurations
- Feature flags

**Recommendation**:
```
REACT_APP_GITHUB_TOKEN=
REACT_APP_GITHUB_OWNER=cesar-martinez-torres
REACT_APP_GITHUB_REPO=UDLAP_Robotics
REACT_APP_API_BASE_URL=https://api.github.com
```

### 17. No Logging Strategy
**Severity**: 🟢 Low
**Impact**: Difficult to debug production issues

**Current**: `console.error()` scattered throughout code
**Better**: Centralized logging service

```tsx
// logger.ts
export const logger = {
  error: (message: string, error: Error) => {
    console.error(message, error);
    // Send to error tracking service (Sentry, LogRocket, etc.)
  }
};
```

### 18. No Performance Monitoring
**Severity**: 🟢 Low
**Impact**: No visibility into performance issues

**Installed but unused**: `web-vitals` package
**Recommendation**: Implement Core Web Vitals tracking

### 19. Accessibility Issues
**Severity**: 🟡 Medium
**Impact**: Poor experience for users with disabilities

**Issues**:
- No skip navigation link
- No ARIA labels on icon buttons (some present, not all)
- No focus management on route changes
- No keyboard navigation testing

**Good**: Chakra UI provides accessible components by default

### 20. No Mobile Responsiveness
**Severity**: 🟡 Medium
**Impact**: Poor mobile experience

**Issues**:
- Fixed sidebar width (w="64")
- No mobile menu
- No responsive breakpoints
- Sidebar always visible (should collapse on mobile)

**Recommendation**:
```tsx
<Box
  w={{ base: "full", md: "64" }}
  display={{ base: "none", md: "block" }}
>
```

### 21. Markdown Parser Limitations
**Severity**: 🟢 Low
**Impact**: Limited markdown features

**Missing Support**:
- Code blocks with syntax highlighting
- Tables
- Task lists
- Footnotes
- Math equations

**Recommendation**: Add `remark-gfm` plugin for GitHub Flavored Markdown

## Security Issues

### 22. No Content Security Policy
**Severity**: 🟡 Medium
**Impact**: Potential XSS vulnerabilities

**Recommendation**: Add CSP headers in `public/index.html`

### 23. External Content Loading
**Severity**: 🟡 Medium
**Impact**: Potential security risk

**Issue**: Loading markdown content from GitHub without sanitization
**Mitigation**: `react-markdown` sanitizes by default, but should be verified

### 24. No HTTPS Enforcement
**Severity**: 🟢 Low
**Impact**: Potential MITM attacks

**Status**: GitHub Pages enforces HTTPS by default
**Recommendation**: Ensure all API calls use HTTPS

## Performance Issues

### 25. No Request Caching
**Severity**: 🟠 High
**Impact**: Slow page loads, wasted bandwidth

**Recommendation**:
- Implement localStorage caching
- Add cache invalidation strategy
- Use service worker for offline support

### 26. No Image Optimization
**Severity**: 🟡 Medium
**Impact**: Slow image loading

**Issues**:
- No lazy loading for images
- No responsive images
- No image compression

### 27. No Bundle Optimization
**Severity**: 🟡 Medium
**Impact**: Larger bundle size

**Recommendations**:
- Analyze bundle with `source-map-explorer`
- Remove unused dependencies
- Implement tree shaking
- Use dynamic imports

## Priority Matrix

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| P0 | GitHub API Rate Limiting | Medium | Critical |
| P0 | Duplicate Data Fetching | Low | High |
| P1 | No Error Handling UI | Medium | High |
| P1 | Sequential API Calls | Low | High |
| P1 | No Tests | High | High |
| P2 | Color Mode Dependency | Low | Medium |
| P2 | No Mobile Responsiveness | Medium | Medium |
| P2 | Hardcoded Repository | Low | Medium |
| P2 | Inconsistent Directory Naming | Low | Medium |
| P3 | Incorrect GitHub Link | Low | Low |
| P3 | No Code Splitting | Medium | Medium |

## Quick Wins (Low Effort, High Impact)

1. Fix duplicate data fetching (lift state up)
2. Fix sequential API calls (use Promise.all)
3. Fix incorrect GitHub link
4. Remove colorMode from useEffect dependency
5. Add environment variables for configuration
