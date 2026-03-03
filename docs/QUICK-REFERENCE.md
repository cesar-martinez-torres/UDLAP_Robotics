# Quick Reference Guide

## 🚀 Getting Started

### For New Developers

1. **Read First**: [00-executive-summary.md](./00-executive-summary.md)
2. **Understand Architecture**: [01-architecture.md](./01-architecture.md)
3. **Check Issues**: [04-issues.md](./04-issues.md)
4. **Review Patterns**: [03-patterns.md](./03-patterns.md)

### For Project Managers

1. **Status Overview**: [00-executive-summary.md](./00-executive-summary.md)
2. **Roadmap**: [07-roadmap.md](./07-roadmap.md)
3. **Issues**: [04-issues.md](./04-issues.md)

### For Security Auditors

1. **Security Assessment**: [06-security.md](./06-security.md)
2. **Dependencies**: [02-libraries.md](./02-libraries.md)

## 📋 Common Tasks

### Running the Application

```bash
cd app
yarn install
yarn start
```

### Building for Production

```bash
cd app
yarn build
```

### Deploying

```bash
cd app
yarn deploy
```

### Running Tests

```bash
cd app
yarn test
```

**Note**: No tests currently implemented

## 🔧 Quick Fixes

### Fix 1: Duplicate Data Fetching (2-4 hours)

**Problem**: Data fetched twice on every page load

**Solution**: Create a Context provider

```tsx
// App.tsx
const [projects, setProjects] = useState<IPage[]>([]);

useEffect(() => {
  fetchProjectsContents().then(setProjects);
}, []);

return (
  <ProjectsContext.Provider value={{ projects }}>
    <Router />
  </ProjectsContext.Provider>
);
```

### Fix 2: Parallelize API Calls (1-2 hours)

**Problem**: Sequential API calls slow down page load

**Solution**: Use Promise.all

```tsx
// fetching-helpers.ts
const promises = projects.map(project => 
  fetch(url).then(r => r.json())
);
const results = await Promise.all(promises);
```

### Fix 3: Add Environment Variables (30 minutes)

**Problem**: Hardcoded repository name

**Solution**: Create .env file

```bash
# .env
REACT_APP_GITHUB_OWNER=cesar-martinez-torres
REACT_APP_GITHUB_REPO=UDLAP_Robotics
REACT_APP_GITHUB_TOKEN=
```

### Fix 4: Fix GitHub Link (5 minutes)

**Problem**: Placeholder URL in navbar

**Solution**: Update Navbar.tsx

```tsx
<Link 
  href="https://github.com/cesar-martinez-torres/UDLAP_Robotics"
  isExternal
>
  GitHub
</Link>
```

## 🐛 Common Issues

### Issue: Site stops working

**Cause**: GitHub API rate limit exceeded (60/hour)

**Solution**:
1. Add GitHub token authentication
2. Implement request caching
3. See: [04-issues.md#1-github-api-rate-limiting](./04-issues.md#1-github-api-rate-limiting)

### Issue: Slow page load

**Causes**:
1. Sequential API calls
2. Duplicate data fetching
3. No caching

**Solutions**:
1. Parallelize requests with Promise.all
2. Lift state up to avoid duplicate fetching
3. Implement localStorage caching

### Issue: Content not updating

**Cause**: Browser cache or GitHub API cache

**Solutions**:
1. Hard refresh (Ctrl+Shift+R)
2. Clear localStorage
3. Wait for GitHub API cache to expire (~5 minutes)

### Issue: Build fails

**Common Causes**:
1. TypeScript errors
2. Missing dependencies
3. Node version mismatch

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install

# Check Node version (should be 16+)
node --version

# Fix TypeScript errors
yarn build --verbose
```

## 📁 File Locations

### Key Files

| File | Purpose | Location |
|------|---------|----------|
| Main App | Root component | `app/src/App.tsx` |
| Router | Routing config | `app/src/router/Router.tsx` |
| Fetching | API calls | `app/src/helpers/fetching-helpers.ts` |
| Parser | Markdown parsing | `app/src/helpers/md-jsx-parser.tsx` |
| Constants | Configuration | `app/src/helpers/constant-helpers.ts` |
| Package | Dependencies | `app/package.json` |
| TypeScript | TS config | `app/tsconfig.json` |

### Component Locations

| Component | Location |
|-----------|----------|
| Layout | `app/src/components/elements/Layout/` |
| Navbar | `app/src/components/elements/Navbar/` |
| Sidebar | `app/src/components/elements/Sidebar/` |
| DocPage | `app/src/components/elements/DocPage/` |
| Loading | `app/src/components/elements/Loading/` |
| Home | `app/src/router/pages/Home/` |

## 🔍 Finding Things

### Find all TypeScript files
```bash
find app/src -name "*.tsx" -o -name "*.ts"
```

### Find all components
```bash
find app/src/components -type f -name "*.tsx"
```

### Search for specific code
```bash
grep -r "fetchProjectsContents" app/src/
```

### Find TODO comments
```bash
grep -r "TODO\|FIXME" app/src/
```

## 🧪 Testing

### Run Tests
```bash
cd app
yarn test
```

### Run Tests in Watch Mode
```bash
cd app
yarn test --watch
```

### Check Coverage
```bash
cd app
yarn test --coverage
```

**Note**: No tests currently implemented. See [07-roadmap.md#15-implement-testing](./07-roadmap.md#15-implement-testing)

## 🔒 Security

### Check Dependencies
```bash
cd app
yarn audit
```

### Fix Vulnerabilities
```bash
cd app
yarn audit fix
```

### Update Dependencies
```bash
cd app
yarn upgrade-interactive
```

## 📊 Performance

### Analyze Bundle Size
```bash
cd app
yarn build
npx source-map-explorer 'build/static/js/*.js'
```

### Check Lighthouse Score
1. Open site in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Run audit

## 🌐 URLs

### Development
- Local: http://localhost:3000

### Production
- Live Site: https://cesar-martinez-torres.github.io/UDLAP_Robotics/
- Repository: https://github.com/cesar-martinez-torres/UDLAP_Robotics

### API
- GitHub API: https://api.github.com/repos/cesar-martinez-torres/UDLAP_Robotics/contents

## 📞 Contacts

- **Project Lead**: Dr. César Martínez Torres
- **Email**: cesar.martinez@udlap.mx
- **GitHub**: https://github.com/cesar-martinez-torres

## 📚 Documentation Index

| # | Document | Description |
|---|----------|-------------|
| 00 | [Executive Summary](./00-executive-summary.md) | High-level overview and status |
| 01 | [Architecture](./01-architecture.md) | System architecture and design |
| 02 | [Libraries](./02-libraries.md) | Dependencies and versions |
| 03 | [Patterns](./03-patterns.md) | Code patterns and organization |
| 04 | [Issues](./04-issues.md) | Bugs and technical debt |
| 05 | [Functionality](./05-functionality.md) | How the app works |
| 06 | [Security](./06-security.md) | Security assessment |
| 07 | [Roadmap](./07-roadmap.md) | Improvement plan |

## 🎯 Priority Actions

### This Week
- [ ] Fix duplicate data fetching
- [ ] Parallelize API calls
- [ ] Add environment variables
- [ ] Fix GitHub link
- [ ] Run security audit

### This Month
- [ ] Implement error handling
- [ ] Add GitHub authentication
- [ ] Implement caching
- [ ] Add mobile responsiveness

### This Quarter
- [ ] Add comprehensive testing
- [ ] Set up CI/CD
- [ ] Implement code splitting
- [ ] Add search functionality

## 💡 Tips

### Development
- Use React DevTools for debugging
- Check console for errors
- Use TypeScript strict mode
- Follow existing code patterns

### Performance
- Minimize API calls
- Use caching when possible
- Implement code splitting
- Optimize images

### Security
- Never commit tokens
- Use environment variables
- Keep dependencies updated
- Run security audits regularly

### Git Workflow
- Create feature branches
- Write descriptive commit messages
- Test before committing
- Review changes before pushing

## 🆘 Getting Help

1. Check documentation in `/docs`
2. Search issues in GitHub
3. Contact project lead
4. Review code comments
5. Check external documentation (React, Chakra UI, etc.)

## 📝 Notes

- All times are estimates
- Priorities may change based on needs
- Documentation should be updated with code changes
- Security should be reviewed regularly
