const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

async function prepareHostinger() {
    const rootDir = __dirname;
    const standaloneDir = path.join(rootDir, '.next', 'standalone');
    const zipPath = path.join(rootDir, 'hostinger_deploy.zip');

    console.log('🚀 Starting Hostinger deployment preparation...');

    // 1. Build the project
    try {
        console.log('📦 Building project...');
        execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }

    // 2. Check if standalone exists
    if (!fs.existsSync(standaloneDir)) {
        console.error('❌ Standalone directory not found. Ensure "output: \'standalone\'" is in next.config.mjs');
        process.exit(1);
    }

    // 3. Copy public and static files (Next.js doesn't do this automatically for standalone)
    console.log('📂 Copying static assets...');
    const publicSource = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');
    const staticSource = path.join(rootDir, '.next', 'static');
    const staticDest = path.join(standaloneDir, '.next', 'static');

    if (fs.existsSync(publicSource)) {
        copyRecursiveSync(publicSource, publicDest);
    }
    
    if (fs.existsSync(staticSource)) {
        copyRecursiveSync(staticSource, staticDest);
    }

    // 4. Create zip
    console.log('🤐 Zipping files...');
    await zipRootFiles(rootDir, standaloneDir, zipPath);

    console.log(`✅ Success! Your deployment file is ready: ${zipPath}`);
    console.log('\n📝 Instructions for Hostinger:');
    console.log('------------------------------');
    console.log('1. Upload hostinger_deploy.zip to your Hostinger File Manager.');
    console.log('2. Extract it to your domain root (public_html/your-folder).');
    console.log('3. In Hostinger Panel, go to "Node.js" application.');
    console.log('4. Create a new Node.js app:');
    console.log('   - Application Root: path to your extracted files');
    console.log('   - Startup File: server.js');
    console.log('5. Click "Start".');
    console.log('6. Setup env variables in Hostinger (DATABASE_URL, etc.) if needed.');
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function zipRootFiles(rootDir, standaloneDir, outPath) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive.on('error', err => reject(err));
        stream.on('close', () => resolve());
        archive.pipe(stream);

        // Add the standalone output
        archive.directory(standaloneDir, false);

        // Add prisma folder if exists for migrations
        const prismaPath = path.join(rootDir, 'prisma');
        if (fs.existsSync(prismaPath)) {
            archive.directory(prismaPath, 'prisma');
        }

        // Add package.json (some Hostinger setups like it at root)
        // archive.file(path.join(rootDir, 'package.json'), { name: 'package.json' });

        archive.finalize();
    });
}

prepareHostinger().catch(console.error);
