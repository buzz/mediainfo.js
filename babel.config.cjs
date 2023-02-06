module.exports = (api) => {
  api.cache(true)

  const browserTarget = '> 0.25%, not dead'
  const nodeTarget = 'node 14.16'

  const buildMixin = {
    ignore: ['./__tests__', './**/*.d.ts'],
    sourceMaps: 'inline',
  }

  return {
    presets: [
      ['@babel/preset-env', { modules: 'commonjs', targets: nodeTarget }],
      '@babel/preset-typescript',
    ],
    ignore: ['./**/*.d.ts'],
    sourceMaps: true,

    env: {
      // ESM build
      ESM: {
        presets: [['@babel/preset-env', { modules: false, targets: nodeTarget }]],
        plugins: [
          // Node.js ESM needs extensions in import statements
          'babel-plugin-add-import-extension',
        ],
        ...buildMixin,
      },

      // CommonJS build
      CJS: {
        presets: [['@babel/preset-env', { modules: 'commonjs', targets: nodeTarget }]],
        plugins: [
          // Node.js CJS needs extensions in require statements
          ['babel-plugin-add-import-extension', { extension: 'cjs' }],
        ],
        ...buildMixin,
      },

      // Bundled esm
      ESM_ROLLUP: {
        presets: [['@babel/preset-env', { targets: browserTarget }]],
        ...buildMixin,
      },
    },
  }
}
