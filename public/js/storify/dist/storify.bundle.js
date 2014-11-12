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

function Event(opts) {
    if (!(this instanceof Event)) return new Event(opts);
    this.type = EventType.GENERIC;
    this.start_frame = opts.start_frame || 0;
    this.end_frame = opts.end_frame || 0;
    this.end_time = opts.end_time || 0;
    this.start_time = opts.start_time || 0;
    this.data = opts.data || {};
    this.subtype = opts.subtype || {};
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
	this.speed = opts.speed || 0;
	this.distance = opts.distance || 0; //m
	this.real_time = opts.real_time || 0; //ms date
	this.isReal = opts.isReal || false;
	this.interpolated = opts.interpolated || false;
	this.next = opts.next || {};
	this.prev = opts.prev || {};
	this.skipped = opts.skipped || [];
	this.type = EventType.POSITION;
	return this;
};

inherits(GpsEvent,Event);
},{"./Event.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js":[function(require,module,exports){
module.exports = Helper;

function Helper() {
    if (!(this instanceof Helper)) return new Helper();
    this.DATE_FORMAT = 'dd MM hh:ii';
    this.FB_DATE = 'dd/mm/yyyy hh:ii'
    return this;
}
Helper.prototype.get = function() {
    return this;
};
Helper.prototype.dateToString = function(date) {
    return $.formatDateTime(this.DATE_FORMAT, date);
};
Helper.prototype.toFbDate = function(date) {
    return date.getTime();
};
Helper.prototype.msToString = function(date) {
    return $.formatDateTime(this.DATE_FORMAT, new Date(date));
};
Helper.prototype.deltaToString = function(delta) {
    var deltaS = ((delta / 1000) % 60).toFixed(0);
    var deltaM = ((delta / 1000 / 60) % 60).toFixed(0);
    var deltaH = ((delta / 1000 / 60 / 60) % 24).toFixed(0);
    return deltaH + 'h ' + deltaM + 'm ' + deltaS + 's';
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
Helper.prototype.random = function(min, max) {
    return Math.random() * (max - min) + min;
};
Helper.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

Helper.prototype.distance = function(from, to) {
    try {
        return google.maps.geometry.spherical.computeDistanceBetween(from, to);
    } catch (e) {
        return 0;
    }
};
Helper.prototype.speedMS = function(from, to, ms) {
    var m = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    var speed = m / (1000 * ms);
    return speed;
};
Helper.prototype.speedKmH = function(from, to, ms) {
    var speedKm = (this.speedMS(from, to, ms) //m/s
        * 60 // m/min
        * 60 // m/h
    ) / 1000; //km/h
    return speedKm;
};





Helper.prototype.easeInOutQuad = function(t, b, c, d) {
    if (t < d / 2) return 2 * c * t * t / (d * d) + b;
    var ts = t - d / 2;
    return -2 * c * ts * ts / (d * d) + 2 * c * ts / d + c / 2 + b;
}


Helper.prototype.setUIModes = function(view, edit) {
    if (edit && !$('#UI-EDIT').hasClass('active')) {
        $('#UI-EDIT').addClass('active');
    };
    if (view && !$('#UI-VIEW').hasClass('active')) {
        $('#UI-VIEW').addClass('active');
    };

};



/**/

Helper.prototype.interpolate = function(val, min, max, new_min, new_max) {
    //         (b - a)(x - min)
    // f(x) = -- -- -- -- -- -- -- + a
    //             max - min
    //             

    var fx = new_min + (((new_max-new_min)*(val - min))/(max - min))
    return fx;
};
Helper.prototype.dayOfTheYear = function(date) {
    var j1 = new Date(date);
    j1.setMonth(0, 0);
    return Math.round((date - j1) / 8.64e7);
}
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
var helper = require('./Helper.js')();
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
	this.opts = helper.extend({}, opts);
	if (!(this instanceof Story)) return new Story(this.opts);
	this.helper = helper;
	this.timeline = this.opts.timeline || new Timeline(this.opts.timelineOpts || {});
	this.title = this.opts.title || 'untitled story';
	this.description = this.opts.description || 'new story to be filled';
	this.author = this.opts.author || -1;
	this.participants = this.opts.participants || [];
	this.createdOn = this.opts.createdOn || this.helper.dateToString(new Date());
	return this;
}
},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Timeline.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js":[function(require,module,exports){
var Story = require('./Story.js');
var helper = require('./Helper.js')();

module.exports = StoryFactory;
function StoryFactory(opts){
	if (!(this instanceof StoryFactory)) return new StoryFactory(opts);
	this.opts = helper.extend({
        name: 'Story Factory',
        id: 'StoryFactory'
    }, opts);
    this.name = opts.name;
    this.id = opts.id;
	return this;
}

StoryFactory.prototype.generate = function() {
	return new Story(this.opts);
};
},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js":[function(require,module,exports){
var Frame = require('./Frame.js');
var helper = require('./Helper.js')();

module.exports = Timeline;

function Timeline(opts) {
    if (!(this instanceof Timeline)) return new Timeline(opts);
    this.scale = opts.scale || 1; // delta minutes between frames
    this.frames = opts.frames || [];
    this.start = opts.start || 0; // ms
    this.end = opts.end || 0; // ms
    this.events = opts.events || [];
    if (opts.saved) {} else {
        this.initialize();
    }
    return this;
}

/**
 * 1- crea l'array di Frame
 * @return list of events created during initialization
 */



Timeline.prototype.initialize = function() {
    var startMs = this.start.getTime();
    var endMs = this.end.getTime();
    var diffMs = endMs - startMs;
    var diffm = diffMs / 1000 / 60;
    var diffh = diffm / 60;
    var diffd = diffh / 24;
    var self = this; //things are gonna get messy
    var lat = GLOBALS.position.coords.latitude;
    var lng = GLOBALS.position.coords.longitude;


    this.steps = (diffm / this.scale).toFixed(0);
    for (var i = 0; i < this.steps; i++) {
        var frame = new Frame({
            index: i,
            time: startMs + (i * 1000 * 60 * this.scale),
            events: [] //cache is initialized 
        });
        this.frames.push(frame);
    }
    //console.info('Timeline initialized', this.start,this.end, ' steps: ',this.steps);
    //console.info(this);
};

Timeline.prototype.getMsStep = function() {
    return this.scale * 60 * 1000;
};
Timeline.prototype.getPercAtFrame = function(_f, _precision) {
    var precision = _precision || 2;
    var frameIndex = Math.max(0, Math.min(_f, this.steps - 1));
    var offset = ((frameIndex / (this.steps - 1)) * (100)).toFixed(precision);
    return offset;
};
Timeline.prototype.getFrameAtPerc = function(_p) {
    var percentage = Math.max(0, Math.min(_p, 100));
    var offset = ((percentage / 100) * (this.steps - 1)).toFixed(0);
    return this.frames[offset];
};

Timeline.prototype.extend = function(newstart, newend) {
    //console.info(this.frames, helper.shallowCopy(this.frames));
    var frameCopy = helper.shallowCopy(this.frames);
    this.start = newstart;
    this.end = newend;
    this.frames = [];
    for (var i = this.events.length - 1; i >= 0; i--) {
        if (this.events[i].subtype && this.events[i].subtype === '__auto') {
            this.events = this.events.splice(i, 1); //index, howmany
        }
    };
    this.initialize();
};

Timeline.prototype.addEvent = function(event) {
    this.events.push(event);
    for (var i = event.start_frame; i <= event.end_frame; i++) {
        this.frames[i].events.push(event); //cache
    };
};

},{"./Frame.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js","./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js":[function(require,module,exports){
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
},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\CameraPostProcessor.js":[function(require,module,exports){
  var helper = require('./../Helper.js')();
  var SModule = require('./SModule.js');
  var inherits = require('inherits');
  module.exports = CameraPostProcessor;

  function CameraPostProcessor(scene, camera, renderer, opts) {
      if (!(this instanceof CameraPostProcessor)) return new CameraPostProcessor(scene, camera, renderer, opts);
      opts = helper.extend({
          name: 'CameraPostProcessor',
          id: 'CameraPostProcessor'
      }, opts);
      SModule.call(this, opts);
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;

      this.opts = opts;
      this.composer = undefined;
      return this;
  }

  inherits(CameraPostProcessor, SModule);

  CameraPostProcessor.prototype.render = function(a) {
      if (this.composer)
          this.composer.render(a);
  };

},{"./../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\DisplayPath.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = DisplayPathModule;


function DisplayPathModule(opts) {
    if (!(this instanceof DisplayPathModule)) return new DisplayPathModule(opts);
    opts = helper.extend({
        name: 'DisplayPathModule',
        id: 'DisplayPathModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);

    this.parent = opts.parent; // where the map will be displayed
    this.opts = opts;
    return this;
}

inherits(DisplayPathModule, SModule);

DisplayPathModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('GMapModule started');
}

DisplayPathModule.prototype.clearPaths = function() {
    var gmm = this.required('gmm');
    if (gmm.polys) {
        for (var i = 0; i < gmm.polys.length; i++) {
            gmm.polys[i].setMap(null);
        };
    }
}
DisplayPathModule.prototype.addPath = function(map, points, color) {
    var gmm = this.required('gmm');
    if (!gmm.polys) gmm.polys = [];
    var pol = new google.maps.Polyline({
        path: points,
        strokeColor: color,
        strokeOpacity: 0.6,
        strokeWeight: 5
    });
    pol.setMap(map);
    gmm.polys.push(pol);
};
DisplayPathModule.prototype.consume = function(frame) {
    var self = this; //things are gonna get nasty
    var gmm = this.required('gmm');
    var ev = frame.getPositionEvent();
    if (ev && this.enabled) {
        this.clearPaths();
        //console.info(ev.index + ') R: (' + ev.isReal + ') I: (' + ev.interpolated + ') - dT: (' + helper.deltaToString(ev.real_time - ev.end_time) + ')');
        //console.info(ev.position);
        if (ev.interpolated) {
            self.addPath(gmm.map, [ev.prev.position, ev.next.position], '#FF0000');
        } else {
            self.addPath(gmm.map, [ev.position].concat(ev.skipped), '#000000');

        }
    }
}

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\Earthmodule.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = EarthModule;

var minutes = 1000 * 60;
var hours = minutes * 60;
var days = hours * 24;
var years = days * 365;
var d = new Date();
var t = d.getTime();
var y = Math.round(t / years);

function EarthModule(opts) {
    if (!(this instanceof EarthModule)) return new EarthModule(opts);
    this.opts = helper.extend({
        name: 'EarthModule',
        id: 'EarthModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    this.canvas = this.opts.parent; // where the canvas will be displayed
    this.mapOptions = helper.extend(this.mapOptions, this.opts.mapOptions || {});
    this.submodules = [];
    return this;
}

inherits(EarthModule, SModule);

var HW = require("./earthmodule/EarthModule.Hardware.js");
var SM = require("./earthmodule/EarthModule.SceneManager.js");
var EARTH = require("./earthmodule/EarthModule.Earth.js");
var EarthModuleRAFProducer = require("./earthmodule/EarthModule.RAFProducer.js");
var EarthModuleCameraPostProcessor = require('./earthmodule/EarthModule.CameraPostProcessor.js');


EarthModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('EarthModule started');
    self.hw = new HW(self, {}).start(); //Init hardware
    self.sm = new SM(self, {}).start(); //Init scene manager
    /*OBJECTS TO DISPLAY*/
    self.earth = new EARTH(self, {}).start(); //Planet earth
    if (this.opts.submodules && this.opts.submodules.length>0){
        var submodules = this.opts.submodules;
        for (var i = 0; i < submodules.length;   i++) {
            var submodule = submodules[i];   
        };
    }

    var pp = new EarthModuleCameraPostProcessor(self, self.sm.scene, self.hw.camera, self.hw.renderer, {});

    /*Create a ticker:
        1 - run the loop passed as arguments ()
     */
    self.ticker = new EarthModuleRAFProducer(
        self, {}, //parent, options 
        function(framecount, earthmodule) { //main loop. 
            earthmodule.hw.controls.update();
            earthmodule.hw.renderer.render(earthmodule.sm.scene, earthmodule.hw.camera);
            self.produce(framecount);
        }).start();

    /**/
    if (this.opts.callbacks && this.opts.callbacks.postInit) {
        this.opts.callbacks.postInit();
    }
    return this;
};

EarthModule.prototype.produce = function(framecount) {
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume(framecount,'FRAMECOUNT');
    };
};
EarthModule.prototype.consume = function(frame) { //

};

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./earthmodule/EarthModule.CameraPostProcessor.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.CameraPostProcessor.js","./earthmodule/EarthModule.Earth.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Earth.js","./earthmodule/EarthModule.Hardware.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Hardware.js","./earthmodule/EarthModule.RAFProducer.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.RAFProducer.js","./earthmodule/EarthModule.SceneManager.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.SceneManager.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule.js":[function(require,module,exports){
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
function GMapModule(story, opts) {
    if (!(this instanceof GMapModule)) return new GMapModule(story, opts);
    opts = helper.extend({
        name: 'GMapModule',
        id: 'GMapModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.parent = opts.parent; // where the map will be displayed
    this.mapOptions = {
        center: new google.maps.LatLng(41.54, 12.30),
        disableDefaultUI: true,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});
    this.story = story; //story.js object
    this.opts = opts;
    return this;
}

inherits(GMapModule, SModule);

GMapModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('GMapModule started');
    this.$elector = $($("<div id='map-canvas'></div>"));
    this.parent.append(this.$elector);
    this.adjustSize();
    this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);



    var center;

    function calculateCenter() {
        center = self.map.getCenter();
    }
    google.maps.event.addDomListener(this.map, 'idle', function() {
        calculateCenter();
    });
    $(window).smartresize(function() {
        self.map.setCenter(center);
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


GMapModule.prototype.consume = function(frame) {
    var self = this; //things are gonna get nasty
    var ev = frame.getPositionEvent();
    if (ev) {
        this.marker.setPosition(frame.getPositionEvent().position);


        if (this.editMode) { //in edit mode just move the mark

        } else {
            self.updatePosition(frame.getPositionEvent().position);

        }
    }
};



GMapModule.prototype.updatePosition = function(position, opt) {
    var options = opt || {};
    this.map.setCenter(position);
};









// this.debounce(
//     function() {
//         //console.info(self.name + '[' + self.id + ']' + ' updated ', frame);
//         //console.info(frame.getPosition());
//         self.updatePosition(frame.getPositionEvent().position);
//     }, 1000 / 33
// );

// console.info('frameTime: ' + helper.dateToString(new Date(ev.end_time)) + ' --- real time: ' + helper.dateToString(new Date(ev.real_time)));

//console.info('*****FRAME '+ev.index+' DUMP');
//console.info( ev.index + ') R: (' + ev.isReal + ') I: (' + ev.interpolated + ') - dT: (' + helper.deltaToString(ev.real_time - ev.end_time) + ')' );
//console.info(ev.prev.index + ' ---> ' + ev.index + (ev.interpolated ? '*' : '' ) + ' ---> ' + ev.next.index );

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\ModulesManager.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = ModulesManager;


function ModulesManager(opts) {
    if (!(this instanceof ModulesManager)) return new ModulesManager(opts);
    opts = helper.extend({
        name: 'ModulesManager',
        id: 'ModulesManager'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.parent = opts.parent; // where the UI will be displayed 
    this.opts = opts;
    return this;
}

inherits(ModulesManager, SModule);

ModulesManager.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('ModulesManager started');
    var self = this; //things are gonna get nasty
    //this.win -- this.win.$title -- this.win.$content
    this.win = this.createModalWindow(
        'ModulesManager', // Title
        { //options
            content: '', //html to be displayed
            resizable: false,
            modal: true,
            width: 200,
            height: 150
        },
        this.parent); //parent div
    this.refresh();
}
ModulesManager.prototype.refresh = function() {
    var self = this; //things are gonna get nasty
    var html = '<p style="font-size:0.8em">List of modules installed</p>';
    this.win.$content.html(html);
    var ul = $('<ul style="list-style-type:none"></ul>');
    for (var i = 0; i < this.listeners.length; i++) {
        var module = this.listeners[i];
        var li = $("<li>" + module.name + "</li>");
        var check = $('<input type="checkbox"></input>');
        check.prop('val', i);
        li.prepend(check);
        check.prop('checked', module.enabled);
        check.click(function(el) {
            self.listeners[$(el.target).prop('val')].toggle(check.is(':checked'));
            setTimeout(function() {
                self.refresh();
            }, 500);
        });
        ul.append(li);
    };
    this.win.$content.append(ul);

}

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\PlayBackModule.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = PlayBackModule;


function PlayBackModule(opts) {
    if (!(this instanceof PlayBackModule)) return new PlayBackModule(opts);
    opts = helper.extend({
        name: 'PlayBackModule',
        id: 'PlayBackModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);

    this.opts = opts;
    return this;
}

inherits(PlayBackModule, SModule);

PlayBackModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    var tmm = this.required('tmm');
    console.info('PlayBackModule  started');

    this.win = this.createModalWindow(
        'Playback', // Title
        { //options
            id: 'PlaybackWindows',
            content: '', //html to be displayed
            resizable: false,
            modal: false,
            width: 400,
            height: 150,
            position: {
                top: '90%',
                left: '0px'
            }
        },
        this.UIview); //parent div
    this.win.width($(window).width());

    $(window).smartresize(function() {
        self.win.width($(window).width());
    });
    this.win.$content.append(
        this.createButton(tmm.playback ? '||' : '->', function(btn, module) {
            tmm.togglePlay();
            btn.$text.html(tmm.playback ? '||' : '->');
        })
    );




    $(document).keydown(function(e) {
        switch (e.which) {
            case 32: //space bar

                return;
            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    return this;
}
PlayBackModule.prototype.consume = function(frame) {
    var self = this; //things are gonna get nasty
    var ev = frame.getPositionEvent();

}

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js":[function(require,module,exports){
module.exports = SModule;
var inherits = require('inherits');
var helper = require('../Helper.js')();

function SModule(opts) {
    opts = opts || {};
    if (!(this instanceof SModule)) return new SModule(opts);
    this.opts = helper.extend({}, opts);
    /*Common ops*/
    this.started = false;
    this.enabled = opts.enabled || false;
    this.name = opts.name || 'Generic module';
    this.id = opts.id || 'SModule';
    this.postInit = opts.postInit || this.postInit;
    this.editMode = opts.editMode || false;
    this.requirement = opts.requirement || {};
    this.callbacks = opts.callbacks || {};
    this.UIedit = $("<div  id='UIedit_" + this.name + "'></div>");
    this.UIview = $("<div  id='UIview_" + this.name + "'></div>");

    this.consumers = [];

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
    this.started = true;
    $('#UI-EDIT').append(this.UIedit);
    $('#UI-VIEW').append(this.UIview);
    /*starts the module*/
    this.updateStatus();
    if (callback) {
        return callback(this);
    } else {
        return this.postInit();
    }
};

SModule.prototype.postInit = function() {
    if (this.callbacks && this.callbacks.postInit) {
        return this.callbacks.postInit();
    }
    console.warn('default post init called. is quite strange, isnt it?');
    console.info(this.name + '[' + this.id + ']' + ' started');
    return this;
};


SModule.prototype.toggle = function(newState) {
    this.enabled = newState || !this.enabled;
    this.updateStatus();
}
SModule.prototype.updateStatus = function() {
    if (!this.enabled) {
        this.UIedit.hide();
        this.UIview.hide();
    } else {
        this.UIedit.show();
        this.UIview.show();
    }
};



SModule.prototype.produce = function() {
    console.warn('default [produce] called by ' + this.name + '. is quite strange, isnt it?');
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({});
    };
};

SModule.prototype.consume = function(obj) {
    if (this.callbacks && this.callbacks.consume) { //Hookup to anonymous consumers passed in options
        return this.callbacks.consume(obj);
    }
    console.warn(this.name + ' default [consume] called. is quite strange, isnt it?', obj);
    return this;
};
SModule.prototype.addConsumer = function(module) {
    this.consumers.push(module);
    return this;
};
SModule.prototype.addProducer = function(source) {
    source.addConsumer(this);
    return this;
};
/**
 * Create an anon consumer module, to excecute a 
 * @param  {Function} callback [description]
 * @param  {[type]}   producer [description]
 * @return {[type]}            [description]
 */
SModule.prototype.bindToProducer = function(callback, producer) {
    var self = this; //things are gonna get nasty
    return new SModule({
        callbacks: {
            id: self.id + '_' + producer.id,
            name: 'bridge',
            consume: callback
        }
    }).addProducer(producer);
};






SModule.prototype.require = function(id, target) {
    this.requirement[id] = target;
    return this;
};
SModule.prototype.required = function(id) {
    if (!this.requirement[id]) console.error(id + ' required by ' + this.name);
    return this.requirement[id];
};


SModule.prototype.createTimelineUI = function(id, parent) {
    this.$timeline = $($('<div id="' + id + '" class="module_timeline"></div>'));
    parent.append(this.$timeline);
    this.$timeline.append("<span>" + id + "</span>");
    return this.$timeline;
};

SModule.prototype.getTimelineUI = function() {
    return this.$timeline;
};
SModule.prototype.createButton = function(text, callback) {
    var self = this; //things are gonna get nasty
    var html = '<div class="button raised green"><paper-ripple fit></paper-ripple></div>';
    var btn = $($(html));
    var text = $('<div class="label center" fit>' + text + '</div>');
    btn.append(text);
    btn.$text = text;
    btn.click(function() {
        callback(btn, self);
    });
    return btn;
};
SModule.prototype.createModalWindow = function(title, opts, parent) {
    opts.content = opts.content || "";
    var id = opts.id || new Date().getTime();
    var w = opts.width || 300;
    var h = opts.height || 300;

    var win = $($("<div id=" + id + " class='modal-window raised grey'></div>"));
    var title = $($("<div class='title raised blue'>" + title + "</div>"));
    var content = $($("<div class='content'>" + opts.content + "</div>"));
    win.width(w);
    win.append(title);
    win.append(content);
    var position = opts.position || {
        top: helper.randomInt(10, $(window).height() - 200) + 'px',
        left: helper.randomInt(10, $(window).width() - 200) + 'px'
    };
    if (position.top) win.css('top', (position.top));
    if (position.left) win.css('left', (position.left));
    if (position.rigth) win.css('rigth', (position.rigth));
    if (position.bottom) win.css('bottom', (position.bottom));
    parent.append(win);
    if (opts.resizable) {
        win.height(h);
        win.resizable({
            minHeight: win.height(),
            minWidth: win.width()
        });

    }

    if (opts.modal) {
        win.draggable({
            handle: ".title",
            containment: "window",
            stop: function() {
                if (win.offset().left === 0 || win.offset().top === 0) {
                    win.addClass('docked-left');
                } else {
                    win.removeClass('docked-left');

                }
            }
        });
    }

    win.$title = title;
    win.$content = content;

    return win;
};


},{"../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SourcesManager.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = SourceManager;


function SourceManager(opts) {
    if (!(this instanceof SourceManager)) return new SourceManager(opts);
    opts = helper.extend({
        name: 'SourceManager',
        id: 'SourceManager'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.listeners = [];
    return this;
}

inherits(SourceManager, SModule);

SourceManager.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('SourceManager started');
    this.win = this.createModalWindow(
        'SourceManager', // Title
        { //options
            content: '', //html to be displayed
            resizable: false,
            modal: true,
            width: 400,
            height: 150
        },
        this.UIedit); //parent div
    this.refresh();
}
SourceManager.prototype.refresh = function() {
    var self = this; //things are gonna get nasty
    var html = '<p style="font-size:0.8em">List of sources modules installed</p>';
    this.win.$content.html(html);
    var ul = $('<ul style="list-style-type:none"></ul>');
    for (var i = 0; i < this.listeners.length; i++) {
        var module = this.listeners[i];
        var li = $("<li>" + module.name + "</li>");
        var check = $('<input type="checkbox"></input>');
        check.prop('val', i);
        li.prepend(check);
        check.prop('checked', module.enabled);

        check.click(function(el) {
            self.listeners[$(el.target).prop('val')].toggle(check.is(':checked'));
            setTimeout(function() {
                self.refresh();
            }, 500);
        });

        var linker = $("<div style='display:inline'><img val = '" + i + "' src='./icon/content/svg/ic_link_24px.svg'></div>");
        li.append(linker);
        linker.module = module;
        linker.click(linkFB(linker));
        ul.append(li);
    };
    this.win.$content.append(ul);

}

var linkFB = function(linker) {
    var obj = linker;
    return function(el) {        
        obj.module.search();
    }
}

},{"../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var helper = require('../Helper.js')();
var smartresize = require('../Smartresize.js');

module.exports = TimelineModule;

/**
 * Timeline module. -- PRODUCER --
 * Create a timeline UI interface
 *
 *
 * @param {Object} opts
 */
function TimelineModule(story, opts) {
    if (!(this instanceof TimelineModule)) return new TimelineModule(opts);
    opts = helper.extend({
        name: 'TimelineModule',
        id: 'TMM'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.current = 0; //index of the current frame
    this.story = story; //story.js object
    var self = this; //things are gonna get nasty
    $(document).keydown(function(e) {
        switch (e.which) {
            case 37: // left
                self.goToFrame(self.current - 1);
                break;

            case 38: // up
                break;

            case 39: // right
                self.goToFrame(self.current + 1);
                break;

            case 40: // down
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    this.opts = opts;
    return this;
}
inherits(TimelineModule, SModule);


/**
 * DOM READY HERE
 * @return {[type]} [description]
 */
TimelineModule.prototype.postInit = function() {
    //console.info('TimelineModule started', this.story.timeline);
    var self = this; //things are gonna get nasty
    console.info('TimelineModule  started');
    /*CREATE AND APPEND THE MODULE UI*/
    this.$timeline = $($('<div class="module_timeline"></div>'));
    this.$timeline.show();
    this.$dragger = $($('<div class="draggable"></div>'));
    this.$timeline.append(this.$dragger);    
    if (this.opts.switchUI && this.opts.switchUI===true){
        this.UIview.append(this.$timeline);
    }else{
        this.UIedit.append(this.$timeline);
    }
    
    this._bk = 0;
    $(window).smartresize(function() {
        self.$dragger.refresh();
    });
    this.$dragger.getMaxPx = function() {
        return (self.$timeline.width() - self.$dragger.width());
    };
    this.$dragger.getPosition = function() {
        return (100 * (self.$dragger[0].offsetLeft / self.$dragger.getMaxPx()).toFixed(10));
    };
    this.$dragger.setPosition = function(percentage) {
        var offset = (percentage / 100) * self.$dragger.getMaxPx();
        self.$dragger.css('left', offset);
    };
    this.$dragger.refresh = function() {
        var index = self.current;
        self.$dragger.setPosition(self.story.timeline.getPercAtFrame(self.current, 10)); //In case the frame is changed,update position
    };
    this.$dragger.draggable({
        containment: "parent",
        drag: function(event) {
            self.current = self.story.timeline.getFrameAtPerc(self.$dragger.getPosition()).index;
            self.produce();
        },
        stop: function() {
            self.current = self.story.timeline.getFrameAtPerc(self.$dragger.getPosition()).index;
            self.produce();
        }
    });
    this.dateDisplay = $("<span></span>");
    this.$dragger.append(this.dateDisplay);


   this.goToFrame(0);
    return this;


};
TimelineModule.prototype.goToFrame = function(index) { //TODO: implementare bene
    var self = this; //things are gonna get nasty
    self.current = Math.max(0, Math.min(index, self.story.timeline.steps - 1));;
    self.produce();
};
TimelineModule.prototype.nextFrame = function() { //TODO: implementare bene
    var self = this; //things are gonna get nasty
    self.current = Math.max(0, Math.min(self.current + 1, self.story.timeline.steps - 1));;
    self.produce();
};
TimelineModule.prototype.prevFrame = function() { //TODO: implementare bene
    var self = this; //things are gonna get nasty
    self.current = Math.max(0, Math.min(self.current -1 , self.story.timeline.steps - 1));;
    self.produce();
};
TimelineModule.prototype.pickFrame = function() {
    var self = this; //things are gonna get nasty
    return self.story.timeline.frames[self.current];
};

TimelineModule.prototype.produce = function() {
    var frame = this.pickFrame();
    if (frame) {
        for (var i = 0; i < this.consumers.length; i++) {
            var listener = this.consumers[i];
            listener.consume(frame, 'FRAME');
        }
        this.$dragger.refresh();
        this.dateDisplay.html(helper.dateToString(new Date(frame.time)) + '(' + frame.index + ')');
    }
    return this;
};



TimelineModule.prototype.togglePlay = function() {
    var self = this; //things are gonna get nasty
    if (self.playbackTimeout) clearTimeout(self.playbackTimeout); //remove previous timeout
    if (!self.playback) self.playback = false;
    self.playback = !self.playback;
    if (self.playback) {
        self.playbackTimeout = setTimeout(function() {
            self.autoplay();
        }, 500);
    } else {
        self.playbackTimeout = null;
    }
};

TimelineModule.prototype.autoplay = function() {
    var self = this; //things are gonna get nasty
    self.goToFrame(self.current + 1);
    if (self.playback)
        self.playbackTimeout = setTimeout(function() {
            self.autoplay();
        }, 500);
};

},{"../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\UI\\UISwitcher.js":[function(require,module,exports){
var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

module.exports = UISwitcherModule;


function UISwitcherModule(opts) {
    var self = this; //things are gonna get nasty
    if (!(this instanceof UISwitcherModule)) return new UISwitcherModule(opts);
    opts = helper.extend({
        name: 'UISwitcherModule',
        id: 'UISwitcherModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.parent = opts.parent; // where the controls will be displaye
    return this;
}

inherits(UISwitcherModule, SModule);

UISwitcherModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    //this.win -- this.win.$title -- this.win.$content
    this.win = this.createModalWindow(
        'Mode switcher', // Title
        { //options
            content: '<p style="font-size:0.8em">Click the button to switch between edit mode and view mode</p>', //html to be displayed
            resizable: false,
            modal: true,
            width: 200,
            height: 150,
            position: {
                top: '10px',
                left: '70%'
            }
        },
        this.parent); //parent div
    var isEditMode = self.UIedit.parent().hasClass('active');
    this.win.$content.append(($('<span>' + 'Switch to ' + '</span>')));
    this.win.$content.append(
        this.createButton(isEditMode ? 'VIEW' : 'EDIT',
            function(btn, module) {
                self.UIedit.parent().toggleClass("active");
                self.UIview.parent().toggleClass("active");
                $(btn).removeClass('red');
                $(btn).removeClass('green');
                btn.$text.html(self.UIedit.parent().hasClass('active') ? 'VIEW' : 'EDIT');
                $(btn).addClass(self.UIedit.parent().hasClass('active') ? 'green' : 'red');
            })
    );
    return this;
};


},{"../../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.CameraPostProcessor.js":[function(require,module,exports){
  var helper = require('../../Helper.js')();
  var CameraPostProcessor = require('../CameraPostProcessor.js');
  var inherits = require('inherits');
  module.exports = EarthModuleCameraPostProcessor;


  function EarthModuleCameraPostProcessor(parent, scene, camera, renderer, opts) {
      if (!(this instanceof EarthModuleCameraPostProcessor)) return new EarthModuleCameraPostProcessor(parent, scene, camera, renderer, opts);
      opts = helper.extend({
          name: 'EarthModuleCameraPostProcessor',
          id: 'EarthModuleCameraPostProcessor'
      }, opts);
      CameraPostProcessor.call(this, scene, camera, renderer, opts);
      this.opts = opts;

      return this;
  }

  inherits(EarthModuleCameraPostProcessor, CameraPostProcessor);


  EarthModuleCameraPostProcessor.prototype.postInit = function() {

      var renderModel = new THREE.RenderPass(this.scene, this.camera);
      var effectBloom = new THREE.BloomPass(1.25);
      var effectFilm = new THREE.FilmPass(0.35, 0.95, 2048, false);
      effectFilm.renderToScreen = true;

      this.composer = new THREE.EffectComposer(this.renderer);

      this.composer.addPass(renderModel);
      this.composer.addPass(effectBloom);
      this.composer.addPass(effectFilm);

  };

},{"../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../CameraPostProcessor.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\CameraPostProcessor.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Earth.js":[function(require,module,exports){
var helper = require('../../Helper.js')();


var EARTH_SIZE = 600;
var POS_X = 0;
var POS_Y = 0;
var POS_Z = 0;

var POS_X_L = 3000;
var POS_Y_L = 0;
var POS_Z_L = 3000;

module.exports = EarthModuleObjEarth;

function EarthModuleObjEarth(parent, opts) {
    if (!(this instanceof EarthModuleObjEarth)) return new EarthModuleObjEarth(parent, opts);
    opts = helper.extend({
        name: 'EarthModuleObjEarth',
        id: 'EarthModuleObjEarth'
    }, opts);

    this.parent = parent;
    return this;
}

/**
 * init
 *      this.renderer
 *      this.camera
 *      this.controls
 * @return {[type]} [description]
 */
EarthModuleObjEarth.prototype.start = function(callback) {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var hw = parent.hw;
    var sm = parent.sm;
    var scene = sm.scene;
    console.info('creating subscene', scene);
    var subscene = new THREE.Object3D();

    

    
    //STARFIELD


    //EARTH
    hw.loadTexture([{ //Big textures, ask for help from hw module
            id: 'planet',
            file: '/assets/images/nteam/2_no_clouds_4k.jpg'
        }, {
            id: 'bump',
            file: '/assets/images/nteam/elev_bump_4k.jpg'
        }, {
            id: 'specular',
            file: '/assets/images/nteam/water_4k.png'
        }, ],
        function(textures) { //asyncWay, earth is added once textures are loaded
            self.createEarth(subscene, textures, function(earth) {
                self.earthMesh = earth; //mesh
                self.addBackground(subscene);
                self.addLights(subscene);
                self.earthMesh.castShadow = false;
                self.earthMesh.receiveShadow = true;
                subscene.add(earth);
                self.addClouds(earth,4,8,25);

            });
        }
    );
    //add subscene to the main scene
    self.subscene = subscene;
    scene.add(self.subscene);
    console.info('added planet earth', scene);
    return self;
};



EarthModuleObjEarth.prototype.addClouds = function(scene,size, rotx,roty) {
    var radius = EARTH_SIZE;
    var segments = 32;
    var self = this; //things are gonna get nasty
    var addOne = function() {
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius + size, segments, segments),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('/assets/images/nteam/fair_clouds_4k.png'),
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
            })
        );
        mesh._eid = new Date().getTime();
        scene.add(mesh);        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        self.parent.bindToProducer(function(framecount) { //create an anonymous module attached to the frame producer
            if (mesh) {
                mesh.rotation.y += (roty / 30000);
                mesh.rotation.x += (rotx / 30000);
                mesh.rotation.z += ((rotx+roty)/2 / 30000);
            }
        }, self.parent);
    }
    addOne(size,rotx,roty);
};

EarthModuleObjEarth.prototype.addLights = function(scene) {
    scene.add(new THREE.AmbientLight(0x151515));
    var sun = new THREE.DirectionalLight(0xffaaaa, 1);
    sun.position.set(POS_X_L, POS_Y_L, POS_Z_L);
    sun.lookAt(POS_X, POS_Y, POS_Z);
    sun.castShadow = true;
    sun.shadowCameraVisible = false; //set true to see shadow frustum
    sun.intensity = 0.8;
    sun.shadowCameraNear = 1000;
    sun.shadowCameraFar = 250000000;
    sun.shadowBias = 0.0001;
    sun.shadowDarkness = 0.35;
    sun.shadowMapWidth = 1024; //512px by default
    sun.shadowMapHeight = 1024; //512px by default    
    this.sun = sun;
    scene.add(this.sun);

    //this.addSun(scene);
};
EarthModuleObjEarth.prototype.createDebugLine = function() {

    var material = new THREE.LineBasicMaterial({
        color: 0xfdfff00
    });
    if (this.sun && this.earthMesh) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(this.sun.position);
        geometry.vertices.push(this.earthMesh.position);
        if (this.line) this.subscene.remove(this.line);
        this.line = new THREE.Line(geometry, material);
        this.subscene.add(this.line);
    }
}
EarthModuleObjEarth.prototype.addSun = function(scene) {
    var self = this; //things are gonna get nasty
    var geometry = new THREE.SphereGeometry(EARTH_SIZE * 10, 32, 16);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: false,
        opacity: 1,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(POS_X_L, POS_Y_L, POS_Z_L);
};


EarthModuleObjEarth.prototype.addBackground = function(scene) {
    var radius = 3500;
    var segments = 32;
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/nteam/galaxy_starfield.png'),
            side: THREE.BackSide
        })
    );
    scene.add(mesh);
};




EarthModuleObjEarth.prototype.createEarth = function(scene, textures, callback) {
    var self = this;
    var geo = new THREE.SphereGeometry(EARTH_SIZE, 50, 50);
    geo.position = new THREE.Vector3(0, 0, 0);
    var mesh = new THREE.Mesh(
        geo,
        new THREE.MeshPhongMaterial({
            map: textures['planet'], //THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
            bumpMap: textures['bump'], //THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
            bumpScale: 5.50,
            specularMap: textures['specular'], //THREE.ImageUtils.loadTexture('images/water_4k.png'),
            specular: new THREE.Color('grey')
        })
    );

    callback(mesh);
};


EarthModuleObjEarth.prototype.setEarthRotation = function(degree) {
    if (this.earthMesh)
        this.earthMesh.rotation.y = degree * Math.PI / 180 // Rotates  45 degrees per frame
};


/*
    var POS_X_L = 12080;
var POS_Y_L = 0;
var POS_Z_L = 12080;
 */
EarthModuleObjEarth.prototype.setSunPosition = function(__date) {
    if (this.sun) {
        var date = new Date(__date);
        var d = helper.dayOfTheYear(date);
        var dayOfTheYear = (d - 91 + 365) % 365;
        var l = 1800;
        var seasons = [{
            limit: [0, 91],
            angle: [0, l],
            id: 'A'
        }, {
            limit: [92, 172],
            angle: [l, 0],
            id: 'B'
        }, {
            limit: [173, 266],
            angle: [0, -l],
            id: 'C'
        }, {
            limit: [266, 365],
            angle: [-l, 0],
            id: 'D'
        }];
        var tilt = 0;
        for (var i = 0; i < seasons.length; i++) {
            var limit = seasons[i].limit;
            var angle = seasons[i].angle;
            if (dayOfTheYear >= limit[0] && dayOfTheYear < limit[1]) {
                tilt = helper.interpolate(dayOfTheYear + (date.getHours() / 24), limit[0], limit[1], angle[0], angle[1]);
                //console.info(seasons[i].id, d, dayOfTheYear, tilt.toFixed(0));
                break;
            }
        };



        var rev_degree = -(((__date / (1000 * 60 * 60)) + 6) % 24) * (360 / 24)
        var tilt_deg = tilt;


        this.sun.position.set(Math.sin(rev_degree * Math.PI / 180) * POS_X_L, tilt_deg, POS_Z_L * Math.cos(rev_degree * Math.PI / 180));
        this.sun.lookAt(POS_X, POS_Y, POS_Z);
    }
};

/*

mesh.rotation.x += 1;                      // Rotates   1 radian  per frame
mesh.rotation.x += Math.PI / 180;          // Rotates   1 degree  per frame
mesh.rotation.x += 45 * Math.PI / 180      // Rotates  45 degrees per frame

 */

},{"../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Hardware.js":[function(require,module,exports){
var helper = require('../../Helper.js')();
var smartresize = require('../../Smartresize.js');

module.exports = EarthModuleHardware;

var POS_X = 0;
var POS_Y = 0;
var POS_Z = 2800;

var EARTH_SIZE = 600;

var FOV = 45;
var NEAR = 1;
var FAR = 400000 * 1000000;
var CLEAR_HEX_COLOR = 0x000000;

var CAMERA_SPEED = 0.009;

function EarthModuleHardware(parent, opts) {
    if (!(this instanceof EarthModuleHardware)) return new EarthModuleHardware(parent, opts);
    opts = helper.extend({
        name: 'EarthModuleHardware',
        id: 'EarthModuleHardware'
    }, opts);

    this.parent = parent;
    return this;
}

/**
 * init
 *  this.renderer
 *  this.camera
 *  this.controls
 * @return {[type]} [description]
 */
EarthModuleHardware.prototype.start = function() {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var canvas = parent.canvas;
    var w = canvas.width();
    var h = canvas.height();

    /*
    RENDERER
     */
    self.renderer = new THREE.WebGLRenderer();
    self.renderer.setSize(w, h);
    self.renderer.setClearColorHex(0x000000);
    canvas.append(self.renderer.domElement);

    /*
    CAMERA
     */
    self.camera = new THREE.PerspectiveCamera(FOV, w / h, NEAR, FAR);
    self.camera.position.set(POS_X, POS_Y, POS_Z);
    self.camera.lookAt(new THREE.Vector3(0, 0, 0));


  

    /*
    CONTROLS
     */
    self.controls = new THREE.TrackballControls(self.camera, document.getElementById('UI-VIEW'));
    self.controls.rotateSpeed = 1.0;
    self.controls.zoomSpeed = 1.2;
    self.controls.panSpeed = 0.8;

    self.controls.noZoom = false;
    self.controls.noPan = false;

    self.controls.staticMoving = false;
    self.controls.dynamicDampingFactor = 0.3;

    self.controls.minDistance = EARTH_SIZE + EARTH_SIZE / 100;
    self.controls.maxDistance = 400000;

    self.controls.keys = [65, 83, 68];
    $(window).smartresize(function onWindowResize() {
        canvas.width(window.innerWidth);
        canvas.height(window.innerHeight);
        var w = canvas.width();
        var h = canvas.height();

        self.camera.aspect = w / h;
        self.camera.updateProjectionMatrix();

        self.renderer.setSize(w, h);

    });
    return self;
};


EarthModuleHardware.prototype.loadTexture = function(textures, callback, ret) {
    var self = this; //things are gonna get nasty

    ret = ret || {};
    console.info('[Loading textures: ' + textures.length + ' remaining]');
    if (textures.length === 0) {
        callback(ret);
    } else {
        var id = textures[textures.length - 1].id;
        var file = textures[textures.length - 1].file;
        THREE.ImageUtils.loadTexture(file, undefined, function(texture) {
            ret[id] = texture;
            self.loadTexture(textures.splice(0, textures.length - 1), callback, ret);
        });
    }
};

},{"../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.RAFProducer.js":[function(require,module,exports){
var helper = require('../../Helper.js')();
require('./requestAnimationFrame.js');
var SModule = require('../SModule.js');
var inherits = require('inherits');
module.exports = EarthModuleRAFProducer;


function EarthModuleRAFProducer(parent, opts, _loop) {
    if (!(this instanceof EarthModuleRAFProducer)) return new EarthModuleRAFProducer(parent, opts, _loop);
    opts = helper.extend({
        name: 'EarthModuleRAFProducer',
        id: 'EarthModuleRAFProducer'
    }, opts);
    SModule.call(this, opts);
    this.loop = _loop || function(earthModule) {
        console.warn('No game loop???');
    };
    this.frameCounter = 0;
    this.parent = parent;
    return this;
}

inherits(EarthModuleRAFProducer, SModule);

/**
 * init
 *      this.renderer
 *      this.camera
 *      this.controls
 * @return {[type]} [description]
 */
EarthModuleRAFProducer.prototype.start = function() {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var hw = parent.hw;
    console.info('starting engines...');
    self.render(self.parent);
    return self;
};

EarthModuleRAFProducer.prototype.render = function(parent) {
    var self = this; //things are gonna get nasty
    this.produce();
    this.loop(this.frameCounter ++, parent);// call the loop function injected by the parent
    requestAnimationFrame(function() {
        self.render(parent);
    });
};
EarthModuleRAFProducer.prototype.produce = function(framecount) {
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume(framecount);
    };
};

},{"../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./requestAnimationFrame.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.SceneManager.js":[function(require,module,exports){
var helper = require('../../Helper.js')();

module.exports = EarthModuleSceneManager;

function EarthModuleSceneManager(parent, opts) {
    if (!(this instanceof EarthModuleSceneManager)) return new EarthModuleSceneManager(parent, opts);
    opts = helper.extend({
        name: 'EarthModuleSceneManager',
        id: 'EarthModuleSceneManager'
    }, opts);

    this.parent = parent;
    return this;
}

/**
 * init
 * 		this.renderer
 * 		this.camera
 * 		this.controls
 * @return {[type]} [description]
 */
EarthModuleSceneManager.prototype.start = function() {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var hw = parent.hw;
    console.info('Scene manager started');

     // create a basic scene and add the camera
     self.scene = new THREE.Scene();
     self.scene.collision = [];
     self.scene.add(hw.camera);
     self.bindResize(hw.renderer, hw.camera, hw.controls);
    return self;
};

EarthModuleSceneManager.prototype.bindResize = function(renderer, camera, controls) {
     // var callback = function() {
     //     renderer.setSize(window.innerWidth, window.innerHeight);
     //     camera.aspect = window.innerWidth / window.innerHeight;
     //     camera.updateProjectionMatrix();
     //     controls.handleResize();

     // };
     // window.addEventListener('resize', callback, false);
     // return {
     //     /**
     //      * Stop watching window resize
     //      */
     //     stop: function() {
     //         window.removeEventListener('resize', callback);
     //     }
     // };
 };
},{"../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js":[function(require,module,exports){
/**
 * requestAnimationFrame version: "0.0.17" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/requestAnimationFrame for details
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 *
 */


(function(global) {


    (function() {


        if (global.requestAnimationFrame) {

            return;

        }

        if (global.webkitRequestAnimationFrame) { // Chrome <= 23, Safari <= 6.1, Blackberry 10

            global.requestAnimationFrame = global['webkitRequestAnimationFrame'];
            global.cancelAnimationFrame = global['webkitCancelAnimationFrame'] || global['webkitCancelRequestAnimationFrame'];

        }

        // IE <= 9, Android <= 4.3, very old/rare browsers

        var lastTime = 0;

        global.requestAnimationFrame = function(callback) {

            var currTime = new Date().getTime();

            var timeToCall = Math.max(0, 16 - (currTime - lastTime));

            var id = global.setTimeout(function() {

                callback(currTime + timeToCall);

            }, timeToCall);

            lastTime = currTime + timeToCall;

            return id; // return the id for cancellation capabilities

        };

        global.cancelAnimationFrame = function(id) {

            clearTimeout(id);

        };

    })();

    if (typeof define === 'function') {

        define(function() {

            return global.requestAnimationFrame;

        });

    }

})(window);

},{}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\sources\\FacebookSourcesModule.js":[function(require,module,exports){
var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

module.exports = FacebookSourcesModule;


function FacebookSourcesModule(opts) {
    if (!(this instanceof FacebookSourcesModule)) return new FacebookSourcesModule(opts);
    opts = helper.extend({
        name: 'FB Source Digger',
        id: 'FacebookSourcesModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.story = opts.story;
    return this;
}

inherits(FacebookSourcesModule, SModule);

FacebookSourcesModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('FacebookSourcesModule started');
}

FacebookSourcesModule.prototype.search = function(first_argument) {
    console.info('searching events from ' + helper.msToString(this.story.timeline.start) + ' to ' + helper.msToString(this.story.timeline.end));

    var searchFunction = function(path) {
    	var limit = 5;
        hello("facebook").api(path, {
            limit: 100
        }).on('success', function callback(resp) {
        	if (0 == limit-- )return;
            if (resp.paging && resp.paging.next) {
            	//console.info("Found " + resp.data.length + ". events. Keep going.",resp.data);
            	for (var i = 0; i < resp.data.length; i++) {
            		var obj = resp.data[i];
            		console.info(obj.story, helper.dateToString(new Date(obj.created_time)));
            	};
            	searchFunction(resp.paging.next);                
            } else {
                console.info("Found " + resp.data.length + ".",resp.data);
            }
        }).on('error', function() {
            console.error("Whoops!");
        });
    }
    searchFunction("/me/share");


};

},{"../../EventType.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../Smartresize.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"H:\\Github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\storify.js":[function(require,module,exports){
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

},{"./Helper.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Story.js","./StoryFactory.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js","./Wizard.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\Wizard.js","./engine/SEngine.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js","./modules/DisplayPath.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\DisplayPath.js","./modules/Earthmodule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\Earthmodule.js","./modules/GMapModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule.js","./modules/ModulesManager.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\ModulesManager.js","./modules/PlayBackModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\PlayBackModule.js","./modules/SModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./modules/SourcesManager.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SourcesManager.js","./modules/TimelineModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js","./modules/UI/UISwitcher.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\UI\\UISwitcher.js","./modules/sources/FacebookSourcesModule.js":"H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\modules\\sources\\FacebookSourcesModule.js"}]},{},["H:\\Github\\fuzzy-octo-location\\public\\js\\storify\\storify.js"]);
