/**
 * @fileoverview avoid-namespace-import
 * @author Pascal Schilp
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "avoid-namespace-import",
      category: 'Performance',
      recommended: true,
      url: '../../docs/rules/avoid-namespace-import.md',
    },
  },
  create: context => ({
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    ImportNamespaceSpecifier(node) {
      context.report({
        node,
        message: "Avoid namespace imports, it leads to unused imports and prevents treeshaking.",
      });
    },
  }),
};
