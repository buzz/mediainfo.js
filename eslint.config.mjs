import eslintJs from '@eslint/js'
import eslintImport from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPrettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const groupWithTypes = (/** @type {string} */ re) => [re, `${re}.*\\u0000$`]

export default tsEslint.config(
  // plugins

  {
    plugins: {
      import: eslintImport,
      prettier: eslintPrettier,
      'simple-import-sort': eslintSimpleImportSort,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
    },
  },

  // extends

  eslintJs.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  eslintUnicorn.configs['flat/recommended'],

  // base config

  {
    languageOptions: {
      globals: { ...globals.es2021, ...globals.node },
      parserOptions: {
        ...react.configs.recommended.parserOptions,
        ...react.configs['jsx-runtime'].parserOptions,
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...eslintImport.configs.typescript.rules,
      ...eslintPrettier.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

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
      'import/extensions': ['error', 'never', { svg: 'always' }],

      'prettier/prettier': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          // custom groups with type imports last in each group
          // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
          groups: [
            [String.raw`^\u0000`], // side-effects
            groupWithTypes('^node:'), // node modules
            groupWithTypes(String.raw`^@?(?:(?!@(theme|site)\/))\w`), // 3rd party imports
            groupWithTypes(String.raw`^@(site|theme)\/`), // docusaurus paths
            [String.raw`(?<!\u0000)$`], // absolute imports
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
      // Allow destrucuring
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      // Allow `while(true)`, etc.
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],

      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      // Allow `__dirname` as `import.meta.dirname` doesn't seem to work with the docusaurus babel
      // preset
      'unicorn/prefer-module': 'off',
    },
  },

  // Configuration files

  {
    files: ['babel.config.js', 'eslint.config.mjs'],
    extends: [tsEslint.configs.disableTypeChecked],
  },

  // Ignore patterns

  {
    ignores: ['build/*', '.docusaurus/*'],
  }
)
