# eslint-plugin-laygrd-plugin

some usefull fsd violation checkers

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-laygrd-plugin`:

```sh
npm install eslint-plugin-laygrd-plugin --save-dev
```

## Usage

Add `laygrd-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "laygrd-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "laygrd-plugin/fsd-relative-path": ['error,
            {
                alias: '@',
            }
        ],
        "laygrd-plugin/public-api-imports": ['error, 
            {
                alias: '@',
                testFilesPatterns: ['**/\*.test.*', '**/\*.stories.*', '**/StoreDecorator.tsx'],
            }
        ]
    }
}
```

## Supported Rules

* Fill in provided rules here


