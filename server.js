/*SETTING UP DEPENDENCIES*/
var Hapi = require('hapi');
var Good = require('good');

/*CREATE HAPI SERVER --- http://hapijs.com/
  * set ejs as template system */
var port = parseInt(process.env.PORT, 10) || 3000;
var server = new Hapi.Server('0.0.0.0',port,{
	views : {
		engines: { html: require('ejs') },
        path: "./views",
        partialsPath :"./partials/views",
        isCached: false}
});

server.db = require('./modules/db');
/*LOAD API MODULE*/
server.api = require('./modules/api')(server);

/*Load routes*/
require('./routes/client')(server);
require('./routes/static')(server);
require('./routes/api')(server);
require('./routes/admin')(server);


/*PACKS:
    - Good - A logging plugin that supports output to console, file and udp/http endpoints*/
server.pack.register(Good, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
    server.start(function () {
                
    });
});


