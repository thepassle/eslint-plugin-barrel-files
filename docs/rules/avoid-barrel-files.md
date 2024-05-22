# Avoid barrel files

## Rule Details

This rule disallows _authoring_ barrel files in your project.

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
