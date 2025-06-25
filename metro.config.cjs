const {resolve} = require("node:path")

const {getDefaultConfig} = require("expo/metro-config")

const config = getDefaultConfig(resolve("."))

config.transformer.minifierConfig.compress.drop_console = true

config.resetCache = true

module.exports = config
