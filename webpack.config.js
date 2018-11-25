const {
	VueLoaderPlugin
} = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = () => ({
	module: {
		rules: [
			//JS
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			//VUE
			{
				test: /\.vue$/,
				use: "vue-loader"
			},
			//HTML
			{
				test: /\.html$/,
				use: [{
					loader: "html-loader",
					options: {
						minimize: true
					}
				}]
			},
			//CSS
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader,
					"css-loader",
				]
			},
		]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
	},
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				name: "commons",
	// 				chunks: "initial",
	// 				minChunks: 2
	// 			}
	// 		}
	// 	}
	// },
	resolve: {
		alias: {
			// Currently using full version. We will eventually go runtime-only with "vue.runtime.esm.js" once @Localizer issue is figured out. [THN]
			"vue$": "vue/dist/vue.esm.js" 
		},
		extensions: [".js", ".vue", ".json"]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			// filename: argv.mode === "production" ? "[name].[hash].css" : "[name].dev.css"
		}),
		// Removes and cleans build folder (/dist) before building. [THN]
		// new CleanWebpackPlugin(["./wwwroot/dist"]) 
	]
});