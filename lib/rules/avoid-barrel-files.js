/**
 * @fileoverview avoid-barrel-files
 * @author Pascal Schilp
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: "avoid-barrel-files",
      category: 'Performance',
      recommended: true,
      url: '../../docs/rules/avoid-barrel-files.md',
    },
    schema: [
      {
        amountOfExportsToConsiderModuleAsBarrel: {
          type: 'number',
          description: 'Minimum amount of exports to consider module as barrelfile',
          default: 3,
        },
      },
    ],
  },
  create: context => ({
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    Program(node) {
      const options = (context.options && context.options[0]) || {};
      const amountOfExportsToConsiderModuleAsBarrel = options?.amountOfExportsToConsiderModuleAsBarrel ?? 3;

      let declarations = 0;
      let exports = 0;

      node.body.forEach((n) => {
        if (n.type === 'VariableDeclaration') {
          declarations += n.declarations.length;
        }

        if (
          n.type === 'FunctionDeclaration' ||
          n.type === 'ClassDeclaration' ||
          n.type === 'TSTypeAliasDeclaration' ||
          n.type === 'TSInterfaceDeclaration'
        ) {
          declarations += 1;
        }

        if (n.type === 'ExportNamedDeclaration') {
          exports += n.specifiers.length;
        }

        if (n.type === 'ExportAllDeclaration' && n?.exportKind !== 'type') {
          exports += 1;
        }

        if (n.type === 'ExportDefaultDeclaration') {
          if (
            n.declaration.type === 'FunctionDeclaration' ||
            n.declaration.type === 'CallExpression'
          ) {
            declarations += 1;
          } else if (n.declaration.type === 'ObjectExpression') {
            exports += n.declaration.properties.length;
          } else {
            exports += 1;
          }
        }
      });

      if (
        exports > declarations &&
        exports > amountOfExportsToConsiderModuleAsBarrel
      ) {
        context.report({
          node,
          message: "Avoid barrel files, they slow down performance, and cause large module graphs with modules that go unused.",
        });
      }
    },
  }),
};
