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


    //GLOBALS.usm.start();
    //GLOBALS.usm.requireFacebook(function(err, user) {
    //   $('#profilepic').css('background-image', 'url(' + user.picture + ')');

    //startApplication();

    //});
    
    var dancer = new Dancer();
    var a = new Audio();
    a.src = '/assets/music/test.mp3';
    dancer.load(a);
    Dancer.isSupported() || loaded();
    !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded(dancer);
    
    var loaded = function(d){
        console.info('play');
        d.play();
    }

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
        self.renderer.setSize(window.innerWidth, window.innerHeight);
        self.camera.aspect = window.innerWidth / window.innerHeight;
        self.camera.updateProjectionMatrix();
        self.UX({
            'onDrag': function(params, event) {
                //console.info(params);
                self.setWorldRotation({
                    x: self.getWorldRotation().x + Number(CAMERA_SPEED * params.dx),
                    y: self.getWorldRotation().y + Number(CAMERA_SPEED * params.dy), // + Number(CAMERA_SPEED * upY)
                    z: self.getWorldRotation().z
                });
                //Number() + Number(CAMERA_SPEED*)))
                //Number(self.getWorldRotation().z) + Number(CAMERA_SPEED*(self.UX.mouse.directionY ? -1 : 1)))  

            }


        });
        _callback(err);
    });
};
