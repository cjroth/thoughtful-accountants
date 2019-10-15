import { EnvironmentPlugin, } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import merge from 'webpack-merge'

import common from './webpack.common'


export default merge.smart(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new EnvironmentPlugin({
            API_URL: 'https://python.thoughtful.finance',
        }),
    ],
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'less-loader?sourceMap'],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        public: 'thoughtful.localhost',
    }
})
