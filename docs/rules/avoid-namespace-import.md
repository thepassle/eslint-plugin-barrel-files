# Avoid namespace import

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
import * as foo from 'foo';
```

## Configuration

This rule takes an optional configuration:

```json
{
  "rules": {
    "barrel-files/avoid-namespace-import": [
      2,
      {
        "allowList": ["foo"]
      }
    ]
  }
}
```
