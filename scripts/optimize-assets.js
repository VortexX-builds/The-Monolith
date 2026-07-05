import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

async function main() {
  try {
    console.log('Optimizing local assets...');

    // Optimize Logo
    const logoSrc = path.join(__dirname, 'src/assets/logo-removebg.png');
    const logoDest = path.join(__dirname, 'src/assets/logo-removebg.webp');
    if (fs.existsSync(logoSrc)) {
      await sharp(logoSrc)
        .resize(200) // 200px width for 2x retina display of 100px width
        .webp({ quality: 80 })
        .toFile(logoDest);
      console.log(`Logo optimized and saved to: ${logoDest}`);
    } else {
      console.warn(`Logo not found at: ${logoSrc}`);
    }

    // Optimize Noise Tile
    const noiseSrc = path.join(__dirname, 'public/textures/noise-tile.png');
    const noiseDest = path.join(__dirname, 'public/textures/noise-tile.webp');
    if (fs.existsSync(noiseSrc)) {
      await sharp(noiseSrc)
        .webp({ quality: 80 })
        .toFile(noiseDest);
      console.log(`Noise tile optimized and saved to: ${noiseDest}`);
    } else {
      console.warn(`Noise tile not found at: ${noiseSrc}`);
    }

    console.log('Asset optimization complete.');
  } catch (error) {
    console.error('Error optimizing assets:', error);
    process.exit(1);
  }
}

main();
