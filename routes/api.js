/*http://blog.modulus.io/nodejs-and-hapi-create-rest-api*/


module.exports = function(_server){
	var api = _server.api;
	var server = _server;
	server.route({
	    method: 'GET',
	    path: '/api',
	    handler: function (request, reply) {
	    	//RETURN API LIST
	        reply('Locationer Api v0.0.1 running');
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/api/test',
	    handler: function (request, reply) {
	    	//RETURN API LIST
	        reply(api.testMethod());
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/api/events',
	    handler: function (request, reply) {
	    	//RETURN API LIST
	    	api.findEvents(function(err,data){
	    		if (!err)
	    			reply(data);
	    		else
	    			reply(err);
	    	});	        
	    }
	});
	server.route({
	    method: 'GET',
	    path: '/api/events/removeAll',
	    handler: function (request, reply) {api.removeEvents(function(err){if (!err)reply('OK');else reply('KO');});}
	});
	server.route({
	    method: 'GET',
	    path: '/api/events/import',
	    handler: function (request, reply) {
	    	//RETURN API LIST
	        api.importRawData(function(err, data){
	        	if (!err){
	        		reply(data.msg);
	        	}
	        	else{
	        		reply('KO');
	        	}

	        });
	    }
	});
	

}