const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * Next.js Hostinger Deployment Packager
 * This script will zip your production-ready files for easy upload.
 */
async function packageForHostinger() {
  const output = fs.createWriteStream(path.join(process.cwd(), 'deploy-me.zip'));
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  output.on('close', () => {
    console.log(`\n✅  Deployment package created: deploy-me.zip`);
    console.log(`📏  Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🚀  Instructions: Upload this zip to Hostinger and extract it in your public_html or relevant folder.`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // 1. Add essential production folders
  console.log('📦  Adding .next (Build output)...');
  archive.directory('.next/', '.next');

  console.log('📦  Adding public (Assets)...');
  archive.directory('public/', 'public');

  // 2. Add config files
  console.log('📦  Adding configuration files...');
  const filesToInclude = [
    'package.json',
    'package-lock.json',
    'next.config.ts',
    'next.config.mjs',
    'next.config.js',
    'postcss.config.js',
    'tailwind.config.ts',
    '.env.local'
  ];

  filesToInclude.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      archive.file(file, { name: file });
    }
  });

  // 3. Add node_modules (optional but often needed if not running npm install on server)
  // archive.directory('node_modules/', 'node_modules');

  console.log('🤐  Compressing files...');
  archive.finalize();
}

packageForHostinger();
