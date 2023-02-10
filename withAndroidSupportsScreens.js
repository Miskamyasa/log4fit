const {withAndroidManifest} = require("@expo/config-plugins")


function namespacedAttributes(attributes) {
  let namespacedObj = {}

  for (const [key, value] of Object.entries(attributes)) {
    namespacedObj[`android:${key}`] = value
  }

  return namespacedObj
}

function addSupportsScreens(androidManifest, attributes) {
  const {manifest} = androidManifest

  manifest["supports-screens"] = [
    {
      $: namespacedAttributes(attributes),
    },
  ]

  return androidManifest
}

module.exports = function withAndroidSupportsScreens(config, attributes) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addSupportsScreens(config.modResults, attributes)
    return config
  })
}
