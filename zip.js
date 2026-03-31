const fs = require('fs');
const path = require('path');

// Ensure archiver is installed
try {
  require.resolve('archiver');
} catch (e) {
  console.error("Archiver not found. Please install it with 'npm install archiver'");
  process.exit(1);
}

const archiver = require('archiver');
const output = fs.createWriteStream(path.join(__dirname, 'deployment.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Successfully created Unix-compatible deployment.zip (${Math.round(archive.pointer() / 1024 / 1024 * 10) / 10} MB)`);
});

archive.on('error', (err) => { throw err; });
archive.pipe(output);

// Match everything except heavy/dev directories
archive.glob('**/*', {
  dot: true,
  ignore: ['node_modules/**', '.git/**', 'deployment.zip', 'zip_project.ps1', 'zip.js']
}, { 
  // Force Unix permissions: 0755 (read-write-execute for owner, read-execute for others)
  // This bypasses any restrictive Windows ACLs when unpacked on a Linux Hostinger server
  mode: 0o755 
});

archive.finalize();
