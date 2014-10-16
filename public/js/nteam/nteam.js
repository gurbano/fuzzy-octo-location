/*STARTING POINT*/
var GLOBALS = {};
init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    /*START USER MANAGEMENT*/
    /*
    GLOBALS.usm.start();
    GLOBALS.usm.requireFacebook(function(err, user) {
        $('#profilepic').css('background-image', 'url(' + user.picture + ')');

        //debugger;

    });
    */


    GLOBALS.Newteam = new Newteam({
        user: null
    });
    GLOBALS.Newteam.start(function(err) {
        if (err) console.error(err);
        console.info('Newteam started');
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
                var upX = (self.UX.mouse.directionX ? -1 : 1);
                var upY = (self.UX.mouse.directionY ? -1 : 1);
                self.setWorldRotation({
                    x: self.getWorldRotation().x + Number(CAMERA_SPEED*upX),
                    y: self.getWorldRotation().y + Number(CAMERA_SPEED*upY)
                });
                //Number() + Number(CAMERA_SPEED*)))
                //Number(self.getWorldRotation().z) + Number(CAMERA_SPEED*(self.UX.mouse.directionY ? -1 : 1)))  

            }


        });
        _callback(err);
    });
};
