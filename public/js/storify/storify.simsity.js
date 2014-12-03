var Storify = {}; //namespace
var helper = require('./Helper.js')();
var StoryFactory = require('./StoryFactory.js');
init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    var goSocial = false;
    if (goSocial) {
        GLOBALS.usm.start(false)
            .login({
                method: 'facebook'
            }, function success(user) {
                console.info("You are signed in to Facebook");
                console.info(user);
                $('#profilepic').css('background-image', 'url(' + user.picture + ')');
                GLOBALS.usm.getPosition(function(err, position) {
                    GLOBALS.position = position || {
                        coords: {
                            latitude: 0,
                            longitude: 0
                        }
                    };
                    startStorify(null, user);
                }, 5000);
            }, function failure(err) {
                console.info(err, null);

            });
    } else {
        GLOBALS.position = {
            coords: {
                latitude: 0,
                longitude: 0
            }
        };
        startStorify(null, null);
    }
};



//require Story --> Timeline --> Frame --> Event
var StoryFactory = require('./StoryFactory.js');
var SEngine = require('./engine/SEngine.js');
var SModule = require('./modules/SModule.js');
var RAFClickProducer = require('./modules/RAFClickProducer.js');

var MainModule = require('./modules/ss/SSMainModule.js');



var startStorify = function(err, user) {
    if (err) {
        swal({
            title: "Error",
            text: "Facebook login is required for this experiment!",
            type: "error",
            confirmButtonText: "too bad :("
        });
        return;
    } else {

        var story = new StoryFactory({
            title: 'SS Project',
            description: '#earthquake',
            timelineOpts: {
                start: new Date('01/01/2014 00:00'),
                end: new Date('01/01/2015 00:00'),
                scale: 10 //1 frame ogni 10 minuti
            },
        }).generate();
        console.info(story);
        /*SHOULD BE MOVED IN A CONFIGURATION MODULE*/
        var getModules = function() {
            var fpsGenerator = new RAFClickProducer({ //Base
                enabled: true
            }); //call produce approx 66 times per second
            var renderListener = new SModule({
                enabled: true,
                name: 'renderListener',
                callbacks: {
                    consume: function(frameCount) {
                        //called every time one of his producers call the render function
                    }
                }
            }).addProducer(fpsGenerator);

            var ss = new MainModule(
                $('#main'), //DIV
                {   //OPTIONS
                    enabled : true,                    
                    submodules : [],
                    debug : true,
                    debugSubmodules : []
            }).addProducer(fpsGenerator);
            return [ //MODULES
                renderListener,
                fpsGenerator,
                ss
            ];
        };
        /*START THE ENGINE*/
        var engine = new SEngine().start(getModules(), {});
        helper.setUIModes(true, true); //view and edit window
    }
};
