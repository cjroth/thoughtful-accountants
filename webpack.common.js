import { EnvironmentPlugin, } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'


export default {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'app-[hash].js',
        path: `${__dirname}/dist`,
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          NODE_ENV: process.env.NODE_ENV,
          minify: true,
          includeAnalytics: true,
        })
    ],
    resolve: {
        alias: {
            '../../theme.config$': `${__dirname}/semantic/theme.config`,
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(less|css)$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
			{
				test: /\.(png|jpg|svg|eot|woff|woff2|ttf)$/,
				loader: 'url-loader'
			},
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    },
}
