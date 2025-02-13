/**
 * @fileoverview avoid-barrel-files-ts
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from '@typescript-eslint/rule-tester';
import { after } from 'node:test';
import rule from '../../../lib/rules/avoid-barrel-files.js';

RuleTester.afterAll = after;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
});
ruleTester.run('avoid-barrel-files ts', rule, {
  valid: [
    {
      code: `
        type Money = string;
        export type { Money };
      `,
    },
    {
      code: `
        type Money = {
          amount: string;
          currency: string;
        };
        export type { Money };
      `,
    },
    {
      code: `
        interface Money {
          amount: string;
          currency: string;
        };
        type Country = string;
        type State = {
          name: string;
        };
        const newSouthWales = {
          name: "New South Wales"
        };
        export { newSouthWales }
        export type { Money, Country, State };
      `,
    }
  ],

  invalid: [
    {
      code: `
        import { Country } from 'geo';
        type Money = string;
        type State = {
          name: string;
        };
        interface Person { name: string; age: number; }
        export type { Money, Country, Person, State };
      `,
      errors: [{ message: 'Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused.' }],
    }
  ],
});
