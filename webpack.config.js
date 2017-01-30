var path = require('path');

module.exports = {
	entry: {
		app: ['./main.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		plublicPath: './'
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
};

