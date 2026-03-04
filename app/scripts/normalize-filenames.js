#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SRC_DIR = path.join(__dirname, '../src');

// Convert string to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// Check if filename needs normalization
function needsNormalization(filename) {
  const name = path.parse(filename).name;
  const ext = path.parse(filename).ext;
  const kebab = toKebabCase(name);
  return name !== kebab && ext !== '.d.ts';
}

// Get all files recursively
function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Update imports in a file
function updateImports(filePath, renameMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  for (const [oldPath, newPath] of Object.entries(renameMap)) {
    const oldName = path.parse(oldPath).name;
    const newName = path.parse(newPath).name;
    const oldDir = path.dirname(oldPath);
    const parentDirName = path.basename(oldDir);
    
    // Only update imports that reference the actual file, not the parent directory
    // Pattern: './filename' or '../path/filename' but NOT './ParentDir' when file is ParentDir/filename.tsx
    const importPattern = new RegExp(
      `(['"\`])((?:\\.{1,2}/)*(?:[^/]+/)*)${oldName}(['"\`])`,
      'g'
    );
    
    const newContent = content.replace(importPattern, (match, quote1, pathPrefix, quote2) => {
      // If the import path ends with the parent directory name (PascalCase), don't change it
      // This handles cases like: export * from "./Layout" where file is Layout/layout.tsx
      const trimmedPrefix = pathPrefix.replace(/\/$/, '');
      if (trimmedPrefix.endsWith(parentDirName)) {
        return match;
      }
      
      return `${quote1}${pathPrefix}${newName}${quote2}`;
    });
    
    if (newContent !== content) {
      content = newContent;
      updated = true;
    }
  }

  if (updated && !DRY_RUN) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return updated;
}

// Main execution
function main() {
  console.log(DRY_RUN ? '🔍 DRY RUN MODE - No changes will be made\n' : '🚀 NORMALIZING FILENAMES\n');

  const allFiles = getAllFiles(SRC_DIR);
  const renameMap = {};

  // Build rename map
  for (const filePath of allFiles) {
    const filename = path.basename(filePath);
    
    if (needsNormalization(filename)) {
      const dir = path.dirname(filePath);
      const { name, ext } = path.parse(filename);
      const newName = toKebabCase(name) + ext;
      const newPath = path.join(dir, newName);
      
      renameMap[filePath] = newPath;
    }
  }

  if (Object.keys(renameMap).length === 0) {
    console.log('✅ All filenames are already in kebab-case!');
    return;
  }

  // Show files to rename
  console.log('📝 Files to rename:\n');
  for (const [oldPath, newPath] of Object.entries(renameMap)) {
    const oldName = path.basename(oldPath);
    const newName = path.basename(newPath);
    console.log(`  ${oldName} → ${newName}`);
  }

  console.log(`\n📊 Total: ${Object.keys(renameMap).length} files`);
  console.log('\n⚠️  NOTE: This script only renames files, not directories.');
  console.log('   Component directories (Layout/, Navbar/, etc.) will remain PascalCase.');
  console.log('   Only the actual .tsx files inside will be renamed to kebab-case.');

  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to apply changes');
    return;
  }

  // Rename files
  console.log('\n🔄 Renaming files...');
  for (const [oldPath, newPath] of Object.entries(renameMap)) {
    fs.renameSync(oldPath, newPath);
  }

  // Update imports in all files
  console.log('🔄 Updating imports...');
  let updatedCount = 0;
  for (const filePath of allFiles) {
    const actualPath = renameMap[filePath] || filePath;
    if (fs.existsSync(actualPath) && updateImports(actualPath, renameMap)) {
      updatedCount++;
    }
  }

  console.log(`\n✅ Done!`);
  console.log(`   - Renamed: ${Object.keys(renameMap).length} files`);
  console.log(`   - Updated imports in: ${updatedCount} files`);
}

main();
