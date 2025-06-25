import {resolve} from "node:path"

import {getDefaultConfig} from "expo/metro-config"

const config = getDefaultConfig(resolve("."))

config.transformer.minifierConfig.compress.drop_console = true

config.resetCache = true

export default config
