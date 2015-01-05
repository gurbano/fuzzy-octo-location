module.exports = function($) {
    var server = $.get('server');
    server.route({
        path: "/icon/{path*}",
        method: "GET",
        handler: {
            directory: {
                path: "./public/assets/material-design-icons",
                listing: true,
                index: false
            }
        }
    });
    server.route({
        path: "/{path*}",
        method: "GET",
        handler: {
            directory: {
                path: "./public",
                listing: true,
                index: false
            }
        }
    });
     server.route({
        path: "/static/{path*}",
        method: "GET",
        handler: {
            directory: {
                path: "./public/static",
                listing: false,
                index: false
            }
        }
    });

};