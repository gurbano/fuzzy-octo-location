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
            'events' : ['mousemove'],
            'mousemove': function(params, event) {
                GLOBALS.pick(event.clientX,event.clientY,function(top,all){
                    if(top.object.name)console.info(top.object.name);

                    self.pointer.position.copy(top.point);
                });
            }
        });
        _callback(err);
    });
};
