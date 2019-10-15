import { EnvironmentPlugin, } from 'webpack'
import merge from 'webpack-merge'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

import common from './webpack.common'


export default merge(common, {
    mode: 'production',
    plugins: [
        new EnvironmentPlugin({
            API_URL: 'https://python.thoughtful.finance',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
            },
        }),
    ],
})
