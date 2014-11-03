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
var Wizard = require('./Wizard.js');
var SEngine = require('./engine/SEngine.js');
var SModule = require('./modules/SModule.js');
var GMapModule = require('./modules/GMapModule.js');
var SModule = require('./modules/SModule.js');
var ModulesManager = require('./modules/ModulesManager.js');
//SOURCES
var SourcesManager = require('./modules/SourcesManager.js');
var PlayBackModule = require('./modules/PlayBackModule.js');

var TimelineModule = require('./modules/TimelineModule.js');
var EditSwitch = require('./modules/UI/UISwitcher.js');
var EarthModule = require('./modules/Earthmodule.js');
var DisplayPathModule = require('./modules/DisplayPath.js');
var FacebookSourcesModule = require('./modules/sources/FacebookSourcesModule.js');



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
            title: 'USA',
            description: '#Roadtrip #California #Nevada #Burningman',
            timelineOpts: {
                start: new Date('09/01/2014'),
                end: new Date('09/02/2014'),
                scale: 1 //1 frame every 1 minutes.
            },
        }).generate();
        //console.info($.toJSON(story));
        console.info(story);

        /*CREATE MODULES*/
        /*SUPERMODULES*/
        var uiSwitcher = new EditSwitch({ //Move marker, show map ecc.ecc.
            parent: $('#main'),enabled:true
        });
        var mm = new ModulesManager({
            parent: $('#main'),enabled:true
        });
        /*SOURCES*/
        var sm = new SourcesManager({enabled:true}).attachTo(mm);
        var fsm = new FacebookSourcesModule({story:story, enabled:false}).attachTo(sm);

        /*TIMELINE*/
        var tmm = new TimelineModule(story, {enabled:true}).attachTo(mm);
        /*EDIT*/

        var gmm = new GMapModule(story, { //Move marker, show map ecc.ecc.
            parent: $('#main'),enabled:false
        }).attachTo(mm).attachTo(tmm).require('tmm', tmm);

        //attached to modules manager, attached to timeline, require google maps 
        var displayPath = new DisplayPathModule({ //Move marker, show map ecc.ecc.
            parent: $('#main'),enabled:true
        }).attachTo(mm).attachTo(tmm).require('gmm', gmm); 


        /*VIEW*/
        var playback = new PlayBackModule({enabled:true}).attachTo(mm).require('tmm', tmm);
        var earthModule = new EarthModule({
            parent: $('#main')
        }).attachTo(mm);

        /*POSTINIZIALIZER*/
        var postInitializer = new SModule({
            name: 'onTheRockModule',
            id: 'ONTHEROCK',
            postInit: function() {
                console.info('All modules started');
                return this;
            }
        });

        var engine = new SEngine().start(
            [ //MODULES
                mm, //module manager
                sm, //sources manager
                fsm, //facebook source module
                tmm, //timneline
                gmm, //google maps
                playback, //playback bar 
                displayPath, //display interpolated paths and skipped events on gmap
                uiSwitcher, // switch between edit and view
                postInitializer // anonymous module on complete
            ]
        );

    }
};









/*SKIP WIZARD NOW
        if (false) {
            swal({ //WELCOME PAGE
                title: "Welcome " + user.first_name,
                text: "Here you will create your first story.\n Are you ready?",
                type: "success",
                confirmButtonText: "Can't wait to tell a Story!",
                closeOnConfirm: true
            }, function() {
                new Wizard('Create a story', [step1], //, step2, step3], //STEPS
                    function(context) { //FUNCTION TO BE EXCECUTED AT THE END OF THE WIZARD
                        GLOBALS.pb.set(100);

                        console.info(new Story({
                            author: user.id
                        }));
                        console.info(context);
                    }).start();
            });
        }


var step1 = {
    first: true,
    last: true,
    data: {
        text: ''
    },
    callback: function(obj, context) {
        GLOBALS.pb.set(10);
        context.title = 'My first story';
        context.wizard.getHelper(obj)
            .addTextField('Title', context.title, function(value) {
                context.title = value;
            })
            .addTextField('Description', context.description, function(value) {
                context.description = value;
            })
            .addDateField('From', context.from, function(value) {
                context.from = value;
            }).addDateField('To', context.to, function(value) {
                context.to = value;
            }).focus();
        console.info(obj, context);
    }
};
require()

var step2 = {
    data: {
        text: 'step 2'
    },
    callback: function(obj, context) {
        GLOBALS.pb.set(20);
        context.variable++;
        console.info(obj, context);

    }
};
var step3 = {
    last: true,
    data: {
        text: 'step 3'
    },
    callback: function(obj, context) {
        GLOBALS.pb.set(30);
        context.variable = 200;
        console.info(obj, context);
    }
};


*/
