// babel and "@babel/plugin-transform-unicode-regex" stopped working
// uupdate the file manually
//
// in:  /g, encode
// out: /gu, encode

require('child_process').execSync(
  'sed -i "s/g, encode/gu, encode/" form-urlencoded.dist.js');
