var xml2js = require('xml2js');
var fs = require('fs');
exports = module.exports = function(Model) {
	var self = this;
	self.content2event = function(content, callback) {
		xml2js.parseString(content, function(err, result) {
			if (err) {
				callback(err, null);
			}
			var ret = [];
			var when = result.kml.Document[0].Placemark[0]['gx:Track'][0].when;
			var where = result.kml.Document[0].Placemark[0]['gx:Track'][0]['gx:coord'];
			for (var ii = 0; ii < when.length; ii++) {
				var event = {
					'when': when[ii],
					'where': {
						lng: where[ii].split(' ')[0],
						lat: where[ii].split(' ')[1]
					}
				};
				ret.push(event);
			}
			callback(null, ret);
		});
	};
	self.findAll = function(callback) {
		Model.find({}, function(err, docs) {
			callback(err, docs);
		});
	};
	self.removeAll = function(callback) {
		Model.remove({}, function(err) {
			callback(err);
		});
	};
	self.registerEvent = function(event, callback) {
		var mod = new Model(event);
		mod.save(function(err, saved) {
			callback(err, saved);
		});
	};
	return self;
};