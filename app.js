'use strict';

var express = require('express');  
var api = require('capital-bike-share-js');
var env = process.env.NODE_ENV || 'development';
var compression = require('compression')

var app = express();

if (env == 'development') {
	let webpackDevMiddleware = require("webpack-dev-middleware");
	let webpack = require('webpack')
	let webpackConfig = require('./webpack.config')
	var compiler = webpack(webpackConfig);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: '/build/'
	}));
}

app.use(compression())
app.use(express.static(__dirname + '/public'));

app.get('/api', function(req, res) {
	if (isNaN(req.query.lat) || isNaN(req.query.lon)) {
		res.status(500).send({status: 'error'});
		return;
	}
	api.getByClosest({latitude: parseFloat(req.query.lat), longitude: parseFloat(req.query.lon)}, 5, 
		(err, data) => {
			if (err) {
				res.status(500).send({status: 'error'});
			} else {
				res.send({status: 'OK', data: data});
			}
		});
});

app.listen(process.env.PORT || 3000);