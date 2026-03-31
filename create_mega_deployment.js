const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

async function createMegaPackage() {
    const rootDir = __dirname;
    const zipPath = path.join(rootDir, 'mega_deploy_hostinger.zip');

    console.log('🚀 Starting MEGA Deployment Preparation (Build + All Files)...');

    // 1. Build the project locally so Hostinger doesn't have to
    try {
        console.log('📦 Running LOCAL Production Build...');
        execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Build failed locally:', error);
        return;
    }

    // 2. Prepare Standalone assets (Next.js needs public/static handled separately)
    console.log('📂 Organizing production assets...');
    const standaloneDir = path.join(rootDir, '.next', 'standalone');
    const publicSource = path.join(rootDir, 'public');
    const publicDest = path.join(rootDir, '.next', 'standalone', 'public');
    const staticSource = path.join(rootDir, '.next', 'static');
    const staticDest = path.join(rootDir, '.next', 'standalone', '.next', 'static');

    if (fs.existsSync(publicSource)) {
        copyRecursiveSync(publicSource, publicDest);
    }
    if (fs.existsSync(staticSource)) {
        copyRecursiveSync(staticSource, staticDest);
    }

    // 3. Create zip of EVERYTHING except node_modules and .git (to keep it clean but full)
    console.log('🤐 Zipping Mega Package...');
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(zipPath);

    return new Promise((resolve, reject) => {
        archive.on('error', err => reject(err));
        output.on('close', () => {
            console.log(`\n✅ SUCCESS! Mega Package created: ${zipPath}`);
            console.log(`📊 Size: ${Math.round(archive.pointer() / 1024 / 1024)} MB`);
            resolve();
        });

        archive.pipe(output);

        // Include EVERYTHING except what we don't need
        archive.glob('**/*', {
            dot: true,
            ignore: [
                'node_modules/**', 
                '.git/**', 
                'mega_deploy_hostinger.zip', 
                'hostinger_deploy.zip',
                'hsc-led-project.zip'
            ]
        });

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

createMegaPackage().catch(console.error);
