/** @type {import('@babel/core').ConfigFunction} */
export default function babelConfig(api) {
    api.cache(true)
    return {
        presets: ["babel-preset-expo"],
        plugins: [],
    }
}
