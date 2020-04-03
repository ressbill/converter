const path = require ('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin") ;
const HTMLPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle[chunkhash].js",
    },
    devServer: {
        port : 3000
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,'src/assets') ,
                to: path.resolve(__dirname, 'public/assets')
            }
        ])

    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg|svg)$/  ,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }


        ]

    }


}
