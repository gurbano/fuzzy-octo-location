module.exports = function($) {
    var server = $.get('server');
    server.route({
        method: 'GET',
        path: '/nteam/index',
        handler: function(request, reply) {
            reply.view('newteam');
        }
    });
};
