/**
 * @fileoverview avoid-re-export-all
 * @author Pascal Schilp
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "avoid-re-export-all",
      category: 'Performance',
      recommended: true,
      url: '../../docs/rules/avoid-re-export-all.md',
    },
  },
  create: context => ({
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    ExportAllDeclaration(node) {
      if (node?.exportKind !== 'type') {
        context.report({
          node,
          message: "Avoid re-exporting * from a module, it leads to unused imports and prevents treeshaking.",
        });
      }
    },
  }),
};
