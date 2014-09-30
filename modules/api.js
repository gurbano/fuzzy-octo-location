var fs = require('fs');
var xml2js = require('xml2js');

exports = module.exports = function($){
	var api = {};
	api.testMethod = function testMethod(testData){
		console.info('test data: ',testData);
		return $.get('test');
	};
	/*EVENTS*/
	api.findEvents = function(callback){
		var eventController = $.get('controllers/event');
		eventController.findAll(function(err,data){	
			callback(err,data);				
		});
	};	
	api.removeEvents = function(callback){
		var eventController = $.get('controllers/event');
		eventController.removeAll(function(err){callback(err);});
	};
	api.importRawData = function(data,callback){
		var eventController = $.get('controllers/event');
		var err = null;
		if (data.file) {
			/*http://bl.ocks.org/joyrexus/0c6bd5135d7edeba7b87*/
			var name = data.file.hapi.filename;
            var path = __dirname + "/../uploads/" + name;
            var file = fs.createWriteStream(path);
            file.on('error', function (err) { 
                //callback(err,'KO');
                console.info(err);
            });
            data.file.pipe(file);
            data.file.on('end', function (err) {
            	eventController.importFile(path, function(err,res){
            		/*send response*/ 
	                var ret = {
	                	msg: res.msg,
	                    filename: data.file.hapi.filename,
	                    headers: data.file.hapi.headers
	                }
	                callback(null,JSON.stringify(ret)); 

	            });            	               
            });
		}else{(err = 'No file');}
		/*RETURN (ASYNC)*/
		//if (err){callback(err,'KO');}else{}
	};
	return api;
}