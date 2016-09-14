'use strict'

const webpack = require('webpack')
const merge   = require('webpack-merge')
const config  = require('./webpack.base')

config.entry.client = 
[
    'webpack-hot-middleware/client',
    config.entry.client
]

module.exports = merge(config, 
{
    output:
    {
        publicPath: '/assets'
    },
    plugins:
    [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'source-map'
})