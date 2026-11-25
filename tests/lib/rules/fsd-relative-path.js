/**
 * @fileoverview check relative paths inside module 
 * @author laygrd
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/fsd-relative-path"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' }
});
ruleTester.run("fsd-relative-path", rule, {
  valid: [
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\Rating',
      code: "import { RatingCard, RatingCardTheme } from './ui/RatingCard/RatingCard'",
      errors: [],
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\features\\ArticleRating\\ui\\ArticleRating\\ArticleRating',
      code: "import { useArticleRating } from '../../api/articleRatingApi'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\entities\\Rating',
      code: "import { RatingCard, RatingCardTheme } from '@/entities/Rating/ui/RatingCard/RatingCard'",
      errors: [{ message: "Imports within the same module must be relative, according to FSD. " }],
      options: [{ alias: '@' }]
    },
    {
      filename: 'C:\\Users\\Desktop\\Projects\\blog_app\\src\\features\\ArticleRating\\ui\\ArticleRating\\ArticleRating',
      code: "import { useArticleRating } from '@/features/ArticleRating/api/articleRatingApi'",
      errors: [{ message: "Imports within the same module must be relative, according to FSD. " }],
      options: [{ alias: '@' }]
    },
  ],
});
