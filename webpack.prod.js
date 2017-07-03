const Merge = require('webpack-merge');
const webpack = require("webpack");


const config = require("./webpack.dev");

module.exports = Merge(config, {
    output: {
        filename: "bundle.min.js"
    },
    module : {
        loaders: [{
            test: /index\.html$/,
            loader: 'string-replace',
            query: {
                search: 'bundle.js',
                replace: 'bundle.min.js'
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
});
