var Storify = {}; //namespace

var Helper = require('./Helper.js');
var StoryFactory = require('./StoryFactory.js');
//watchify .\public\js\storify\storify.js .\public\js\storify\dist\storify.bundle.js

init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    GLOBALS.usm.start(false)
        .login({
            method: 'facebook'
        }, function success(user) {
            console.info("You are signed in to Facebook");
            console.info(user);
            $('#profilepic').css('background-image', 'url(' + user.picture + ')');
            startStorify(null, user);
        }, function failure(err) {
            console.info(err, null);

        });
}

//require Story --> Timeline --> Frame --> Event
var Story = require('./Story.js');
var Wizard = require('./Wizard.js');


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
        swal({ //WELCOME PAGE
            title: "Welcome " + user.first_name,
            text: "Here you will create your first story.\n Are you ready?",
            type: "success",
            confirmButtonText: "Can't wait to tell a Story!",
            closeOnConfirm: true
        }, function() {
            new Wizard([step1, step2, step3], //STEPS
                function(context) { //FUNCTION TO BE EXCECUTED AT THE END OF THE WIZARD
                    GLOBALS.pb.set(100);

                    console.info(new Story({
                        author: user.id
                    }));
                    console.info(context);
                }).start();
        });

    }
}

var step1 = {
    first: true,
    data: {        
        text: ''
    },
    callback: function(obj, context) {
        GLOBALS.pb.set(10);
        context.variable = 100;
        context.tipo = '';
        context.wizard.getHelper(obj)
            .addTextField('Title', context.variable, function(value) {
                context.variable = value;
            })
            .addSelect('Type', context.tipo, ['uno', 'due', 'tre'], function(value) {
                context.tipo = value;
            });
        console.info(obj, context);
    }
};
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
