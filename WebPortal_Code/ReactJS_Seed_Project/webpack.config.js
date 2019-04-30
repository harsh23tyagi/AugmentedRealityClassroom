var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        app: [
            // 'webpack-dev-server/client?http://cd78f627.ngrok.io',
            // 'webpack/hot/only-dev-server',
            './app/index'
        ],
        vendor: []
    },
    devServer: {

        compress: true,
    
        disableHostCheck: true,   // That solved it
    
     },      
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/public/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'window.jQuery': "jquery",
            'window.$': 'jquery'

        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
        new webpack.DefinePlugin({
            "require.specified": "require.resolve"
        })
    ],
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel"],
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

            },
            {
                // match all .gltf files
                test: /\.(gltf)$/,
                loader: 'gltf-loader-2'
              },
              {
                // here I match only IMAGE and BIN files under the gltf folder
                test: /gltf.*\.(bin|png|jpe?g|gif)$/,
                // or use url-loader if you would like to embed images in the source gltf
                loader: 'file-loader',
                options: {
                  // output folder for bin and image files, configure as needed
                  name: 'gltf/[name].[hash:7].[ext]'
                }
              },
            {
                test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};

module.exports = config;
