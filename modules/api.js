var fs = require('fs');
var xml2js = require('xml2js');

exports = module.exports = function(server){
	var api = {};
	api.server = server;
	api.db = server.db;
	api.testMethod = function(){
		return ('----------------------------> test method ');
	};
	api.findEvents = function(callback){
		var eventController = api.db.controllers.EventController;
		eventController.findAll(function(err,data){	
			console.info(err);
			callback(err,data);				
		});
	};
	api.removeEvents = function(callback){
		var eventController = api.db.controllers.EventController;
		eventController.removeAll(function(err){callback(err);});
	};
	api.importRawData = function(callback){
		var eventController = api.db.controllers.EventController;
		var files = fs.readdirSync('./test-data/');
		for (var i = files.length - 1; i >= 0; i--) {
			var path = fs.realpathSync('./test-data/'+ files[i]);
			var content = fs.readFileSync(path, 'utf-8');			
			xml2js.parseString(content,function(err,result){
				if(!err){
					var when = result.kml.Document[0].Placemark[0]['gx:Track'][0]['when'];
					var where = result.kml.Document[0].Placemark[0]['gx:Track'][0]['gx:coord'];
					for (var ii =0 ; ii <  when.length; ii++) {
						var event ={'when': when[ii], 'where':{lng: where[ii].split(' ')[0], lat: where[ii].split(' ')[1]}};
						eventController.registerEvent(event);
					}
					if (callback) callback(null,{msg:'Import OK'});
				}else{
					if (callback) callback(err,{msg:'Import KO'});
				}
				
			});
			
		};
		
	}
	return api;
}