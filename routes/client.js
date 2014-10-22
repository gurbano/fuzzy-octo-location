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
        method: 'GET',
        path: '/flock',
        handler: function(request, reply) {
            reply.view('flock');
        }
    });
    server.route({
        method: 'GET',
        path: '/storify',
        handler: function(request, reply) {
            reply.view('storify');
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.view('masonry');
        }
    });
};
