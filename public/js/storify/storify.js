var Storify = {}; //namespace


init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    GLOBALS.usm.start(false)
        .login({
            method: 'facebook'
        }, function success(user) {
            console.info("You are signed in to Facebook");
            console.info(user);
            $('#profilepic').css('background-image', 'url(' + user.picture + ')');
            startStorify(null,user);
        }, function failure(err) {
            console.info(err,null);

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
    }else{
    	swal({
            title: "Welcome",
            text: "Here you will learn about the creation of a new story.\n Are you ready?",
            type: "success",
            confirmButtonText: "Can't wait to tell a Story!",
            closeOnConfirm: false
        }, function(){
        	new Wizard().start();
        });
    	console.info(new Story({
    		author : user.id 
    	}));
    }
}
