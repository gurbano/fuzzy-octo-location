module.exports = function($) {
	var api = $.get('api');
	var server = $.get('server');
	server.route({
		method: 'GET',
		path: '/admin',
		handler: function(request, reply) {
			reply.view('admin');
		}
	});
};