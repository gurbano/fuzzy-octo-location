var Storify = {}; //namespace

var Helper = require('./Helper.js');
var StoryFactory = require('./StoryFactory.js');
//watchify .\public\js\storify\storify.js -o .\public\js\storify\dist\storify.bundle.js

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
                GLOBALS.usm.getPosition(function(err,position){
                    GLOBALS.position = position || {coords : {latitude:0, longitude:0}};
                    startStorify(null, user);
                },5000);                
            }, function failure(err) {
                console.info(err, null);

            });
    } else {
        GLOBALS.position = {coords : {latitude:0, longitude:0}};
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
var TimelineModule = require('./modules/TimelineModule.js');


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
                start: new Date('08/08/2014'),
                end: new Date('08/18/2014'),
                scale: 10 //1 frame every 10 minutes.
            },
        }).generate();
        //console.info($.toJSON(story));
        console.info(story);

        /*CREATE MODULES*/
        var tmm = new TimelineModule(story, {
            selector: 'timeline'
        });
        var gmm = new GMapModule({
            selector: 'map-canvas',
        }).attachTo(tmm).require(tmm);
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
                tmm,
                gmm, postInitializer
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
