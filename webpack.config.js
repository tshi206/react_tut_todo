let path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'src') + '/app/index.js', // base js file, the root component, the entry point
    output: {
        path: path.resolve(__dirname, 'dist') + '/app', // output dir
        filename: 'bundle.js', // output file name
        publicPath: '/app/' // public url for routing
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};