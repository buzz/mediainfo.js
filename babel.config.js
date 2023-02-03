export default () => {
  const sharedPresets = ['@babel/preset-typescript']

  const shared = {
    ignore: ['./src/cli.ts', './__tests__', './**/*.d.ts'],
    presets: sharedPresets,
    sourceMaps: true,
  }

  return {
    env: {
      ESM_UNBUNDLED: shared,
      ESM_BUNDLED: {
        ...shared,
        presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }], ...sharedPresets],
      },
      CJS: {
        ...shared,
        presets: [
          ['@babel/preset-env', { modules: 'commonjs', targets: { node: 'current' } }],
          ...sharedPresets,
        ],
      },
    },
  }
}
