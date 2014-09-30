var xml2js = require('xml2js');
var fs = require('fs');
exports = module.exports = function(Model){
	var _registerEvent = function(event,callback){
		var mod = new Model(event);
		mod.save(function (err, saved) {
			callback(err, saved); 
		});
	};
	var _importFile = function(path,callback){
		fs.readFile(path, {'encoding':'utf-8'},function(err,content){
			xml2js.parseString(content,function(err,result){
			if(!err){
				var when = result.kml.Document[0].Placemark[0]['gx:Track'][0]['when'];
				var where = result.kml.Document[0].Placemark[0]['gx:Track'][0]['gx:coord'];
				for (var ii =0 ; ii <  when.length; ii++) {
					var event ={'when': when[ii], 'where':{lng: where[ii].split(' ')[0], lat: where[ii].split(' ')[1]}};
					_registerEvent(event,function(err,saved){
						if (err) {console.error(err)}
						else{console.info('--->' + saved);}
					});						
				}
				if (callback) callback(null,{msg:'Import OK'});
			}else{
				console.error(err);
				if (callback) callback(err,{msg:'Import KO'});
			}				
			});
		});		
	};
	/*PUBLIC PART*/
	return{
		findAll: function(callback){
			Model.find({},function(err,docs){
				callback(err,docs);
			});
		},
		removeAll: function(callback){
			Model.remove({},function(err){callback(err);});
		},
		registerEvent : function(event,callback){
			return _registerEvent(event,callback);
		},
		importFile : function(path,callback){		
			return _importFile(path,callback);
		}
	}
}