import globals from 'globals'
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{js,ts,tsx}'],
    ...reactJsxRuntime,
    languageOptions: {
      ...reactJsxRuntime.languageOptions,
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    ignores: ['dist/*', 'eslint.config.js'],
  }
)
