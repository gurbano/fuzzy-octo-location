(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Z:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js":[function(require,module,exports){
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

},{}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js":[function(require,module,exports){
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
},{"./EventType.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js":[function(require,module,exports){
module.exports ={
	GENERIC : 000,
	POSITION : 001,
	PHOTO : 100,
	VIDEO  :200,
	MUSIC  :300
};
},{}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js":[function(require,module,exports){
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
},{"./Event.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","./GpsEvent.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js":[function(require,module,exports){
var inherits = require('inherits');
var Event = require('./Event.js');

module.exports = GpsEvent;
function GpsEvent(opts){
	if (!(this instanceof GpsEvent)) return new GpsEvent(opts);
	Event.call(this);

	this.type = EventType.POSITION;
	return this;
}
},{"./Event.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","inherits":"Z:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js":[function(require,module,exports){
module.exports = Helper;

function Helper() {
    if (!(this instanceof Helper)) return new Helper();
    this.DATE_FORMAT = 'hh:ii dd/mm/y';
    return this;
}
Helper.prototype.get = function() {
	return this;
};
Helper.prototype.dateToString = function(date) {
    return $.formatDateTime(this.DATE_FORMAT, date);
};
Helper.prototype.stringToDate = function(s) {
    return new Date(s);
};
Helper.prototype.deepCopy = function(oldObject) {
    return $.extend(true, {}, oldObject);
};
Helper.prototype.shallowCopy = function(oldObject) {
    return $.extend({}, oldObject);
};

},{}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js":[function(require,module,exports){
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
},{"./Helper.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Timeline.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js":[function(require,module,exports){
var Story = require('./Story.js');
var Helper = require('./Helper.js');

module.exports = StoryFactory;
function StoryFactory(opts){
	if (!(this instanceof StoryFactory)) return new StoryFactory(opts);
	return this;
}

StoryFactory.prototype.generate = function() {

};
},{"./Helper.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js":[function(require,module,exports){
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
},{"./Frame.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js":[function(require,module,exports){
var helper = require('./Helper.js')().get();

module.exports = Wizard;

function Wizard(steps, endCallback) {
    if (!(this instanceof Wizard)) return new Wizard(steps);
    this.steps = [];
    this.endCallback = endCallback;
    this.current = 0;
    this.Step = Step;
    this.getHelper = function(obj) {
        return new FormHelper(obj)
    };
    this.context = {};
    for (var i = 0; i < steps.length; i++) {
        this.steps.push(new this.Step(steps[i].data, steps[i].callback, steps[i].first, steps[i].last));
    }
    return this;
}
Wizard.prototype.show = function() {
    /*
        create the div, 
        append it to the body,
        return it for further manipolation
    */
};
Wizard.prototype.start = function() {
    this.current = 0;
    this.context = {};
    this.context.wizard = this;
    this.steps[this.current].go(this.context);
};
Wizard.prototype.next = function() {
    this.current++;
    this.steps[this.current].go(this.context);
};
Wizard.prototype.previous = function() {
    if (this.current === 0) return;
    this.context = this.steps[this.current].snapshot;
    this.current--;
    this.steps[this.current].go(this.context); // go(this.context) to save context also on previous ;
};
Wizard.prototype.reload = function() {
    this.steps[this.current].go(this.steps[this.current].getSnapshot());
};
Wizard.prototype.exit = function() {
    if (this.endCallback)
        this.endCallback(this.context);
};

function Step(_data, _cb, first, last) { //wraps a step of the wizard
    if (!(this instanceof Step)) return new Step(_cb);
    this.snapshot = {};
    this.data = _data;
    this.callback = _cb;
    this.last = last || false;
    this.first = first || false;
    return this;
}
Step.prototype.go = function(_context) { // <-- context comes from wizard
    var context = _context;
    this.snapshot = helper.deepCopy(context); // <-- save the context for rollback
    var self = this;
    var confirmButtonText = "next >>";
    if (self.last) {
        confirmButtonText = "done!";
    }
    setTimeout(
        function() {
            swwi({
                    title: "Wizard - step " + (context.wizard.current + 1) + "/" + context.wizard.steps.length,
                    text: self.data.text,
                    type: "info" || self.data.type,
                    showCancelButton: !self.first,
                    confirmButtonText: confirmButtonText,
                    closeOnConfirm: true
                }, function(isConfirm) {
                    context.calls = context.calls || 0;
                    context.calls++;
                    if (isConfirm) {
                        if (self.last) {
                            context.wizard.exit();
                        } else {
                            context.wizard.next();
                        }
                    } else {
                        context.wizard.previous();
                    }
                },
                function(handler) {
                    $(handler).html(''); //reset the custom div
                    self.callback(handler, context); // <-- pass context to the inner function of the step. 
                });
        }, 1000);


};
Step.prototype.getSnapshot = function(context) {
    return helper.deepCopy(this.snapshot); //<--return 
};


function FormHelper(handler) {
    if (!(this instanceof FormHelper)) return new FormHelper(handler);
    this.handler = handler;
    this.$form = $(document.createElement('form'));
    this.$handler = $(this.handler);
    this.$handler.append(this.$form);
    return this;
}

FormHelper.prototype.addField = function(label, value, field, onChange) {
    var _label = $(document.createElement('label')).html(label);

    this.$form.append(_label);
    this.$form.append(field);

    if (value) field.val(value);

    field.focus();
    return this;

}

FormHelper.prototype.addTextField = function(label, value, onChange) {
    var _input = $(document.createElement('input')).attr('type', 'text').change(function() {
        onChange(_input.val());
    });
    return this.addField(label, value, _input, onChange);
};

FormHelper.prototype.addSelect = function(label, value, data, onChange) {
    var s = $('<select />');
    for (var val in data) {
        $('<option />', {
            value: val,
            text: data[val]
        }).appendTo(s);
    }
    s.change(function() {
        onChange(s.val());
    });    
    return this.addField(label, value, s, onChange);
};

},{"./Helper.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\storify.js":[function(require,module,exports){
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

},{"./Helper.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js","./StoryFactory.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js","./Wizard.js":"Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js"}]},{},["Z:\\Github\\fuzzy-octo-location\\public\\js\\storify\\storify.js"]);
