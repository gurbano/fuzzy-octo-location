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
            var tmm = new TimelineModule(story, {
                enabled: true
            }); //Timeline module. (producer)

            var earthModule = new EarthModule({
                    parent: $('#main'),
                    enabled: true,
                    timeLineProducer: tmm,
                    dataProducer: undefined
                }) //create THREE.JS environment, scene manager, scene etc.etc
                //.addProducer(tmm)
                .require('tmm', tmm); //Consumer


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
                        console.info(frameCount);
                    }
                }
            }).addProducer(earthModule);

            var importer = new KMLImporter(story, {
                enabled : true
            });

            return [ //MODULES
                earthModule,
                tmm, //timneline 
                tmmListener,
                renderListener,
                importer
                //gmm
            ];

        };
        /*START THE ENGINE*/
        var engine = new SEngine().start(getModules(), {});

        helper.setUIModes(true,true);//view and edit window


    }
};
