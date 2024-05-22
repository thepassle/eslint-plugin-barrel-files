/**
 * @fileoverview avoid-barrel-files
 * @author Pascal Schilp
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { readFileSync } = require('fs');
const {
  resolve,
  count_module_graph_size,
  is_barrel_file,
} = require('eslint-barrel-file-utils/index.cjs');

/**
 * @fileoverview Avoid importing barrel files
 * @author Pascal Schilp
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const cache = {};

module.exports = {
  meta: {
    type: 'problem',
    fixable: null,
    docs: {
      description:
        'Avoid importing barrel files',
      recommended: true,
      url: '../../docs/rules/avoid-importing-barrel-files.md',
    },
    schema: [
      {
        maxModuleGraphSizeAllowed: {
          type: 'number',
          description: 'Maximum allowed module graph size',
          default: 20,
        },
      },
      {
        amountOfExportsToConsiderModuleAsBarrel: {
          type: 'number',
          description: 'Amount of exports to consider a module as barrel file',
          default: 3,
        },
      },
      {
        exportConditions: {
          type: 'array',
          description: 'Export conditions to use to resolve bare module specifiers',
          default: [],
          uniqueItems: true,
          items: {
            type: 'string',
          },
        },
      },
      {
        mainFields: {
          type: 'array',
          description: 'Main fields to use to resolve modules',
          default: [],
          uniqueItems: true,
          items: {
            type: 'string',
          },
        },
      },
      {
        extensions: {
          type: 'array',
          description: 'Extensions to use to resolve modules',
          default: [],
          uniqueItems: true,
          items: {
            type: 'string',
          },
        },
      },
    ],
  },
  create(context) {
    const options = (context.options && context.options[0]) || {};
    const maxModuleGraphSizeAllowed = options.maxModuleGraphSizeAllowed ?? 20;
    const amountOfExportsToConsiderModuleAsBarrel = options.amountOfExportsToConsiderModuleAsBarrel ?? 3;
    const exportConditions = options.exportConditions ?? ["node", "import"];
    const mainFields = options.mainFields ?? ["module", "browser", "main"];
    const extensions = options.extensions ?? [".js", ".ts", ".tsx", ".jsx", ".json", ".node"];

    const resolutionOptions = { exportConditions, mainFields, extensions };

    /**
     * @param {string} specifier
     * @returns {boolean}
     */
    const isBareModuleSpecifier = specifier => !!specifier?.replace(/'/g, '')[0].match(/[@a-zA-Z]/g);

    /**
     * @param {number} amount
     * @returns {string}
     */
    const message = (amount) => `The imported module is a barrel file, which leads to importing a module graph of ${amount} modules, which exceeds the maximum allowed size of ${maxModuleGraphSizeAllowed} modules`

    return {
      ImportDeclaration(node) {
        const moduleSpecifier = node.source.value;
        const currentFileName = context.getFilename();

        let resolvedPath;
        try {
          resolvedPath = resolve(currentFileName, moduleSpecifier, resolutionOptions);
        } catch (e) {
          console.error(`Failed to resolve "${moduleSpecifier}" from "${currentFileName}": \n\n${e.stack}`);
          return;
        }

        const fileContent = readFileSync(resolvedPath, 'utf8');
        let isBarrelFile;

        /**
         * Only cache bare module specifiers, as local files can change
         */
        if (isBareModuleSpecifier(moduleSpecifier)) {
          /**
           * The module specifier is not cached yet, so we need to analyze and cache it
           */
          if (!cache[moduleSpecifier]) {
            isBarrelFile = is_barrel_file(fileContent, amountOfExportsToConsiderModuleAsBarrel);
            const moduleGraphSize = isBarrelFile ? count_module_graph_size(resolvedPath, resolutionOptions) : -1;

            cache[moduleSpecifier] = {
              isBarrelFile,
              moduleGraphSize,
            };

            if (moduleGraphSize > maxModuleGraphSizeAllowed) {
              context.report({
                node: node.source,
                message: message(moduleGraphSize)
              });
            }
          } else {
            /**
             * It is a bare module specifier, but cached, so we can use the cached value
             */

            if (cache[moduleSpecifier].moduleGraphSize > maxModuleGraphSizeAllowed) {
              context.report({
                node: node.source,
                message: message(cache[moduleSpecifier].moduleGraphSize)
              });
            }
          }
        } else {
          /**
           * Its not a bare module specifier, but local module, so we need to analyze it
           */
          const isBarrelFile = is_barrel_file(fileContent, amountOfExportsToConsiderModuleAsBarrel);
          const moduleGraphSize = isBarrelFile ? count_module_graph_size(resolvedPath, resolutionOptions) : -1;
          if (moduleGraphSize > maxModuleGraphSizeAllowed) {
            context.report({
              node: node.source,
              message: message(moduleGraphSize)
            });
          }
        }
      },
    };
  },
};
