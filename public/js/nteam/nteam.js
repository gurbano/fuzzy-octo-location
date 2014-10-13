/*STARTING POINT*/
var GLOBALS = {};
init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    /*START USER MANAGEMENT*/
    GLOBALS.usm.start(
        true,
        function fail(err) {
            console.info('USM problem');
            if (err === GLOBALS.usm.errors.USER_REQUIRED) {
                GLOBALS.usm.login({ //redirect the user to this same page
                    method: 'facebook'
                }, function success(user) {
                    console.info("You are signed in to Facebook");
                    console.info(user);
                    $('#profilepic').css('background-image', 'url(' + user.picture + ')');
                    //background: url(http://link-to-your/image.jpg) no-repeat;

                }, function failure(err) {
                    console.info(err);
                    console.info('cannot start application');
                });
            } else {
                console.info(err);
                return;
            }
        },
        function success(user) {

            /*START APPLICATION*/
            GLOBALS.Newteam = new Newteam({
                user: null
            }).start(
                function(err) {
                    if (err) console.error(err);
                    console.info('Newteam started');
                });

        });





};

/*NEWTEAM APPLICATION*/
var Newteam = function(options) {
    var self = this;
    self.start = function(___callback) {
        if (___callback) {
            ___callback(null);
        }
    };
    self.user = {};


    return self;
};
