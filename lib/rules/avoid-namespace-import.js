/**
 * @fileoverview avoid-namespace-import
 * @author Pascal Schilp
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: "avoid-namespace-import",
      category: 'Performance',
      recommended: true,
      url: '../../docs/rules/avoid-namespace-import.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowList: {
            type: 'array',
            description: 'List of namespace imports to allow',
            default: [],
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: context => {
    const options = (context.options && context.options[0]) || {};
    const allowList = options.allowList ?? [];


    return{
      //----------------------------------------------------------------------
      // Public
      //----------------------------------------------------------------------
      ImportNamespaceSpecifier(node) {
        if (node.parent.importKind !== 'type' && !allowList.includes(node.parent.source.value)) {
          context.report({
            node,
            message: "Avoid namespace imports, it leads to unused imports and prevents treeshaking.",
          });
        }
      },
    }
  },
};
