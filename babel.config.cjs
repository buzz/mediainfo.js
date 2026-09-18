const { extname } = require('node:path')

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

// The CJS build emits `.cjs` files, so relative specifiers have to name them.
// Runs before preset-env's commonjs transform, so only ESM declarations are visible.
// Stands in for babel-plugin-add-import-extension, which requires @babel/core ^7.
function rewriteToCjs(node) {
  if (!node || !node.value.startsWith('.')) {
    return
  }

  const extension = extname(node.value)
  if (extension === '.js' || extension === '') {
    node.value = `${node.value.slice(0, node.value.length - extension.length)}.cjs`
  }
}

function addCjsExtension() {
  return {
    name: 'add-cjs-extension',
    visitor: {
      'ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration'(path) {
        rewriteToCjs(path.node.source)
      },
    },
  }
}

const babel = (api) => {
  api.cache(true)

  const browserTarget = '> 0.25%, not dead'
  const nodeTarget = { node: '18.0' }

  const buildMixin = {
    ignore: ['./**/*.d.ts'],
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
          addCjsExtension,
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
