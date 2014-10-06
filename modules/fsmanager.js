var fs = require('fs');
var xml2js = require('xml2js');
exports = module.exports = function($) {
	var self = this;
	self.upload = function(data, callback) {
		var name = data.file.hapi.filename;
		var path = __dirname + "/../uploads/" + name;
		var file = fs.createWriteStream(path);
		file.on('error', function(err) {
			callback(err);
		});
		data.file.pipe(file);
		data.file.on('end', function(err) {
			if (err) {
				callback(err);
			}
			fs.readFile(path, {
				'encoding': 'utf-8'
			}, function(err, content) {
				if (err) {
					callback(err);
				}
				callback(null, content);
			});
		});
	};
	return self;
};