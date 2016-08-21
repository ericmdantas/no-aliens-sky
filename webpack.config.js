const path = require('path');

module.exports = (env) => {
    return {
        entry: './client/dev/index.js',
        output: {
            filename: 'bundle.js',
            path: './client/dev/',
            publicPath: '/client/dev'
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style!css!'
                },
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /(node_modules)/
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

}
