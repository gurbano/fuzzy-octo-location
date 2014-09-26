var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var models = {};
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.info('Database started');
	models.Event = require('../models/event');
});

exports = module.exports = {
	'db' : db,
	'models' : models,
	'mongoose' : mongoose
};