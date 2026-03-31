const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function packageAll() {
  const output = fs.createWriteStream(path.join(process.cwd(), 'hsc-led-project.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`\n✅  Project package created: hsc-led-project.zip`);
    console.log(`🚀  Upload this to Hostinger if you want to run BUILD on their server.`);
  });

  archive.pipe(output);

  // Add all essential folders
  archive.directory('app/', 'app');
  archive.directory('components/', 'components');
  archive.directory('public/', 'public');
  archive.directory('lib/', 'lib');
  archive.directory('styles/', 'styles');
  archive.directory('hooks/', 'hooks');
  archive.directory('prisma/', 'prisma');

  // Add root files
  fs.readdirSync('.').forEach(file => {
    if (fs.lstatSync(file).isFile()) {
       if (!file.endsWith('.zip')) {
         archive.file(file, { name: file });
       }
    }
  });

  archive.finalize();
}

packageAll();
