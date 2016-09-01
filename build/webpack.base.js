'use strict'

const path              = require('path')
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
        path      : path.join(__dirname, '../dist/assets'),
        filename  : '[name].js',
        publicPath: './assets'
    },
    resolve:
    {
        extensions: ['', '.js', '.vue', '.css', '.json'],
    },
    module:
    {
        loaders: 
        [
            {
                test: /\.vue$/,
                loaders: ['vue']
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: [/node_modules/]
            },
            {
                test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query :
                {
                  limit: 10000,
                  name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
            },
            {
                test: /\.sass$/, 
                loader: 'sass-loader'
            }
        ]
    },
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
        postcss
    },
    plugins:
    [
        new HtmlWebpackPlugin
        ({
            title   : 'VuePack',
            template: __dirname + '/index.html',
            filename: '../index.html'
        }),
        new ExtractTextPlugin("[name].css")
    ]
}