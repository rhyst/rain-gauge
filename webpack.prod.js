const Merge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const config = require("./webpack.dev");

module.exports = Merge.strategy({plugins: 'replace'})(config, {
    output: {
        filename: "bundle.min.js"
    },
    module: {
        loaders: [
            {
                test: /index\.html$/,
                loader: "string-replace",
                query: {
                    search: "bundle.js",
                    replace: "bundle.min.js"
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new CopyWebpackPlugin([
            { from: "style", to: "style" },
            { from: "index.html", to: "index.html", transform: function(content, path) {
                return content.toString().replace('bundle.js', 'bundle.min.js')
            } },
            { from: "selectedpin.png", to: "selectedpin.png" }
        ])
    ]
});
