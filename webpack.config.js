const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: "development",
    entry: {
        kui: "./src/index.js",
        examples: "./examples/index.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)/,
                use:
                    "url-loader?limit=1000&name=fonts/[name].[ext]&publicPath=../"
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: "url-loader?limit=1000&name=images/[name].[ext]"
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "-",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "vendors"
                },
                kui: {
                    test: /[\\/]src[\\/]/,
                    priority: -20,
                    name: "kui"
                },
                examples: {
                    test: /[\\/]examples[\\/]/,
                    priority: -30,
                    name: "examples"
                }
            }
        },
        runtimeChunk: "single"
    },
    resolve: {
        alias: {
            "kui-react": path.resolve(__dirname, "src")
        }
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebPackPlugin({
            template: "./examples/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 3003,
        host: "localhost"
        //hot: true
    }
};
