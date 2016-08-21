const path = require('path');

module.exports = (env) => {
    return {
        devtools: 'source-map',
        entry: './client/dev/index.js',
        output: {
            filaname: 'bundle.js',
            filepath: 'client/dev/',
            publicPath: 'client/dev/'
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
                }
            ]
        }
    }

}
