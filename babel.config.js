export default {
  presets: [
    [
      '@babel/env',
      {
        targets: { node: 8 },
        modules: false,
        shippedProposals: true,
      },
    ],
  ],

  env: {
    cjs: {
      plugins: ['babel-plugin-transform-es2015-modules-simple-commonjs'],
    },
  },
}
