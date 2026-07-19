const { Jimp } = require('jimp');

async function printAscii(url) {
  try {
    const image = await Jimp.read(url);
    image.resize({ w: 40, h: 20 });
    let ascii = '';
    const chars = ' .:-=+*#%@';
    
    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const hex = image.getPixelColor(x, y);
        const r = (hex >> 24) & 255;
        const g = (hex >> 16) & 255;
        const b = (hex >> 8) & 255;
        const brightness = (r + g + b) / 3;
        const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
        ascii += chars[charIndex];
      }
      ascii += '\n';
    }
    console.log(ascii);
  } catch (err) {
    console.error('Error:', err);
  }
}

(async () => {
  console.log("Screenshot Image:");
  await printAscii("img-screenshot.png");
})();
