/*http://blog.modulus.io/nodejs-and-hapi-create-rest-api*/


module.exports = function($) {
	var api = $.get('api');
	var server = $.get('server');
	server.route({
		method: 'GET',
		path: '/api',
		handler: function(request, reply) {
			//RETURN API LIST
			reply('Locationer Api v0.0.1 running');
		}
	});
	server.route({
		method: 'GET',
		path: '/api/test',
		handler: function(request, reply) {
			//RETURN API LIST
			reply(api.testMethod());
		}
	});
	server.route({
		method: 'GET',
		path: '/api/events',
		handler: function(request, reply) {
			$.get('api').findEvents(function(err, data) {
				if (!err) reply(data);
				else reply(err);
			});
		}
	});
	server.route({
		method: 'GET',
		path: '/api/events/removeAll',
		handler: function(request, reply) {
			$.get('api').removeEvents(function(err) {
				if (!err) reply('OK');
				else reply('KO');
			});
		}
	});
};