const {withAndroidManifest} = require("@expo/config-plugins")


const attrs = {
    "resizeable": false,
    "smallScreens": false,
    "normalScreens": true,
    "largeScreens": true,
    "xlargeScreens": false,
    "anyDensity": true,
    "requiresSmallestWidthDp": 320,
    "compatibleWidthLimitDp": 480,
    "largestWidthLimitDp": 575,
}

function namespacedAttributes(attributes) {
    let namespacedObj = {}

    for (const [key, value] of Object.entries(attributes)) {
        namespacedObj[`android:${key}`] = value
    }

    return namespacedObj
}

function addSupportsScreens(androidManifest) {
    const {manifest} = androidManifest

    manifest["supports-screens"] = [
        {
            $: namespacedAttributes(attrs),
        },
    ]

    return androidManifest
}

module.exports = function withAndroidSupportsScreens(config) {
    return withAndroidManifest(config, (config) => {
        config.modResults = addSupportsScreens(config.modResults)
        return config
    })
}
