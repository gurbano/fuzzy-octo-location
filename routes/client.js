module.exports = function(server){
	server.route({
	    method: 'GET',
	    path: '/index',
	    handler: function (request, reply) {
	        reply.view('index');
	    }
	});
}