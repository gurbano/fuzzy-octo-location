exports = module.exports = function(server){
	var api = {};
	api.server = server;
	api.db = server.db;
	api.testMethod = function(){
		return ('----------------------------> test method ');
	};
	api.importRawData = function(callback){
		
		if (callback) callback(null,'OK');
	}
	return api;
}