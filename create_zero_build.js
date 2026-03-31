const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

async function createZeroBuildPackage() {
    const rootDir = __dirname;
    const zipPath = path.join(rootDir, 'ZERO_BUILD_HOSTINGER.zip');

    console.log('📦 Creating Zero-Build Package (Skip Hostinger Build)...');

    // 1. Re-build to ensure everything is fresh
    try {
        console.log('🔨 Building locally...');
        execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Build failed locally.');
        return;
    }

    // 2. Setup the standalone folder with public/static assets
    const standaloneDir = path.join(rootDir, '.next', 'standalone');
    const publicSource = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');
    const staticSource = path.join(rootDir, '.next', 'static');
    const staticDest = path.join(standaloneDir, '.next', 'static');

    console.log('📂 Organizing pre-built assets...');
    if (fs.existsSync(publicSource)) copyRecursiveSync(publicSource, publicDest);
    if (fs.existsSync(staticSource)) copyRecursiveSync(staticSource, staticDest);

    // 3. Zip the CONTENTS of the standalone folder (so server.js is at the root)
    console.log('🤐 Zipping for Hostinger...');
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(zipPath);

    return new Promise((resolve, reject) => {
        archive.on('error', err => reject(err));
        output.on('close', () => {
            console.log(`\n✅ DONE! Download: ${zipPath}`);
            resolve();
        });

        archive.pipe(output);

        // Add everything INSIDE standalone to the ROOT of the zip
        archive.directory(standaloneDir, false);

        archive.finalize();
    });
}

function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

createZeroBuildPackage().catch(console.error);
