/**
	- Usm start(required(failure,success))
	- void forceLogin({method: ''})

	- User getUser (user or null)
	- boolean isLogged()


	ERRORS:
	.errors.USER_REQUIRED
*/

var Usm = function(_options) {
    var self = this;
    self.user = undefined;
    //Public part
    self.start = function(required, failure, success) {
        self.user = getUserFromCookie();


        if (required && !self.user) {
            failure(self.errors.USER_REQUIRED);
        }
    };
    self.login = function(__options, success, failure) {
        if (!__options.method) {
            failure('method required as parameter.');
        }
        var network = __options.method;
        hello(network).login().then(function() {
        	hello( network ).api( 'me' ).then( function(p){
        		self.user = p;
        		success(self.user);	
        	} );
            
        }, function(e) {
            failure("Signin error: " + e.error.message);
        });
    };
    self.bindUI = function(ui){//TODO
    	if (self.ui)self.unbindUI();
    	self.ui = ui;
    	hello.on( 'auth', ui.on('auth') );
    	hello.on( 'auth.login', ui.on('auth.login') );
    	hello.on( 'auth.logout', ui.on('auth.logout') );
    	hello.on( 'auth.update', ui.on('auth.update') );
    }

    /*private part*/
    var getUserFromCookie = function() { //TODO
            return self.user;
        };
        /*ERRORS*/
    self.errors = {
        USER_REQUIRED: 1
    };
    return self;
};