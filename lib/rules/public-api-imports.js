/**
 * @fileoverview absolute imports allowed only from public api file (index.ts)
 * @author laygrd
 */
"use strict";
const { isPathRelative } = require('../helpers');
const micromatch = require('micromatch');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    // eslint-disable-next-line eslint-plugin/require-meta-type
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      category: "fsd",
      description: "absolute imports allowed only from public api file (index.ts)",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: { 
            type: 'string'
          },
          testFilesPatterns: { 
            type: 'array'
          }
        }
      }
    ], // Add a schema if the rule has options
    messages: {}, // Add messageId and message
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] || {};

    return {
      ImportDeclaration(node) {
        const value = node.source.value;

        // import from '@/features/Button/Button' --> import from 'features/Button/Button'
        const importSrc = alias ? value.replace(`${alias}/`, '') : value;

        // skipping relative paths like '../ui/Button/Button'
        if (isPathRelative(importSrc)) {
          return;
        }
        
        const segments = importSrc.split('/');

        // "import {...} from 'entities/article'" -> ['entities', 'article'] -> true
        // "import {...} from 'entities/article/ui/articleCard/articleCard'" -> ['entities', 'article', 'ui', 'articleCard', 'articleCard'] -> false
        const isImportNotFromPublicApi = segments.length > 2;

        // "import {...} from 'entities/article/testing'" -> ['entities', 'article', 'testing'] -> true
        // "import {...} from 'entities/article/lib/mockData'" -> ['entities', 'article', 'lib', 'mockData'] -> fasle
        const isImportFromTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

        // check only declared layers from project root
        const layer = segments[0];
        if (!layersToCheck[layer]) {
          return;
        }

        if (isImportNotFromPublicApi && !isImportFromTestingPublicApi) {
          context.report({node: node, message: 'Absolute imports should be only from module`s Public API (index.ts, index.js). '});
        }

        if (isImportFromTestingPublicApi) {
          const currentFilePath = context.getFilename();

          const isCurrentFileTesting = testFilesPatterns.some(
            pattern => micromatch.isMatch( currentFilePath, pattern )
          )

          if (!isCurrentFileTesting) {
            context.report({node: node, message: 'Test data can only be imported into test files via the testing public API (testing.ts, testing.js). '})
          }
        }
      }
    };
  },
};

const layersToCheck = {
  'pages':'pages',
  'widgets':'widgets',
  'features':'features',
  'entities':'entities',
};