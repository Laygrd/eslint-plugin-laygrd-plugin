/**
 * @fileoverview check relative paths inside module 
 * @author laygrd
 */
"use strict";

const path = require('path');
const { isPathRelative } = require('../helpers');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    // eslint-disable-next-line eslint-plugin/require-meta-type
    type: null,
    docs: {
      description: "check relative paths inside module ",
      category: "fsd",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: { 
            type: 'string'
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {
        const value = node.source.value;

        // import from 'shared/Button/Button' <--- this path
        const importSrc = alias ? value.replace(`${alias}/`, '') : value;

        // location of file where current import statement is
        const currentFileName = context.getFilename();

        if (shouldPathBeRelative(currentFileName, importSrc)) {
          context.report({node: node, message: 'Imports within the same module must be relative, according to FSD. '});
        }
      }
    };
  },
};

const layers = {
  'pages':'pages',
  'widgets':'widgets',
  'features':'features',
  'entities':'entities',
  'shared':'shared',
};

const shouldPathBeRelative = (curFile, impSrc) => {
  if (isPathRelative(impSrc)) {
    return false;
  }
  
  const inpSrcArray = impSrc.split('/'); // entities/Profile/ui/ProfileCard ->  [entities, Profile, ui, ProfileCard]
  const inpSrcLayer = inpSrcArray[0]; // entities
  const inpSrcSlice = inpSrcArray[1]; // Profile

  if ( !inpSrcLayer || !inpSrcSlice || !layers[inpSrcLayer] ) {
    return false;
  }

  const normalizedPath = curFile.split('src')[1]; // 'C:\Users\rosti\Desktop\projects\blog-app\src\entities\Article\ui\ArticleList' -> \entities\Article\ui\ArticleList
  const projectFileArray = normalizedPath.split(path.sep); // \entities\Article\ui\ArticleList -> [ '', 'entities', 'Article', 'ui', 'ArticleList' ]
  const curFileLayer = projectFileArray[1]; // entities
  const curFileSlice = projectFileArray[2]; // Article

  if ( !curFileLayer || !curFileSlice || !layers[curFileLayer] ) {
    return false;
  }

  return inpSrcLayer === curFileLayer && inpSrcSlice === curFileSlice;
};
