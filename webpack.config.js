const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/script.ts",
    output: {
        filename: "script.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                "static"
            ],
        }),
    ],
};
