'use strict'

const path              = require('path')
const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const postcss =
[
    require('autoprefixer')
    ({
        browsers: ['last 2 versions', 'ie > 8']
    })
]

module.exports =
{
    entry:
    {
        client: './client/index.js'
    },
    output:
    {
        path      : path.join(__dirname, '../assets'),
        filename  : '[name].js',
        publicPath: './assets'
    },
    resolve:
    {
        extensions: ['.js', '.vue', '.css', '.json'],
    },
    module:
    {
        loaders:
        [
            {
                test: /\.vue$/,
                use : 'vue-loader'
            },
            {
                test: /\.js$/,
                use : 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query :
                {
                  limit: 10000,
                  name: 'img/[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use : 'url-loader'
            },
            {
                test: /\.css$/,
                use : ExtractTextPlugin.extract({ fallback: 'style-loader', loader: 'css-loader' })
            },
        ]
    },
    plugins:
    [
        new webpack.LoaderOptionsPlugin
        ({
            options:
            {
                babel:
                {
                    babelrc: false,
                    presets:
                    [
                        ['es2015', {modules: false}], 'stage-1'
                    ]
                },
                postcss,
                vue:
                {
                    postcss,
                    loaders:
                    {
                        scss: "vue-style-loader!css-loader!sass-loader"
                    }
                }
            }
        }),
        new HtmlWebpackPlugin
        ({
            title   : 'Tocas UI',
            template: __dirname + '/index.html',
            filename: '../index.html'
        }),
        new HtmlWebpackPlugin
        ({
            title   : 'Tocas UI',
            template: __dirname + '/index.html',
            filename: '../404.html'
        }),
        new HtmlWebpackPlugin
        ({
            title   : 'Tocas UI',
            template: __dirname + '/index.html',
            filename: '../200.html'
        }),
        new ExtractTextPlugin("[name].css")
    ]
}