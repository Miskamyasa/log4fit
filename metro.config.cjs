const {getDefaultConfig} = require("expo/metro-config")

const config = getDefaultConfig(__dirname)

config.transformer.minifierConfig.compress.drop_console = true

config.resetCache = true

module.exports = config
