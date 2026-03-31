const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function createFinalZip() {
  const zipName = 'NANO-SIGNS-V1-OPTIMIZED.zip';
  const output = fs.createWriteStream(path.join(process.cwd(), zipName));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`\n🎉  Success! Final Zip Created: ${zipName}`);
    console.log(`📤  Upload this single file to Hostinger for a perfectly optimized site.`);
  });

  archive.on('error', (err) => { throw err; });
  archive.pipe(output);

  // Folders to include for a complete build & run environment
  const folders = ['app', 'components', 'public', 'lib', 'styles', 'hooks', 'prisma', '.next'];
  
  folders.forEach(f => {
    if (fs.existsSync(path.join(process.cwd(), f))) {
       console.log(`📦  Adding ${f}...`);
       archive.directory(f + '/', f);
    }
  });

  // Root files (ignoring existing zips)
  const rootFiles = fs.readdirSync('.');
  rootFiles.forEach(file => {
    const stats = fs.lstatSync(file);
    if (stats.isFile() && !file.endsWith('.zip') && !file.endsWith('.log')) {
       archive.file(file, { name: file });
    }
  });

  console.log('🤐  Compressing optimized project...');
  archive.finalize();
}

createFinalZip();
