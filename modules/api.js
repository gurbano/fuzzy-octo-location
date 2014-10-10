var fs = require('fs');
var xml2js = require('xml2js');

exports = module.exports = function($) {
	var api = {};
	api.testMethod = function testMethod(testData) {
		return $.get('test');
	};
	/*EVENTS*/
	api.findEvents = function(callback) {
		var eventController = $.get('controllers/fuzzy');
		eventController.findAll(function(err, data) {
			callback(err, data);
		});
	};
	api.removeEvents = function(callback) {
		var eventController = $.get('controllers/fuzzy');
		eventController.removeAll(function(err) {
			callback(err);
		});
	};
	return api;
}