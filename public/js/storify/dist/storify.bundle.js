(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js":[function(require,module,exports){
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

},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js":[function(require,module,exports){
var EventType = require('./EventType.js');
module.exports = Event;
function Event(opts){
	if (!(this instanceof Event)) return new Event(opts);
	this.type = EventType.GENERIC;
	this.start_frame = opts.start_frame || 0;
	this.end_frame = opts.end_frame ||0;
	this.end_time = opts.end_time || 0;
	this.start_time = opts.start_time ||0;
	this.data = opts.data || {};
	return this;
}
},{"./EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js":[function(require,module,exports){
module.exports ={
	GENERIC : {id : 000, type : 'GENERIC'},
	POSITION : {id : 100, type : 'POSITION'},
	PHOTO : {id : 200, type : 'PHOTO'},
	VIDEO  :{id : 300, type : 'VIDEO'},
	MUSIC  :{id : 400, type : 'MUSIC'},
};
},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js":[function(require,module,exports){
var EventType = require('./EventType.js');
var GpsEvent = require('./GpsEvent.js');
var Event = require('./Event.js');

module.exports = Frame;

function Frame(opts){
	if (!(this instanceof Frame)) return new Frame(opts);
	this.index = opts.index || 0; // index of the frame, relative to the timeline
	this.time =  opts.time || 0; // Date
	this.events = opts.events || []; //cache degli eventi
	return this;
}

Frame.prototype.getPositionEvent = function(first_argument) {
	for (var i = 0; i < this.events.length; i++) {
		if (this.events[i].type === EventType.POSITION){
			return this.events[i];
		}
	}
};

Frame.prototype.getEventsByType = function(type) {
	var ret =[];
	for (var i = 0; i < this.events.length; i++) {
		if (this.events[i].type === type){
			ret.push(this.events[i]);
		}
	}
	return ret;
};
},{"./Event.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","./GpsEvent.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js":[function(require,module,exports){
var inherits = require('inherits');
var Event = require('./Event.js');
var EventType = require('./EventType.js');

module.exports = GpsEvent;
function GpsEvent(opts){
	if (!(this instanceof GpsEvent)) return new GpsEvent(opts);
	Event.call(this,opts);
	this.position = opts.position || new google.maps.LatLng(0, 0);
	this.type = EventType.POSITION;
	return this;
};

inherits(GpsEvent,Event);
},{"./Event.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js":[function(require,module,exports){
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

Helper.prototype.extend = function(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }

    return a;
};

Helper.prototype.maximize = function($div) {
    $div.width($(window).width());
    $div.height($(window).height());
};

Helper.prototype.debounce = function(func, threshold, execAsap) {
    var timeout;

    return function debounced() {
        var obj = this,
            args = arguments;

        function delayed() {
            if (!execAsap)
                func.apply(obj, args);
            timeout = null;
        };

        if (timeout)
            clearTimeout(timeout);
        else if (execAsap)
            func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 100);
    };
};

},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js":[function(require,module,exports){
(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js":[function(require,module,exports){
var Timeline = require('./Timeline.js');
var Helper = require('./Helper.js');
module.exports = Story;



/**
 * Class Story
 *  -  TIMELINE {
 *  	contiene i frames, ha dei metodi tipo
 *  		- getFrameAtX() // x= [time, percentage, index]
 *  		- getFramesFrom(start,end).each()
 *  		- getStart, getEnd
 *  		+ trim, add, 
 *  }
 *  -  EVENTPOOLER {
 *  	contiene la lista delle fonti
 *  	contiene una cache degli eventi scannati dalle varie fonti
 *  	quando carica un evento da una fonte lo trasforma in un Event
 *  	/**** POSSIBILE IMPLEMENTAZIONE : bind a browser event
 *   		ad ogni evento associa un trigger che risponde and un ev = requested timestart, timend, callback
 *   		quando un ev requested è lanciato, l'evento controlla se timestart e timend rientrano nel range e in caso esegue la callback
 * 		contiene dei metodi tipo
 * 		metodo principale : getEvents(start,end,callback){
 *   		trigger requested timestart timend callback     		
 * 		}
 * 	-  StoryUI - espone tutti i metodi per la visualizzazione (tipo getEvents, , )
 * 	-  StoryCrafter - espone tutti i metodi per modificare la storia (tipo setEvents, , )
 *  
 *  }
 *  
 * @param {[type]} opts [description]
 */
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
},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Timeline.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js":[function(require,module,exports){
var Story = require('./Story.js');
var Helper = require('./Helper.js');

module.exports = StoryFactory;
function StoryFactory(opts){
	if (!(this instanceof StoryFactory)) return new StoryFactory(opts);
	this.opts = opts || {};
	return this;
}

StoryFactory.prototype.generate = function() {
	return new Story(this.opts);
};
},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js":[function(require,module,exports){
var Frame = require('./Frame.js');

module.exports = Timeline;

function Timeline(opts) {
    if (!(this instanceof Timeline)) return new Timeline(opts);
    this.scale = opts.scale || 1; // delta minutes between frames
    this.frames = opts.frames || [];
    this.start = opts.start || 0; // ms
    this.end = opts.end || 0; // ms
    this.events = opts.events || [];

    this.initialize();

    return this;
}

/**
 * 1- crea l'array di Frame
 * @return list of events created during initialization
 */

Timeline.prototype.initialize = function() {
    console.warn('starting initialization');
    var GpsEvent = require('./GpsEvent.js');
    var startMs = this.start.getTime();
    var endMs = this.end.getTime();
    var diffMs = endMs - startMs;
    var diffm = diffMs / 1000 / 60;
    var diffh = diffm / 60;
    var diffd = diffh / 24;
    var self = this; //things are gonna get messy
    var lat = GLOBALS.position.coords.latitude;
    var lng = GLOBALS.position.coords.longitude;
    var ev = new GpsEvent({
        position: new google.maps.LatLng(lat, lng),
        start_frame : 0,
        end_frame : diffm-1,
        start_time : startMs,
        end_time : endMs
    });

    this.steps = diffm / this.scale;
    for (var i = 0; i < this.steps; i++) {        
        var frame = new Frame({
            index: i,
            time: startMs + (i * 1000 * 60 * this.scale),
            events: [ev] //cache is initialized 
        });
        this.frames.push(frame);
    }
    this.events.push(ev);
};



Timeline.prototype.getFrameAtPerc = function(_p) {
    var percentage = Math.max(0, Math.min(_p,100));
    var offset = ((percentage / 100) * (this.steps -1)).toFixed(0);
    return this.frames[offset];
};
},{"./Frame.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js","./GpsEvent.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js":[function(require,module,exports){
var helper = require('./Helper.js')().get();

module.exports = Wizard;

function Wizard(title, steps, endCallback) {
    if (!(this instanceof Wizard)) return new Wizard(steps);
    this.title = title;
    this.steps = [];
    this.endCallback = endCallback;
    this.current = 0;
    this.Step = Step;
    this.getHelper = function(obj) {
        return new FormHelper(obj);
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
                    title: context.wizard.title + "(" + (context.wizard.current + 1) + "/" + context.wizard.steps.length + ")",
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
    this.fields = [];
    return this;
}
FormHelper.prototype.focus = function() {
	this.fields[0].focus();
};

FormHelper.prototype.addField = function(label, value, field, onChange) {
    var _label = $(document.createElement('label')).html(label);
    this.$form.append(_label);
    this.$form.append(field);
    this.$form.append('<br>');
    this.fields.push(field);
    if (value) field.val(value);
    return this;
};

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

FormHelper.prototype.addDateField = function(label, value, onChange) {
    var _input = $(document.createElement('input')).attr('type', 'text').change(function() {
        onChange(_input.val());
    });
    _input.datepicker();
    return this.addField(label, value, _input, onChange);
};

},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js":[function(require,module,exports){
module.exports = SEngine;

function SEngine(opts){
	if (!(this instanceof SEngine)) return new SEngine(opts);
	this.modules = {};

	return this;
};

/**
 * Start the engine
 * @param  {[type]} modules -- CLASS NAMES !!!!! NOT OBJECT
 * @return {[type]} this
 */
SEngine.prototype.start = function(modules) { //modules contains class name !!!!!
	for (var i = 0; i < modules.length; i++) {
		var smodule = modules[i];
		this.modules[smodule.name] = smodule.start();
		
	};
	
	return this;
};
},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = GMapModule;

/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
function GMapModule(opts) {
    if (!(this instanceof GMapModule)) return new GMapModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'GMapModule',
        id: 'GMAP'
    });

    this.selector = opts.selector; // where the map will be displayed

    this.mapOptions = {
        center: new google.maps.LatLng(41.54, 12.30),
        disableDefaultUI: true,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});

    return this;
}

inherits(GMapModule, SModule);

GMapModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('GMapModule started');
    this.$elector = $(document.getElementById(this.selector));
    this.adjustSize();
    this.map = new google.maps.Map(document.getElementById(this.selector), this.mapOptions);
    var center;

    function calculateCenter() {
        center = self.map.getCenter();
    }
    google.maps.event.addDomListener(this.map, 'idle', function() {
        calculateCenter();
        console.info('idle', center);
    });
    $(window).smartresize(function() {
        self.map.setCenter(center);
        console.info('resize', center);
    });
    this.marker = new google.maps.Marker({
        position: this.mapOptions.center,
        map: this.map
    });

    return this;
};

GMapModule.prototype.adjustSize = function() {
    var $elector = this.$elector;
    helper.maximize($elector);
    $(window).smartresize(
        function() {
            helper.maximize($elector);
        });
};


GMapModule.prototype.onFramePicked = function(frame) {
    var self = this; //things are gonna get nasty
    this.marker.setPosition(frame.getPositionEvent().position);
    if (this.editMode) { //in edit mode just move the mark
        
    } else {
        this.debounce(
            function() {
                //console.info(self.name + '[' + self.id + ']' + ' updated ', frame);
                //console.info(frame.getPosition());
                self.updatePosition(frame.getPositionEvent().position);
            }, 1000 / 33
        );
    }
};

GMapModule.prototype.updatePosition = function(position, opt) {
    var options = opt || {};

    this.map.setCenter(position);
};

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js":[function(require,module,exports){
module.exports = SModule;
var inherits = require('inherits');
var helper = require('../Helper.js')();

function SModule(opts) {
    if (!(this instanceof SModule)) return new SModule(opts);
    opts = helper.extend({}, opts);
    /*Common ops*/
    this.name = opts.name || 'Generic module';
    this.id = opts.id || 'SModule';
    this.postInit = opts.postInit || this.postInit;
    this.editMode =  opts.editMode || [];
    this.requirement = opts.requirement || [];
    return this;
};

/**
 * performs common operations
 *  - if callback is defined, then it is executed. //anonymous modules
 *  - if not, if the 'abstract' method postInit is executed. // modules extending this
 *
 * !!! args unchecked if you pass callback you have to pass params ({})
 *
 * @param {Map} opttions override the default [ name,  ]
 * @param  {Function} callback -- default is function(engine) {  return engine;  }
 * @return {[type]}
 */
SModule.prototype.start = function(callback) {
    /*starts the module*/
    if (callback) {
        return callback(this);
    } else {
        return this.postInit();
    }
};

SModule.prototype.postInit = function() {
    console.warn('default post init called. is quite strange, isnt it?');
    console.info(this.name + '[' + this.id + ']' + ' started');
    return this;
};

SModule.prototype.onFramePicked = function(frame) {
    console.warn('default onFramePicked called. is quite strange, isnt it?');
    console.info(this.name + '[' + this.id + ']' + ' updated ', frame);
    return this;
};

SModule.prototype.debounce = function(callback, delay) {
    this.lastCall = this.lastCall || 0;
    var now = new Date().getTime();
    if (now - this.lastCall > delay) {
        callback();
        this.lastCall = now;
    }
};

SModule.prototype.attach = function(module) {
    this.listeners = this.listeners || {};
    this.listeners.push(module);
    return this;
};
SModule.prototype.attachTo = function(target) {
    target.attach(this);
    return this;
};
SModule.prototype.require = function(target) {
    target.attach(this);
    return this;
};
},{"../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var helper = require('../Helper.js')();
var smartresize = require('../Smartresize.js');

module.exports = TimelineModule;

/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
function TimelineModule(story, opts) {
    if (!(this instanceof TimelineModule)) return new TimelineModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'TimelineModule',
        id: 'GMAP'
    });
    this.selector = opts.selector; // timeline wrapper
    this.listeners = [];
    this.story = story; //story.js object
    return this;
}

inherits(TimelineModule, SModule);


/**
 * DOM READY HERE
 * @return {[type]} [description]
 */
TimelineModule.prototype.postInit = function() {
    console.info('TimelineModule started', this.story.timeline);
    var self = this; //things are gonna get nasty

    this.$elector = $(document.getElementById(this.selector));
    this.$elector.show();

    $(window).smartresize(function() {
        self.$dragger.setPosition(self._bk);
    });

    this.$dragger = $($('<div class="draggable"></div>'));
    this.$elector.append(this.$dragger);
    this._bk = 0;

    this.$dragger.getMaxPx = function() {
        return (self.$elector.width() - self.$dragger.width());
    }
    this.$dragger.getPosition = function() {
        return (100 * (self.$dragger[0].offsetLeft / self.$dragger.getMaxPx()).toFixed(10));
    }
    this.$dragger.setPosition = function(percentage) {
        var offset = (percentage / 100) * self.$dragger.getMaxPx();
        //console.info(offset);
        self.$dragger.css('left', offset);
    }
    this.$dragger.pickFrame = function() {
        return self.story.timeline.getFrameAtPerc(self.$dragger.getPosition());
    }
    this.$dragger.draggable({
        containment: "parent",
        drag: function() {
            //console.info(new Date(self.$dragger.pickFrame().time));
            //helper.debounce(self.notify)();
            self.notify();
        },
        stop: function() {

        }
    });
    return this;
};

TimelineModule.prototype.notify = function() {
    var frame = this.$dragger.pickFrame();
    for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        if (listener.onFramePicked) {
            listener.onFramePicked(frame);
        }
    };
    return this;
};

},{"../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\storify.js":[function(require,module,exports){
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
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        GLOBALS.position = position;
                        startStorify(null, user);
                    });
                } else {
                    startStorify(null, user);
                }
            }, function failure(err) {
                console.info(err, null);

            });
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                GLOBALS.position = position;
                startStorify(null, null);
            });
        } else {
            startStorify(null, null);
        }

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
             selector: 'map-canvas'
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
                gmm
                ,postInitializer
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

},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js","./StoryFactory.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js","./Wizard.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js","./engine/SEngine.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js","./modules/GMapModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule.js","./modules/SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./modules/TimelineModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js"}]},{},["H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\storify.js"]);
