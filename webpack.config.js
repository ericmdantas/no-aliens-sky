const path = require('path');

module.exports = {
    entry: './client/dev/index.js',
    output: {
        filename: 'bundle.js',
        path: './client/dev/',
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
                loader: 'style!css!'
            },
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    }
}
