// Babel can't transpile to ES on-the-fly. So, we need to transform `import.meta.dirname` to old `__dirname`.
function transformImportMetaDirname() {
  return {
    visitor: {
      MemberExpression(path) {
        if (path.node.object.type === 'MetaProperty' && path.node.property.name === 'dirname') {
          path.replaceWithSourceString('__dirname')
        }
      },
    },
  }
}

const babel = (api) => {
  api.cache(true)

  const browserTarget = '> 0.25%, not dead'
  const nodeTarget = { node: '20' }

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

      // Bundled ESM
      ESM_ROLLUP: {
        presets: [['@babel/preset-env', { targets: browserTarget }]],
        ...buildMixin,
      },

      // Gulp
      GULP: {
        presets: [['@babel/preset-env', { modules: false, targets: nodeTarget }]],
        plugins: [transformImportMetaDirname],
        sourceMaps: false,
      },
    },
  }
}

module.exports = babel
