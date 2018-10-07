const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('ts-loader'),
      require.resolve('react-docgen-typescript-loader')
    ]
  })
  defaultConfig.resolve.extensions.push('.ts', '.tsx')
  defaultConfig.resolve.alias = {
    storybook: path.resolve(__dirname, '../src/storybook')
  }
  return defaultConfig
}
