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
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    checksVoidReturn: {
                        attributes: false,
                    },
                },
            ],
            "unused-imports/no-unused-imports": "error",
            "arrow-body-style": "off",
            "@stylistic/type-annotation-spacing": "error",
            "@stylistic/space-infix-ops": ["error", {int32Hint: false}],
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/max-len": [
                "warn",
                {
                    code: 120,
                },
            ],
            "no-console": [
                "warn",
                {
                    allow: ["warn", "error"],
                },
            ],
            "@stylistic/no-multiple-empty-lines": [
                "error",
                {
                    max: 1,
                    maxEOF: 0,
                },
            ],
            "no-use-before-define": "error",
            "@stylistic/object-curly-spacing": ["error", "never"],
            "@stylistic/operator-linebreak": ["error", "before"],
            "@stylistic/quotes": [
                "error",
                "double",
                {
                    avoidEscape: true,
                },
            ],
            "import/newline-after-import": [
                "error",
                {
                    count: 1,
                },
            ],
            "import/order": [
                "error",
                {
                    "pathGroups": [
                        {
                            pattern: "react+(|-native)",
                            group: "external",
                            position: "before",
                        },
                    ],
                    "pathGroupsExcludedImportTypes": ["react", "react-native"],
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                    ],
                    "newlines-between": "always",
                    "alphabetize": {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            "import/no-cycle": [
                "error",
                {
                    maxDepth: 10,
                    ignoreExternal: true,
                },
            ],
            "import/no-useless-path-segments": "error",
            "import/no-anonymous-default-export": "error",
            "import/no-duplicates": "error",
            "@stylistic/jsx-closing-bracket-location": [
                "error",
                {
                    nonEmpty: "after-props",
                    selfClosing: "after-props",
                },
            ],
            "react/prop-types": "off",
            "@stylistic/jsx-curly-spacing": [
                "error",
                {
                    when: "never",
                    attributes: {
                        allowMultiline: false,
                    },
                    children: true,
                },
            ],
            "@stylistic/jsx-first-prop-new-line": [
                "error",
                "multiline-multiprop",
            ],
            "react-hooks/exhaustive-deps": "error",
            "react/jsx-fragments": ["error", "element"],
            "@stylistic/jsx-max-props-per-line": [
                "error",
                {
                    maximum: 1,
                },
            ],
            "@stylistic/jsx-sort-props": [
                "error",
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    shorthandLast: false,
                    ignoreCase: true,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                },
            ],
            "@stylistic/jsx-tag-spacing": [
                "error",
                {
                    closingSlash: "never",
                    beforeSelfClosing: "allow",
                    afterOpening: "never",
                    beforeClosing: "allow",
                },
            ],
            "@stylistic/jsx-wrap-multilines": [
                "error",
                {
                    declaration: "parens",
                    assignment: "parens",
                    return: "parens",
                    arrow: "parens",
                    condition: "ignore",
                    logical: "ignore",
                    prop: "ignore",
                },
            ],
            "react/react-in-jsx-scope": "off",
            "react-native/no-raw-text": "off",
            "@stylistic/semi": ["error", "never"],
            "@stylistic/block-spacing": ["error", "never"],
            "@stylistic/key-spacing": [
                "error",
                {
                    afterColon: true,
                    mode: "strict",
                },
            ],
            "@stylistic/keyword-spacing": [
                "error",
                {
                    before: true,
                    after: true,
                },
            ],
            "@stylistic/space-before-blocks": ["error", "always"],
            "@stylistic/switch-colon-spacing": [
                "error",
                {
                    after: true,
                    before: false,
                },
            ],
            "@stylistic/object-property-newline": [
                "error",
                {
                    allowAllPropertiesOnSameLine: true,
                },
            ],
            "@stylistic/object-curly-newline": [
                "error",
                {
                    multiline: true,
                    consistent: true,
                },
            ],
            "@stylistic/jsx-indent-props": ["error", 4],
            "@stylistic/indent": ["error", 4],
        },
    },
    {
        files: ["**/*.js"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },
])
