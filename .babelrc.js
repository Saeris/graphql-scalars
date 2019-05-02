module.exports = {
  env: {
    test: {
      sourceMaps: `inline`,
      presets: [
        [
          require(`@babel/preset-env`),
          {
            targets: { node: `8.10` },
            modules: `commonjs`,
            useBuiltIns: `usage`,
            corejs: 3,
          }
        ]
      ]
    }
  }
}
