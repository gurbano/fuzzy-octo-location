module.exports = function($) {
	var server = $.get('server');
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