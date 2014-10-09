$(document).ready(function() {
	console.info('started');
    //$(".dial").knob();
    $('#main').height($(window).height());
    $(window).resize(function() {
        $('#main').height($(window).height());
    });
    var GLOBALS = {};
    GLOBALS.pb = new _pb($("#progress-bar"));

    if (init){
    	console.info('calling init');
        init(GLOBALS);
    }else{
    	console.info('init not found!');
    }
    

});


var _pb = function(element){
        var self = this;
        self.set = function(val){
            self.toggle(true);
            element.width(val+'%');
            if (val>=100){
                setTimeout(function(){self.toggle(false);},2500);
            }
        };
        self.toggle = function(bool){
            if (bool){
                element.addClass('show');
            }else{
                element.removeClass('show');
            }
        };
        return self;
};
