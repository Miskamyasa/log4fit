/** @type {import('@babel/core').ConfigFunction} */
module.exports = function babelConfig(api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [],
  }
}
