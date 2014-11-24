/*SETTING UP DEPENDENCIES*/
var Hapi = require('hapi');
var Good = require('good');

/*CREATE HAPI SERVER --- http://hapijs.com/
 * set ejs as template system */
var port = parseInt(process.env.PORT, 10) || 3000;
var server = new Hapi.Server('0.0.0.0', port, {
    views: {
        engines: {
            html: require('ejs')
        },
        path: "./views",
        partialsPath: "./views/partials",
        isCached: false
    }
});
/*GLOBALS*/
var $ = require('./global');
$.put('test', 'OK');
$.put('server', server);

/*MODULES*/
//$.put('db', require('./modules/db')); //Load db connection, initialize model & controllers
//EVENTS
//$.put('models/event', require('./models/event'));
//$.put('controllers/fuzzy', require('./controller/fuzzy')($.get('models/event')));
//OTHER MODULES
$.put('api', require('./modules/api')($)); //
$.put('battery', require('./modules/battery')($));
$.put('fsmanager', require('./modules/fsmanager')($)); //
$.put('storify', require('./modules/server_storify')($)); //



server.pack.register({
    plugin: require('hapi-socket'),
    options: {
        messageHandler: function(socket) {
            return function(message) {
                console.log("Message sent!");
                socket.send(message);
            };
        },
        logLevel: 2
    }
}, function(err) {
    server.start(function() {
        console.log("Hapi server started @ " + server.info.uri);
        $.put('garageio', require('./modules/server_garageio')(server, $)); //
        $.get('garageio').start();        
    });
});




/*Load routes*/
require('./routes/client')($);
require('./routes/static')($);
require('./routes/rest')($);
require('./routes/admin')($);
require('./routes/routes_storify')($); //Project storify


/*PACKS:
    - Good - A logging plugin that supports output to console, file and udp/http endpoints*/
/*server.pack.register(Good, function(err) {
    if (err) {
        throw err;
    }
    server.start(function() {
        /*$.get('battery').start()
            .job($.get('api').testMethod
                ,'asfsafsa'
               ,function(res){console.info(res);}
            ); 
        
        console.info('test method ', $.get('api').testMethod());

    });
});*/
