const {withAndroidManifest} = require("@expo/config-plugins")

/**
 * @typedef {import('@expo/config-plugins').AndroidManifest} AndroidManifest
 * @typedef {import('@expo/config-plugins').ExpoConfig} ExpoConfig
 * @typedef {import('@expo/config-plugins').ConfigPlugin} ConfigPlugin
 */

/**
 * @typedef {Object} SupportsScreensAttributes
 * @property {boolean} resizeable
 * @property {boolean} smallScreens
 * @property {boolean} normalScreens
 * @property {boolean} largeScreens
 * @property {boolean} xlargeScreens
 * @property {boolean} anyDensity
 * @property {number} requiresSmallestWidthDp
 * @property {number} compatibleWidthLimitDp
 * @property {number} largestWidthLimitDp
 */

/** @type {SupportsScreensAttributes} */
const attrs = {
  resizeable: false,
  smallScreens: false,
  normalScreens: true,
  largeScreens: true,
  xlargeScreens: false,
  anyDensity: true,
  requiresSmallestWidthDp: 375,
  compatibleWidthLimitDp: 480,
  largestWidthLimitDp: 575,
}

/**
 * @param {SupportsScreensAttributes} attributes
 * @returns {Record<string, boolean | number>}
 */
function namespacedAttributes(attributes) {
  /** @type {Record<string, boolean | number>} */
  const namespacedObj = {}
  for (const key of Object.keys(attributes)) {
    const typedKey = /** @type {keyof SupportsScreensAttributes} */ (key)
    namespacedObj[`android:${key}`] = attributes[typedKey]
  }
  return namespacedObj
}

/**
 * @param {AndroidManifest} androidManifest
 * @returns {AndroidManifest}
 */
function addSupportsScreens(androidManifest) {
  const {manifest} = androidManifest
  manifest["supports-screens"] ??= []
  manifest["supports-screens"] = [
    {
      $: namespacedAttributes(attrs),
    },
  ]
  return androidManifest
}

/**
 * @type {ConfigPlugin}
 */
module.exports = function withAndroidSupportsScreens(config) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addSupportsScreens(config.modResults)
    return config
  })
}
