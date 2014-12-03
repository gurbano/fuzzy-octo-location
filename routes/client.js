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
        path: '/particles',
        handler: function(request, reply) {
            reply.view('particles');
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.view('index');
        }
    });


    server.route({
        method: 'GET',
        path: '/projects',
        handler: function(request, reply) {
            reply($.get('projects').findAll());
        }
    });
};
