# Avoid barrel files

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
export { foo } from 'foo';
export { bar } from 'bar';
export { baz } from 'baz';
```

## Configuration

This rule takes an optional configuration:

```json
{
  "rules": {
    "barrel-files/avoid-barrel-files": [
      2,
      {
        "amountOfExportsToConsiderModuleAsBarrel": 5
      }
    ]
  }
}
```
