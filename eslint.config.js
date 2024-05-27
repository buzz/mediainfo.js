import eslintJs from '@eslint/js'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJest from 'eslint-plugin-jest'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const groupWithTypes = (/** @type {string} */ re) => [re, `${re}.*\\u0000$`]

export default tsEslint.config(
  // plugins

  {
    plugins: {
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
  },

  // extends

  eslintJs.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  eslintPluginUnicorn.configs['flat/recommended'],

  // base config

  {
    languageOptions: {
      globals: globals.es2021,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...eslintPluginImport.configs.typescript.rules,
      ...eslintPluginPrettier.configs.recommended.rules,

      // Enforce all block statements to be wrapped in curly braces
      curly: 'error',

      // disable as we're using @typescript-eslint/no-restricted-imports
      'no-restricted-imports': 'off',

      // TypeScript provides the same checks
      // https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      // Import order setup
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/extensions': ['error', 'ignorePackages'],

      'prettier/prettier': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          // custom groups with type imports last in each group
          // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
          groups: [
            [String.raw`^\u0000`], // side-effects
            groupWithTypes('^node:'), // node modules
            [String.raw`(?<!\u0000)$`], // absolute imports
            groupWithTypes('^#'), // subpath exports
            groupWithTypes(String.raw`^\.`), // relative imports
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Prefer interfaces for type definitions
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      // Consistent use of type imports
      '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
      // Indentation is handled by prettier (https://typescript-eslint.io/rules/indent/)
      '@typescript-eslint/indent': 'off',
      // Allow void as this parameter
      '@typescript-eslint/no-invalid-void-type': ['error', { allowAsThisParameter: true }],
      // Allow number type in template literal strings
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      // Allow `while(true)`, etc.
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],

      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },

  // Node

  {
    files: ['__tests__/**/*.ts', 'gulp/**/*.ts'],
    languageOptions: { globals: globals.node },
    rules: {
      'import/extensions': ['error', { ts: 'always', js: 'never' }],
    },
  },

  // Tests

  {
    files: ['__tests__/**/*.ts'],
    plugins: { jest: eslintPluginJest },
    languageOptions: { globals: globals.node },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },

  // CLI

  {
    files: ['src/cli.ts'],
    languageOptions: { globals: globals.node },
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
    },
  },

  // Configuration files

  {
    files: ['babel.config.cjs', 'eslint.config.js', 'gulpfile.ts', 'rollup.config.js'],
    extends: [tsEslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },

  // Ignore patterns

  {
    ignores: ['build/*', 'dist/*', 'docs/*', 'examples/*'],
  }
)
