/**
 * @fileoverview avoid-barrel-files
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/avoid-barrel-files.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
});
ruleTester.run('avoid-barrel-files', rule, {
  valid: [
    {
      code: `
        let foo;
        export { foo };
      `,
    },
    {
      code: `
        let foo, bar;
        export { foo, bar };
      `,
    },
    {
      code: `
        let foo, bar, baz;
        export { foo, bar, baz };
      `,
    },
    {
      code: `
        let foo, bar, baz, qux;
        export { foo, bar, baz, qux };
      `,
    },
    {
      code: `
        let foo, bar, baz, qux, quux;
        export { foo, bar, baz, qux };
      `,
    },
    {
      code: `
        export default function Foo() {
          return 'bar';
        }
      `,
      options: [
        {
          amountOfExportsToConsiderModuleAsBarrel: 0,
        },
      ],
    },
    {
      code: `
        export default function bar() {}
      `,
      options: [
        {
          amountOfExportsToConsiderModuleAsBarrel: 0,
        },
      ],
    },
    {
      code: `
        export default defineFoo({});
      `,
      options: [
        {
          amountOfExportsToConsiderModuleAsBarrel: 0,
        },
      ],
    }
  ],

  invalid: [
    {
      code: `
        import { bar, baz, qux} from 'foo';
        let foo;
        export { foo, bar, baz, qux,  };
      `,
      errors: [{ message: 'Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused.' }],
    },
    {
      code: `
        export * from 'foo';
        export * from 'bar';
        export * from 'baz';
        export * from 'qux';
      `,
      errors: [{ message: 'Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused.' }],
    },
    {
      code: `export { foo, bar, baz } from 'foo';`,
      errors: [{ message: 'Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused.' }],
      options: [
        {
          amountOfExportsToConsiderModuleAsBarrel: 2,
        },
      ],
    },
    {
      code: 'export default { var1, var2, var3, var4 };',
      errors: [{ message: 'Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused.' }],
    },
  ],
});
