module.exports = function(server){
	server.route({
	    path: "/{path*}",
	    method: "GET",
	    handler: {
	        directory: {
	            path: "./public",
	            listing: false,
	            index: false
	        }
	    }
	});
};