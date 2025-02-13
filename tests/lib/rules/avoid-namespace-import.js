/**
 * @fileoverview avoid-namespace-import
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/avoid-namespace-import.js';

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
ruleTester.run('avoid-namespace-import', rule, {
  valid: [
    'import { foo } from "foo";',
    // 'import type { foo } from "foo";',
    // 'import type * as foo from "foo";'
    {
      code: 'import * as foo from "foo";',
      options: [
        {
          allowList: ['foo'],
        },
      ],
    },
  ],

  invalid: [
    {
      code: 'import * as foo from "foo";',
      errors: [{ message: 'Avoid namespace imports, it leads to unused imports and prevents treeshaking.' }],
    },
    {
      code: 'import * as bar from "bar";',
      errors: [{ message: 'Avoid namespace imports, it leads to unused imports and prevents treeshaking.' }],
      options: [
        {
          allowList: ['foo'],
        },
      ],
    },
  ],
});
