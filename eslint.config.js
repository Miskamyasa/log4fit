import {resolve} from "node:path"

import {fixupConfigRules, fixupPluginRules} from "@eslint/compat"
import {FlatCompat} from "@eslint/eslintrc"
import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import {defineConfig} from "eslint/config"
import importPlugin from "eslint-plugin-import"
import importNewlines from "eslint-plugin-import-newlines"
import sortKeysFix from "eslint-plugin-sort-keys-fix"
import unusedImports from "eslint-plugin-unused-imports"

const compat = new FlatCompat({
    baseDirectory: resolve("."),
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default defineConfig([
    js.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ["./tsconfig.json"],
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        extends: fixupConfigRules(
            compat.extends(
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:react-native/all",
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:@stylistic/recommended-extends",
            ),
        ),
        plugins: {
            "@stylistic": fixupPluginRules(stylistic),
            "unused-imports": unusedImports,
            "import-newlines": importNewlines,
            "sort-keys-fix": sortKeysFix,
            "import": importPlugin,
        },
        settings: {
            "import/ignore": ["node_modules/react-native/index\\.js$"],
            "react": {
                version: "detect",
            },
        },
        rules: {
            "@stylistic/block-spacing": [
                "error",
                "never"
            ],
            "@stylistic/comma-dangle": [
                "error",
                "always-multiline"
            ],
            "@stylistic/indent": [
                "error",
                4
            ],
            "@stylistic/jsx-closing-bracket-location": [
                "error",
                {
                    "nonEmpty": "after-props",
                    "selfClosing": "after-props"
                }
            ],
            "@stylistic/jsx-curly-spacing": [
                "error",
                {
                    "attributes": {
                        "allowMultiline": false
                    },
                    "children": true,
                    "when": "never"
                }
            ],
            "@stylistic/jsx-first-prop-new-line": [
                "error",
                "multiline-multiprop"
            ],
            "@stylistic/jsx-indent-props": [
                "error",
                4
            ],
            "@stylistic/jsx-max-props-per-line": [
                "error",
                {
                    "maximum": 1
                }
            ],
            "@stylistic/jsx-sort-props": [
                "error",
                {
                    "callbacksLast": true,
                    "ignoreCase": true,
                    "noSortAlphabetically": false,
                    "reservedFirst": true,
                    "shorthandFirst": true,
                    "shorthandLast": false
                }
            ],
            "@stylistic/jsx-tag-spacing": [
                "error",
                {
                    "afterOpening": "never",
                    "beforeClosing": "allow",
                    "beforeSelfClosing": "allow",
                    "closingSlash": "never"
                }
            ],
            "@stylistic/jsx-wrap-multilines": [
                "error",
                {
                    "arrow": "parens",
                    "assignment": "parens",
                    "condition": "ignore",
                    "declaration": "parens",
                    "logical": "ignore",
                    "prop": "ignore",
                    "return": "parens"
                }
            ],
            "@stylistic/key-spacing": [
                "error",
                {
                    "afterColon": true,
                    "mode": "strict"
                }
            ],
            "@stylistic/keyword-spacing": [
                "error",
                {
                    "after": true,
                    "before": true
                }
            ],
            "@stylistic/linebreak-style": [
                "error",
                "unix"
            ],
            "@stylistic/max-len": [
                "warn",
                {
                    "code": 120
                }
            ],
            "@stylistic/no-multiple-empty-lines": [
                "error",
                {
                    "max": 1,
                    "maxEOF": 0
                }
            ],
            "@stylistic/object-curly-newline": [
                "error",
                {
                    "consistent": true,
                    "multiline": true
                }
            ],
            "@stylistic/object-curly-spacing": [
                "error",
                "never"
            ],
            "@stylistic/object-property-newline": [
                "error",
                {
                    "allowAllPropertiesOnSameLine": true
                }
            ],
            "@stylistic/operator-linebreak": [
                "error",
                "before"
            ],
            "@stylistic/quotes": [
                "error",
                "double",
                {
                    "avoidEscape": true
                }
            ],
            "@stylistic/semi": [
                "error",
                "never"
            ],
            "@stylistic/space-before-blocks": [
                "error",
                "always"
            ],
            "@stylistic/space-infix-ops": "error",
            "@stylistic/switch-colon-spacing": [
                "error",
                {
                    "after": true,
                    "before": false
                }
            ],
            "@stylistic/type-annotation-spacing": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    "checksVoidReturn": {
                        "attributes": false
                    }
                }
            ],
            "@typescript-eslint/no-unused-vars": "error",
            "arrow-body-style": "off",
            "import/newline-after-import": [
                "error",
                {
                    "count": 1
                }
            ],
            "import/no-anonymous-default-export": "error",
            "import/no-cycle": [
                "error",
                {
                    "ignoreExternal": true,
                    "maxDepth": 10
                }
            ],
            "import/no-duplicates": "error",
            "import/no-useless-path-segments": "error",
            "import/order": [
                "error",
                {
                    "alphabetize": {
                        "caseInsensitive": true,
                        "order": "asc"
                    },
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling"
                    ],
                    "newlines-between": "always",
                    "pathGroups": [
                        {
                            "group": "external",
                            "pattern": "react+(|-native)",
                            "position": "before"
                        }
                    ],
                    "pathGroupsExcludedImportTypes": [
                        "react",
                        "react-native"
                    ]
                }
            ],
            "no-console": [
                "warn",
                {
                    "allow": [
                        "warn",
                        "error"
                    ]
                }
            ],
            "no-use-before-define": "error",
            "react-hooks/exhaustive-deps": "error",
            "react-native/no-unused-styles": "error",
            "react-native/no-raw-text": "off",
            "react/jsx-fragments": [
                "error",
                "element"
            ],
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "unused-imports/no-unused-imports": "error"
        },
    },
    {
        files: ["**/*.js", "**/*.cjs"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
        },
        globals: {
            require: "readonly",
            module: "readonly",
        },
    },
])
