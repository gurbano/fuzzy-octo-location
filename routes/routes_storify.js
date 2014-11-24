module.exports = function($) {
    var server = $.get('server');
    //routes_storify.js
    server.route({
        method: 'GET',
        path: '/storify',
        handler: function(request, reply) {
            reply.view('storify');
        }
    });
     server.route({
        method: 'GET',
        path: '/earth',
        handler: function(request, reply) {
            reply.view('earth');
        }
    });
    server.route({
        method: 'GET',
        path: '/cowabunga',
        handler: function(request, reply) {
            reply.view('cowabunga');
        }
    });
    server.route({
        method: 'POST',
        path: '/storify/uploadKML',
        config: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: true
            },
            handler: function(request, reply) {
                var data = request.payload;
                $.get('fsmanager').upload(data, function(err, content) {
                    $.get('storify').parseKML(content, function(err, ret) {
                        reply(ret);
                    });
                });
            }
        }
    });
};
