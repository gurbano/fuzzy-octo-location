module.exports = function($) {
	var api = $.get('api');
	var server = $.get('server');
    server.route({
        method: 'GET',
        path: '/fuzzy/index',
        handler: function(request, reply) {
            reply.view('fuzzylocator',{load : ''});
        }
    });
    server.route({
        method: 'GET',
        path: '/fuzzy/test/{name?}',
        handler: function(request, reply) {
            var name = request.params.name;
            reply.view('fuzzylocator', {load : name});
        }
    });
   
    server.route({
        method: 'GET',
        path: '/fuzzy/load/{name}',
        handler: function(request, reply) {
            var name = request.params.name;
            $.get('fsmanager').read('public/assets/data/fuzzy/' + name, function(err, content) {
                $.get('controllers/fuzzy').content2event(content, function(err, ret) {
                    reply(ret);
                });
            });
        }
    });
    server.route({
        method: 'POST',
        path: '/fuzzyupload',
        config: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: true
            },
            handler: function(request, reply) {
                var data = request.payload;
                $.get('fsmanager').upload(data, function(err, content) {
                    $.get('controllers/fuzzy').content2event(content, function(err, ret) {
                        reply(ret);
                    });
                });
            }
        }
    });
    /*EVENTS*/
    server.route({
        method: 'GET',
        path: '/fuzzy/events',
        handler: function(request, reply) {
            $.get('api').findEvents(function(err, data) {
                if (!err) reply(data);
                else reply(err);
            });
        }
    });
    server.route({
        method: 'POST',
        path: '/fuzzy/events/removeAll',
        handler: function(request, reply) {
            $.get('api').removeEvents(function(err) {
                if (!err) reply('OK');
                else reply('KO');
            });
        }
    });
};
