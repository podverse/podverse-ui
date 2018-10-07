const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('ts-loader'),
      require.resolve('react-docgen-typescript-loader')
    ]
  })
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loader: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  })
  defaultConfig.resolve.extensions.push('.ts', '.tsx')
  defaultConfig.resolve.alias = {
    scss: path.resolve(__dirname, '../src/scss'),
    storybook: path.resolve(__dirname, '../src/storybook')
  }
  return defaultConfig
}
