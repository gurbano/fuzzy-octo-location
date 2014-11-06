var Storify = {}; //namespace

var helper = require('./Helper.js')();
var StoryFactory = require('./StoryFactory.js');
//watchify .\public\js\storify\storify.js -o .\public\js\storify\dist\storify.bundle.js

init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    var goSocial = true;
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
var Story = require('./Story.js');
var StoryFactory = require('./StoryFactory.js');
var SEngine = require('./engine/SEngine.js');
var SModule = require('./modules/SModule.js');
var TimelineModule = require('./modules/TimelineModule.js');
var EarthModule = require('./modules/Earthmodule.js');
var KMLImporter = require('./modules/KMLImporter.js');


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
            title: '1 Year of earthquakes',
            description: '#earthquake',
            timelineOpts: {
                start: new Date('01/01/2014'),
                end: new Date('2/1/2014'),
                scale: 1 * 60 //1 frame every ora
            },
        }).generate();
        console.info(story);


        /*SHOULD BE MOVED IN A CONFIGURATION MODULE*/
        var getModules = function() {

            //timeline module: create the bar with the slider 
            var tmm = new TimelineModule(story, {
                enabled: true
            }); 
            //create a kml importer. modify the story object
            var importer = new KMLImporter(story, {
                enabled: true
            });

            //display a rotating earth.
            //postInit customization:
            //      -- bind to timeline event: rotate earth according to the date
            //      -- bind to (its own) render cycle: rotate clouds //test purpose
            var earthModule = new EarthModule({
                parent: $('#main'),
                enabled: true,
                callbacks: {
                    postInit: function() {
                        earthModule.bindToProducer(function(frame) { //BINDED TO TIMELINE CONTROLS
                            var h = ((frame.time / (1000 * 60 * 60)).toFixed(0));
                            var deg = (h % 24) * 15;
                            //earthModule.earth.setEarthRotation(deg);
                            earthModule.earth.setSunRotation(deg);
                        }, tmm);
                        earthModule.bindToProducer(function(framecount) {
                            if (earthModule.earth.clouds) {
                                earthModule.earth.clouds.rotation.y +=   (34/30000);
                                earthModule.earth.clouds.rotation.x +=   (8/30000);
                            }
                        }, earthModule);
                    }
                }
            }); //create THREE.JS environment, scene manager, scene etc.etc

            /*CLOCK ON TOP*/
            var tmmListener = new SModule({
                enabled: true,
                name: 'tmmListener',
                callbacks: {
                    postInit: function() {
                        $('#UI-EDIT').prepend('<div class="button raised grey" style="width:200px;height:30px;position:absolute;margin-left:-100px;top:50px;left:50%;text-align:center;" id="__clock"></div>');
                    },
                    consume: function(frame) {
                        $('#__clock').html(helper.msToString(frame.time));
                    }
                }
            }).addProducer(tmm);

            var renderListener = new SModule({
                enabled: true,
                name: 'renderListener',
                callbacks: {
                    consume: function(frameCount) {
                        //console.info(frameCount);
                    }
                }
            }).addProducer(earthModule);


            
            return [ //MODULES
                earthModule,                 
                tmmListener,
                renderListener,
                importer,
                tmm                
            ];

        };
        /*START THE ENGINE*/
        var engine = new SEngine().start(getModules(), {});

        helper.setUIModes(true, true); //view and edit window


    }
};
