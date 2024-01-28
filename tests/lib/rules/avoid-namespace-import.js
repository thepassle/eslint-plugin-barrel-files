/**
 * @fileoverview avoid-namespace-import
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/avoid-namespace-import.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
});
ruleTester.run('avoid-namespace-import', rule, {
  valid: [
    'import { foo } from "foo";',
  ],

  invalid: [
    {
      code: 'import * as foo from "foo";',
      errors: [{ message: 'Avoid namespace imports, it leads to unused imports and prevents treeshaking.' }],
    },
  ],
});
