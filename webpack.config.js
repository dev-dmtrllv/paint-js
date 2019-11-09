const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	stats: "minimal",
	entry: "./app/index.tsx",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".css", ".scss", ".sass", ".json"],
		alias: {
			components: path.resolve(__dirname, 'app', 'components'),
			views: path.resolve(__dirname, 'app', 'views'),
			stores: path.resolve(__dirname, 'app', 'stores'),
			engine: path.resolve(__dirname, 'engine'),
			utils: path.resolve(__dirname, 'utils'),
		}
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist", "app"),
		publicPath: "/"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			title: "paint-js",
			xhtml: true
		})
	]
};