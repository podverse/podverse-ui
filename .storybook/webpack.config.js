const path = require('path')

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('ts-loader'),
      require.resolve('react-docgen-typescript-loader')
    ]
  })
  defaultConfig.resolve.extensions.push('.ts', '.tsx')
  return defaultConfig
}
