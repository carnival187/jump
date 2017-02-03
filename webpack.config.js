var path = require('path');
//var webpack = require('webpack');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	module: {
		loaders: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				query: {
					presets: ['es2015', 'stage-2']
				}
			}
		]
	}
	//,plugins: [ new webpack.optimize.UglifyJsPlugin() ]
};

