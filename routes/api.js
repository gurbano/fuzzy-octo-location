/*http://blog.modulus.io/nodejs-and-hapi-create-rest-api*/

module.exports = function(server){
	server.route({
	    method: 'GET',
	    path: '/api',
	    handler: function (request, reply) {
	        reply('not yet implemented');
	    }
	});

}