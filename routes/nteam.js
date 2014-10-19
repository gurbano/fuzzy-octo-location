module.exports = function($) {
    var server = $.get('server');
    server.route({
        method: 'GET',
        path: '/nteam/index',
        handler: function(request, reply) {
            reply.view('newteam');
        }
    });
    server.route({
        method: 'GET',
        path: '/nteam/userdata/{userid?}',        
        handler: function(request, reply) {
        	var id = request.params.id;
            reply({user:id, data: {
                
            }});
        }
    });
};
