module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.ts', '.tsx', '.js', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@lib': './src/lib',
            '@graphql': './src/graphql',
            '@navigation': './src/navigation',
            '@assets': './assets',
          },
        },
      ],
      'inline-dotenv',
    ],
  }
}
