/**
 * @fileoverview absolute imports allowed only from public api file (index.ts)
 * @author laygrd
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' }
});
ruleTester.run("public-api-exports", rule, {
  valid: [
    // index.ts
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\Rating\\ui\\RatingCard\\RatingCard.tsx',
      code: "import { Avatar } from '@/widgets/Avatar'",
      errors: [],
      options: [{ alias: '@' }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\widgets\\ThemeSwitcher\\ui\\ThemeSwitcher\\ThemeSwitcher.tsx',
      code: "import { Button } from '@/shared/Button/ui/Button'",
      errors: [],
      options: [{ alias: '@' }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\widgets\\ThemeSwitcher\\ui\\ThemeSwitcher\\ThemeSwitcher.tsx',
      code: "import { useCallback } from 'react'",
      errors: [],
      options: [{ alias: '@' }]
    },

    // testing.ts
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\article\\services\\getArticle.test.ts',
      code: "import { mockData } from '@/entities/Article/testing'",
      errors: [],
      options: [{ 
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
      }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\shared\\lib\\decorators\\StoreDecorator.tsx',
      code: "import { userReducer } from '@/entities/User/testing'",
      errors: [],
      options: [{ 
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
      }]
    },
  ],

  invalid: [
    // index.ts
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\Rating\\ui\\RatingCard\\RatingCard.tsx',
      code: "import { Avatar } from 'widgets/Avatar/ui/Avatar/Avatar'",
      errors: [{ message: 'Absolute imports should be only from module`s Public API (index.ts, index.js). '}],
      options: [{ alias: '@' }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\widgets\\ThemeSwitcher\\ui\\ThemeSwitcher\\ThemeSwitcher.tsx',
      code: "import { Theme } from '@/entities/Theme/lib/themes'",
      errors: [{ message: 'Absolute imports should be only from module`s Public API (index.ts, index.js). '}],
      options: [{ alias: '@' }]
    },

    // testing.ts
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\Article\\ui\\ArticleCard\\ArticleCard.tsx',
      code: "import { mockData } from '@/entities/Article/testing'",
      errors: [{ message: 'Test data can only be imported into test files via the testing public API (testing.ts, testing.js). '}],
      options: [{ 
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
      }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\Article\\services\\getArticle.test.ts',
      code: "import { mockData } from '@/entities/Article/lib/consts'",
      errors: [{ message: 'Absolute imports should be only from module`s Public API (index.ts, index.js). '}],
      options: [{ 
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
      }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\shared\\lib\\decorators\\StoreDecorator.tsx',
      code: "import { userReducer } from '@/entities/User/testing/reducer.ts'",
      errors: [{ message: 'Absolute imports should be only from module`s Public API (index.ts, index.js). '}],
      options: [{ 
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
      }]
    },
  ],
});
