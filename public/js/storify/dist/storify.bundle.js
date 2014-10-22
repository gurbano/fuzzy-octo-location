(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js":[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Event.js":[function(require,module,exports){
var EventType = require('./EventType.js');
module.exports = Event;
function Event(opts){
	if (!(this instanceof Event)) return new Event(opts);
	this.type = EventType.GENERIC;
	this.start_frame = opts.start_frame || 0;
	this.end_frame = opts.end_frame ||0;
	this.data = opts.data || {};
	return this;
}
},{"./EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js":[function(require,module,exports){
module.exports ={
	GENERIC : 000,
	POSITION : 001,
	PHOTO : 100,
	VIDEO  :200,
	MUSIC  :300
};
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js":[function(require,module,exports){
var EventType = require('./EventType.js');
var GpsEvent = require('./GpsEvent.js');
var Event = require('./Event.js');

module.exports = Frame;

function Frame(opts){
	if (!(this instanceof Frame)) return new Frame(opts);
	this.index = opts.index || 0; // index of the frame, relative to the timeline
	this.time =  opts.time || 0; // date of the frame in ms
	this.events = opts.events || [];
	if (this.getEventsByType(EventType.POSITION).length==0){ //if no position is set, generate a new one (either from options or from null)
		this.events.push(opts.gps || new GpsEvent(opts.position || {}) ); //position infos
	}
	return this;
};


Frame.prototype.getEventsByType = function(type) {
	var ret =[];
	for (var i = 0; i < this.events.length; i++) {
		if (this.events[i].type === type){
			ret.push(this.events[i]);
		}
	};
	return ret;
};
},{"./Event.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","./GpsEvent.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js":[function(require,module,exports){
var inherits = require('inherits');
var Event = require('./Event.js');

module.exports = GpsEvent;
function GpsEvent(opts){
	if (!(this instanceof GpsEvent)) return new GpsEvent(opts);
	Event.call(this);

	this.type = EventType.POSITION;
	return this;
}
},{"./Event.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js":[function(require,module,exports){
module.exports = Helper;

function Helper(){
	if (!(this instanceof Helper)) return new Helper();
	this.DATE_FORMAT = 'hh:ii dd/mm/y';
	return this;
}
Helper.prototype.dateToString = function(date) {
        return $.formatDateTime(this.DATE_FORMAT, date);
};
Helper.prototype.stringToDate = function(s) {
        return new Date(s);
};
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Story.js":[function(require,module,exports){
var Timeline = require('./Timeline.js');
var Helper = require('./Helper.js');
module.exports = Story;
function Story(opts){
	if (!(this instanceof Story)) return new Story(opts);
	this.helper = new Helper();
	this.timeline = opts.timeline || new Timeline(opts.timelineOpts || {});
	this.title = opts.title || 'untitled story';
	this.description = opts.description || 'new story to be filled';
	this.author = opts.author || -1;
	this.participants = opts.participants || [];
	this.createdOn = opts.createdOn || this.helper.dateToString(new Date());
	return this;
}
},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Timeline.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js":[function(require,module,exports){
var Frame = require('./Frame.js');

module.exports = Timeline;

function Timeline(opts){
	if (!(this instanceof Timeline)) return new Timeline(opts);
	this.scale = opts.scale || 1; // delta minutes between frames
	this.frames = opts.frames || []; 
	this.start = opts.start || 0; // delta minutes between frames
	this.end = opts.end || 0; // delta minutes between frames
	return this;
}
},{"./Frame.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js":[function(require,module,exports){
module.exports = Wizard;
function Wizard(opts){
	if (!(this instanceof Wizard)) return new Wizard(opts);
	return this;
}
Wizard.prototype.start = function() {
	
};
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.js":[function(require,module,exports){
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

},{"./Story.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Story.js","./Wizard.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js"}]},{},["C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.js"]);
