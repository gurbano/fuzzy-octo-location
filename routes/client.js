module.exports = function($) {
	var server = $.get('server');
	server.route({
		method: 'GET',
		path: '/index',
		handler: function(request, reply) {
			reply.view('index');
		}
	});
	server.route({
		method: 'POST',
		path: '/upload',
		config: {
			payload: {
				maxBytes: 209715200,
				output: 'stream',
				parse: true
			},
			handler: function(request, reply) {
				var data = request.payload;
				$.get('fsmanager').upload(data, function(err, content) {
					$.get('controllers/event').content2event(content,function(err,ret){
						reply(ret);	
					});					
				});
			}
		}
	});
};