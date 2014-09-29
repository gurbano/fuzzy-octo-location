var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var models = {};
var controllers = {};
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.info('Database started');
	//IMPORT ALL MODEL CLASSES
	models.Event = require('../models/event');
	controllers.EventController = require('../controller/event')(models.Event);
});

exports = module.exports = {
	'db' : db,
	'models' : models,
	'mongoose' : mongoose,
	'controllers' : controllers
};