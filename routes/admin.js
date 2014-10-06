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
	/*server.route({
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
				require('../global').get('battery')
					.job(api.importRawData, data, function(err, res) {
						if (!err) {
							reply(res);
						} else {
							reply('KO');
						}
					});
				//api.importRawData(data,function(err, res){   	if (!err){reply(res);}else{reply('KO');} });
			}
		}
	});
	*/
};