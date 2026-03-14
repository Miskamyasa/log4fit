import {createConfig} from "@miskamyasa/eslint-config"

// eslint-disable-next-line import-x/no-default-export
export default createConfig(
  {
    tsconfigRootDir: import.meta.dirname,
  },
  {
    rules: {
      "no-console": ["warn", {
        allow: ["warn", "error"],
      }],
    },
  },
)
