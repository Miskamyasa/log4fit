const fs = require("fs")

const appJson = require("./app.json")
const {version} = require("./package.json")


const ver = version.split(".")

ver[2] = 1 + Number(ver[2])

const newVersion = `${ver[0]}.${ver[1]}.${ver[2]}`

appJson.expo.version = newVersion

appJson.expo.ios.buildNumber = newVersion
appJson.expo.ios.runtimeVersion = newVersion

appJson.expo.android.versionCode += 1


console.info(`
  ────────────────────────
   App Version: ${version}
   Android build: ${appJson.expo.android.versionCode}
  ────────────────────────
`)

fs.writeFile("./app.json", JSON.stringify(json, null, 2), (err) => {
  if (err) {
    throw err
  }
})
