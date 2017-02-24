const path = require('path');

module.exports = (env) => {
  return {
    entry: './client/dev/index.js',
    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: '/client/dev'
    },
    resolve: {
      alias: {
          vue: 'vue/dist/vue.js'
      }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
  }
}
