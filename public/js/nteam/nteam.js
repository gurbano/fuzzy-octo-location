/*STARTING POINT*/
var GLOBALS = {};
init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    /*START USER MANAGEMENT*/


    var startApplication = function() {
        GLOBALS.Newteam = new Newteam({
            user: null
        });
        GLOBALS.Newteam.start(function(err) {
            if (err) console.error(err);
            console.info('Newteam started');
        });
    };


    GLOBALS.usm.start();
    GLOBALS.usm.requireFacebook(function(err, user) {
        $('#profilepic').css('background-image', 'url(' + user.picture + ')');
        startApplication();

    });


};

/*NEWTEAM APPLICATION*/
var Newteam = function(options) {
    var self = this;
    return self;
};
Newteam.prototype.start = function(_callback) {

    var self = this;
    //self.testXXX('-------------> OK');    
    self.setup();
    self.startEngine(function(err) {
        self.UX({
            'onDrag': function(params, event) {
                self.updateEarthRotation(params.dx, params.dy);
            },
            'keypress': function(params, event) {
                console.info(event);
                if (event.keyCode === 119) {
                    self.updateEarthRotation(null, -1);
                }
                if (event.keyCode === 115) {
                    self.updateEarthRotation(null, 1);
                }
                if (event.keyCode === 97) {
                    self.updateEarthRotation(1, null);
                }
                if (event.keyCode === 100) {
                    self.updateEarthRotation(-1, null);
                }
            },
        });
        _callback(err);
    });
};
