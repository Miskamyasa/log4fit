/* eslint-disable */
const fs = require("fs");
const json = require("./app.json");

let version = json.expo.version;

const ver = version.split(".");

ver[2] = 1 + Number(ver[2]);

version = `${ver[0]}.${ver[1]}.${ver[2]}`;

json.expo.version = version;
json.expo.ios.buildNumber = version;
json.expo.android.versionCode += 1;


// eslint-disable-next-line no-console
console.log(`
  ─────────────────────
   App Version: ${version}          
   Android build: ${json.expo.android.versionCode}         
  ─────────────────────
`);

fs.writeFile("./app.json", JSON.stringify(json, null, 2), (err) => {
  if (err) {
    throw err;
  }
});
