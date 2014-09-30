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
/*GLOBALS*/
var $ = require('./global');
$.put('test','OK');
$.put('server',server);

/*MODULES*/
$.put('db',require('./modules/db')); //Load db connection, initialize model & controllers
//EVENTS
$.put('models/event',require('./models/event'));
$.put('controllers/event',require('./controller/event')($.get('models/event')));
//OTHER MODULES
$.put('api',require('./modules/api')($)); //
$.put('battery',require('./modules/battery')($));



/*Load routes*/
require('./routes/client')($);
require('./routes/static')($);
require('./routes/api')($);
require('./routes/admin')($);


/*PACKS:
    - Good - A logging plugin that supports output to console, file and udp/http endpoints*/
server.pack.register(Good, function (err) {
    if (err) {throw err;}
    server.start(function () {
        $.get('battery').start()
            .job($.get('api').testMethod
                ,'asfsafsa'
               ,function(res){console.info(res);}
            ); 
    });
});


