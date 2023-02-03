module.exports = (api) => {
  api.cache(true)

  const browserTarget = '> 0.25%, not dead'
  const nodeTarget = 'node 14.16'

  const buildMixin = {
    ignore: ['./__tests__', './**/*.d.ts'],
    sourceMaps: true,
  }

  return {
    presets: [
      ['@babel/preset-env', { modules: 'commonjs', targets: nodeTarget }],
      '@babel/preset-typescript',
    ],
    ignore: ['./**/*.d.ts'],
    sourceMaps: false,

    env: {
      // ESM build
      ESM: {
        presets: [['@babel/preset-env', { modules: false, targets: nodeTarget }]],
        plugins: [
          'babel-plugin-add-import-extension', // Node.js ESM needs extensions in import statements
        ],
        ...buildMixin,
      },

      // CommonJS build
      CJS: {
        presets: [['@babel/preset-env', { modules: 'commonjs', targets: nodeTarget }]],
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
