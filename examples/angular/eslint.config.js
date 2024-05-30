import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['dist/*', 'eslint.config.js', 'vite.config.ts'],
  }
)
