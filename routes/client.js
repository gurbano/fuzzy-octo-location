module.exports = function($){
	var server = $.get('server');
	server.route({
	    method: 'GET',
	    path: '/index',
	    handler: function (request, reply) {
	        reply.view('index');
	    }
	});
}