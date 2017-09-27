var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        KUI: './src/index.js',
        example: './src/example.js',
        vendors: [
            'classnames',
            'invariant',
            'object.omit',
            'object.pick',
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-transition-group',
            'react-motion',
            'shallowequal'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].min.js',
        library: 'KUI',
        libraryTarget: 'umd',
        publicPath: '../'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader?cacheDirectory=true',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: ['babel-plugin-transform-decorators-legacy']
                    }
                }]
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader-once']
                })
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)/,
                use: 'url-loader?limit=1&name=fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: 'url-loader?limit=1000&name=images/[folder]/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: Infinity,
            filename: 'js/vendors.min.js'
        }),
        new ExtractTextPlugin('css/[name].min.css'),
        new webpack.NamedModulesPlugin()
    ]


};


