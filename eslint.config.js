import eslint from "@eslint/js"
import react from "@eslint-react/eslint-plugin"
import stylistic from "@stylistic/eslint-plugin"
import {flatConfigs as imports} from "eslint-plugin-import-x"
import {configs as reactHooks} from "eslint-plugin-react-hooks"
import unusedImports from "eslint-plugin-unused-imports"
import {config, configs as typescript} from "typescript-eslint"

// eslint-disable-next-line import-x/no-default-export
export default config(
  eslint.configs.recommended,
  typescript.recommended,
  typescript.strictTypeChecked,
  typescript.stylisticTypeChecked,
  imports.recommended,
  imports.typescript,
  imports.react,
  imports["react-native"],
  react.configs["recommended-typescript"],
  reactHooks["recommended-latest"],
  stylistic.configs["disable-legacy"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [],
    plugins: {
      "unused-imports": unusedImports,
      "@stylistic": stylistic,
    },
    settings: {
      "react": {
        version: "detect",
      },
    },
    rules: {
      // Heavy rules with small value
      "@typescript-eslint/no-deprecated": "off",
      "import-x/namespace": "off",
      // unused-imports/no-unused-vars
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      //
      // Strict rules
      "@stylistic/block-spacing": [
        "error",
        "never",
      ],
      "@stylistic/comma-dangle": [
        "error",
        "always-multiline",
      ],
      "@stylistic/indent": [
        "error",
        2,
      ],
      "@stylistic/jsx-closing-bracket-location": [
        "error",
        {
          "nonEmpty": "after-props",
          "selfClosing": "after-props",
        },
      ],
      "@stylistic/jsx-curly-spacing": [
        "error",
        {
          "attributes": {
            "allowMultiline": false,
          },
          "children": true,
          "when": "never",
        },
      ],
      "@stylistic/jsx-first-prop-new-line": [
        "error",
        "multiline-multiprop",
      ],
      "@stylistic/jsx-indent-props": [
        "error",
        2,
      ],
      "@stylistic/jsx-max-props-per-line": [
        "error",
        {
          "maximum": 1,
        },
      ],
      "@stylistic/jsx-sort-props": [
        "error",
        {
          "callbacksLast": true,
          "ignoreCase": true,
          "noSortAlphabetically": false,
          "reservedFirst": true,
          "shorthandFirst": true,
          "shorthandLast": false,
        },
      ],
      "@stylistic/jsx-tag-spacing": [
        "error",
        {
          "afterOpening": "never",
          "beforeClosing": "allow",
          "beforeSelfClosing": "allow",
          "closingSlash": "never",
        },
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
          "return": "parens",
        },
      ],
      "@stylistic/key-spacing": [
        "error",
        {
          "afterColon": true,
          "mode": "strict",
        },
      ],
      "@stylistic/keyword-spacing": [
        "error",
        {
          "after": true,
          "before": true,
        },
      ],
      "@stylistic/linebreak-style": [
        "error",
        "unix",
      ],
      "@stylistic/max-len": [
        "warn",
        {
          "code": 120,
        },
      ],
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 0,
        },
      ],
      "@stylistic/object-curly-newline": [
        "error",
        {
          "consistent": true,
          "multiline": true,
        },
      ],
      "@stylistic/object-curly-spacing": [
        "error",
        "never",
      ],
      "@stylistic/object-property-newline": [
        "error",
        {
          "allowAllPropertiesOnSameLine": true,
        },
      ],
      "@stylistic/operator-linebreak": [
        "error",
        "before",
      ],
      "@stylistic/quotes": [
        "error",
        "double",
        {
          "avoidEscape": true,
        },
      ],
      "@stylistic/semi": [
        "error",
        "never",
      ],
      "@stylistic/space-before-blocks": [
        "error",
        "always",
      ],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/switch-colon-spacing": [
        "error",
        {
          "after": true,
          "before": false,
        },
      ],
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/member-delimiter-style": [
        "error",
        {
          "multilineDetection": "brackets",
          "multiline": {
            "delimiter": "comma",
            "requireLast": true,
          },
          "singleline": {
            "delimiter": "comma",
            "requireLast": false,
          },
          "overrides": {
            "interface": {
              "multiline": {
                "delimiter": "none",
              },
              "singleline": {
                "delimiter": "comma",
              },
            },
          },
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          "allowNumber": true,
          "allowBoolean": false,
          "allowAny": false,
          "allowNullish": false,
          "allowRegExp": false,
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          "checksVoidReturn": {
            "attributes": false,
          },
        },
      ],
      "import-x/newline-after-import": [
        "error",
        {
          "count": 1,
        },
      ],
      "import-x/no-anonymous-default-export": "error",
      "import-x/no-cycle": [
        "error",
        {
          "ignoreExternal": true,
          "maxDepth": 10,
        },
      ],
      "import-x/no-duplicates": "error",
      "import-x/no-useless-path-segments": "error",
      "import-x/no-default-export": "error",
      "import-x/order": [
        "error",
        {
          "alphabetize": {
            "caseInsensitive": true,
            "order": "asc",
          },
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
          ],
          "newlines-between": "always",
          "pathGroups": [
            {
              "group": "external",
              "pattern": "react+(|-native)",
              "position": "before",
            },
          ],
          "pathGroupsExcludedImportTypes": [
            "react",
            "react-native",
          ],
        },
      ],
      "no-console": [
        "warn",
        {
          "allow": [
            "warn",
            "error",
          ],
        },
      ],
      "no-use-before-define": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ],
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {},
  },
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
)
