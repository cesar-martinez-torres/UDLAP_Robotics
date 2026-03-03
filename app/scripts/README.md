# Scripts

Utility scripts for project maintenance.

## normalize-filenames.js

Normalizes all source file names to kebab-case convention.

### Usage

**Preview changes (dry-run):**
```bash
node scripts/normalize-filenames.js --dry-run
```

**Apply changes:**
```bash
node scripts/normalize-filenames.js
```

**Or use npm scripts:**
```bash
npm run normalize:preview
npm run normalize:apply
```

### What it does

1. Scans all `.ts`, `.tsx`, `.js`, `.jsx` files in `src/`
2. Converts filenames to kebab-case (e.g., `DocPage.tsx` → `doc-page.tsx`)
3. Updates all import statements to match new filenames
4. Skips `.d.ts` declaration files

### Examples

- `App.tsx` → `app.tsx`
- `DocPage.tsx` → `doc-page.tsx`
- `ProjectsContext.tsx` → `projects-context.tsx`
- `string-helpers.ts` → `string-helpers.ts` (already kebab-case)

### Safety

- Always run with `--dry-run` first to preview changes
- Backs up nothing - commit your changes before running
- Updates imports automatically
