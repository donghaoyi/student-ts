// 在编译时加载并运行
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口文件
    entry: "./src/index.ts",
    // 指定编译后的输出文件
    output: {
        filename: 'mai.js'
    },
    resolve: {
        // 引入文件后缀自动补全
        extensions: ['js', 'ts', 'tsx']
    },
    module: {
        rules: [
            {
                // 匹配tsx后缀的文件，使用ts-loader运行方式
                test: '/\.tsx?$/',
                use: 'ts-loader',
                // 设定编译忽略文件
                exclude: '/node_modules'

            }
        ]
    },
    // 开发调试工具，判断当前环境，如果是开发环境进行使用，生产环境禁用。提升编译速度与代码体积
    devtool: process.NODE_ENV === "production" ? false : 'inline-source-map',
    devServer: {
        static: './dist',
        // static: ['errors-only'],
        compress: false,
        host:'localhost',
        port: 8089
    },
    plugins: [
        new CleanWebpackPlugin({
            // 打包前对指定目录进行清理
            cleanOnceBeforeBuildPatterns:['./dist']
        }),
        new HtmlWebpackPlugin({
            // 打包后的入口htlm为
            template:'./src/template/index.html'
        })
    ]
}