/* eslint-disable @typescript-eslint/explicit-function-return-type */

const fs = require("fs")

const json = require("./app.json")
const pj = require("./package.json")


const ver = json.expo.version.split(".")

ver[2] = 1 + Number(ver[2])

const newVersion = `${ver[0]}.${ver[1]}.${ver[2]}`

json.expo.version = newVersion

json.expo.ios.buildNumber = newVersion
json.expo.ios.runtimeVersion = newVersion

json.expo.android.versionCode += 1


console.info(`
  ────────────────────────
   App Version: ${newVersion}
   Android build: ${json.expo.android.versionCode}
  ────────────────────────
`)


function onErr(err) {
  if (err) {
    throw err
  }
}

function toString(obj) {
  return JSON.stringify(obj, null, 2)
}


fs.writeFile("./package.json", toString({...pj, version: newVersion}), onErr)

fs.writeFile("./app.json", toString(json), onErr)
