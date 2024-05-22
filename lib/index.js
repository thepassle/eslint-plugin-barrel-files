/**
 * @fileoverview linting plugin for barrel files
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(`${__dirname}/rules`);

module.exports.configs = {
  recommended: {
    plugins: ['barrel-files'],
    rules: {
      'barrel-files/avoid-importing-barrel-files': 'error',
      'barrel-files/avoid-barrel-files': 'error',
      'barrel-files/avoid-namespace-import': 'error',
      'barrel-files/avoid-re-export-all': 'error',
    },
  },
};
