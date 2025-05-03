const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('../../app/webapp/build/asset-manifest.json').toString());
console.log(manifest["main.js"])