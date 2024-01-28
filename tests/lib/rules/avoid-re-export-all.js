/**
 * @fileoverview avoid-re-export-all
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/avoid-re-export-all.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
});
ruleTester.run('avoid-re-export-all', rule, {
  valid: [
    'export { foo } from "foo";',
    'export { foo as bar } from "foo";',
  ],

  invalid: [
    {
      code: 'export * from "foo";',
      errors: [{ message: 'Avoid re-exporting * from a module, it leads to unused imports and prevents treeshaking.' }],
    },
    {
      code: 'export * as foo from "foo";',
      errors: [{ message: 'Avoid re-exporting * from a module, it leads to unused imports and prevents treeshaking.' }],
    },
  ],
});
