const convertSvgToIco = require('../utils/convertSvgToIco');
const path = require('path');

// Paths are relative to the script location
const SVG_PATH = path.resolve(__dirname, '../../public/images/tn-govt-logo.svg');
const ICO_OUTPUT_PATH = path.resolve(__dirname, '../../public/favicon.ico');

// Generate favicon with multiple sizes
async function generateFavicon() {
  console.log('Generating favicon from SVG...');
  console.log(`Source: ${SVG_PATH}`);
  console.log(`Destination: ${ICO_OUTPUT_PATH}`);
  
  const result = await convertSvgToIco(SVG_PATH, ICO_OUTPUT_PATH);
  
  if (result) {
    console.log('✅ Favicon generation complete!');
  } else {
    console.error('❌ Favicon generation failed.');
  }
}

// Run the function
generateFavicon(); 