# Avoid importing barrel files

## Rule Details

This rule aims to avoid importing barrel files that lead to loading large module graphs. This rule is different from the `avoid-barrel-files` rule, which lints against _authoring_ barrel files. This rule lints against _importing_ barrel files.

Examples of **incorrect** code for this rule:

```js
// If `foo` is a barrel file leading to a module graph of more than 20 modules
export { foo } from 'foo';
```

## Configuration

This rule takes an optional configuration:

```json
{
  "rules": {
    "barrel-files/avoid-importing-barrel-files": [
      2,
      {
        "maxModuleGraphSizeAllowed": 40,
        "amountOfExportsToConsiderModuleAsBarrel": 5,
        "exportConditions": ["node", "import"],
        "mainFields": ["module", "main", "browser"],
        "extensions": [".js", ".ts", ".json", ".node"],
        "tsconfig": {
          "configFile": "./tsconfig.json",
          "references": []
        }
      }
    ]
  }
}
```

### Path Aliases

The rule can accept an `alias` option whose value can be an object that matches Webpack's [resolve.alias](https://webpack.js.org/configuration/resolve/) configuration.

```js
// .eslintrc.cjs
const path = require('path')

module.exports = {
  // ...
  "rules": {
    "barrel-files/avoid-importing-barrel-files": [
      2,
      {
        alias: {
          // "@/foo/bar.js" => "./src/foo/bar.js"
          "@": [path.resolve(".", "src")]
        }
      }
    ]
  }
}
```
