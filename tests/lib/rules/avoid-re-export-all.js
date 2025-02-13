/**
 * @fileoverview avoid-re-export-all
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/avoid-re-export-all.js';


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  // parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
});
ruleTester.run('avoid-re-export-all', rule, {
  valid: [
    // 'export type { foo } from "foo";',
    // 'export type * as foo from "foo";',
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
