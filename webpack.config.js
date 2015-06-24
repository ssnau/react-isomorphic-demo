module.exports = {
    entry: "./page/index.jsx",
    output: {
        path: "./public",
        filename: "index.js"
    },
    module: {
        loaders: [
            { test: /\.js/, loader: "babel-loader" }
        ]
    }
};

