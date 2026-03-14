/** @type {import('@babel/core').ConfigFunction} */
module.exports = function babelConfig(api) {
  // eslint-disable-next-line
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [],
  }
}
