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

},{"./EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js":[function(require,module,exports){
module.exports ={
	GENERIC : {id : 000, type : 'GENERIC'},
	POSITION : {id : 100, type : 'POSITION'},
	PHOTO : {id : 200, type : 'PHOTO'},
	VIDEO  :{id : 300, type : 'VIDEO'},
	MUSIC  :{id : 400, type : 'MUSIC'},
};
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js":[function(require,module,exports){
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
},{"./Event.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","./GpsEvent.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js":[function(require,module,exports){
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
},{"./Event.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Event.js","./EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js":[function(require,module,exports){
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
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js":[function(require,module,exports){
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
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Story.js":[function(require,module,exports){
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
},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Timeline.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js":[function(require,module,exports){
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
},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Story.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js":[function(require,module,exports){
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

},{"./Frame.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Frame.js","./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js":[function(require,module,exports){
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
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\RAFClickProducer.js":[function(require,module,exports){
var SModule = require('././SModule.js');
var inherits = require('inherits');
require('./earthmodule/requestAnimationFrame.js');
var helper = require('.././Helper.js')();

module.exports = RAFClickProducer;


function RAFClickProducer(opts) {
    if (!(this instanceof RAFClickProducer)) return new RAFClickProducer(opts);
    this.opts = helper.extend({
        name: 'RAFClickProducer',
        id: 'RAFClickProducer'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    this.framecount = 0;
    return this;
}

inherits(RAFClickProducer, SModule);

RAFClickProducer.prototype.start = function() {
    var self = this; //things are gonna get nasty
    self.render();
    return self;
};

RAFClickProducer.prototype.render = function() {
    var self = this; //things are gonna get nasty
    this.produce();
    requestAnimationFrame(function() {
        self.render();
    });
};
RAFClickProducer.prototype.produce = function() {
    this.framecount++;
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({framecount:this.framecount});
    };
};
},{".././Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","././SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./earthmodule/requestAnimationFrame.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js":[function(require,module,exports){
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


},{"../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\CowabungaMainModule.js":[function(require,module,exports){
var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

/*SUBMODULES*/
var CowabungaPhysics = require('./submodules/CowabungaPhysics.js');
var CowabungaHardware = require('./submodules/CowabungaHardware.js');
var CowabungaWorld = require('./submodules/CowabungaWorld.js');
var CowabungaCarInput = require('./submodules/CowabungaCarInput.js');
var CowabungaMouseHandler = require('./submodules/CowabungaMouseHandler.js');
var CowabungaMulti = require('./submodules/CowabungaMulti.js');


module.exports = CowabungaMainModule;


function CowabungaMainModule(handler, opts) {
    if (!(this instanceof CowabungaMainModule)) return new CowabungaMainModule(opts);
    this.opts = helper.extend({
        name: 'CowabungaMainModule',
        id: 'CowabungaMainModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    //DEFAULT
    this.handler = $(handler);
    this.opts.physics = this.opts.physics || false;
    this.opts.multiplayer = this.opts.multiplayer || false;
    this.submodules = this.opts.submodules || [];
    this.opts.debug = this.opts.debug || false;
    this.debugSubmodules = this.opts.debugSubmodules || [];
    return this;
}

inherits(CowabungaMainModule, SModule);



CowabungaMainModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    this.started = false;
    GLOBALS.pb.set(0);
    async.parallel({
        //Init physics engine, create scene
        initPhysi: function(callback) {
            GLOBALS.pb.set(10);
            self.phy = new CowabungaPhysics(
                self, //parent
                {
                    gravity: new THREE.Vector3(0, -60, 0),
                    enabled: true,
                    producer: self
                });
            self.submodules.push(self.phy);
            callback(null, self.phy);
        },
        initHardware: function(callback) { //Camera, renderer
            GLOBALS.pb.set(20);
            self.hw = new CowabungaHardware(self, {
                enabled: true,
                producer: self,
                settings:{
                    camera: {maxZoom : 40, minZoom:10},
                    renderer: {}
                }
            });
            self.submodules.push(self.hw);
            callback(null, self.hw);
        },
        initInput: function(callback) { //create the input
            GLOBALS.pb.set(30);
            self.carinput = new CowabungaCarInput({
                enabled: true
            });
            self.submodules.push(self.carinput);

            self.mousehandler = new CowabungaMouseHandler(self.handler,{
                enabled: true
            });
            self.submodules.push(self.mousehandler);

            //BIND THE CAMERA TO MOUSE PRODUCER
            self.bindToProducer(
                function(meta) {
                    var event = meta.event;
                    if (event.type === 'mousewheel'){
                        if (!event.up){self.hw.zoomIn();}
                        if (event.up){self.hw.zoomOut();}
                    }
                }, self.mousehandler );
            callback(null, true);
        },
        initWorld: function(callback) { // add terrain, car
            GLOBALS.pb.set(40);
            self.world = new CowabungaWorld(self, {
                enabled: true,
                producer: self,
                carInput: self.carinput
            });
            self.submodules.push(self.world);
            callback(null, self.world);
        },
        initMulti: function(callback) {
            GLOBALS.pb.set(50);
            self.garageIO = new CowabungaMulti(self, {
                enabled: true,
                producer: self
            });
            self.submodules.push(self.garageIO);
            callback(null, true);
        },
        /*START ALL THE MODULES*/
        initSubModules: function(callback) {
            GLOBALS.pb.set(60);
            for (var i = 0; i < self.submodules.length; i++) {
                self.submodules[i].start();
            };

            callback(null, true);
        },
        initDebugSubModules: function(callback) {
            GLOBALS.pb.set(70);
            callback(null, self.opts.debug);
        },
    }, function(err, results) {
        self.started = true;

        self.bindToProducer(
            function(framecount) {
                /*UPDATE CAR POSITION*/
                //car position is updated in CowabungaCar.js -- line 70

                //UPDATE CAMERA POSITION
                if (self.vehicle && self.camera && self.vehicle.mesh.position) {
                    self.camera.position.copy(self.vehicle.mesh.position).add(new THREE.Vector3(100, 80, 100));
                    self.camera.lookAt(self.vehicle.mesh.position);

                    //UPDATE LIGHT POSITION
                    self.lights.target.position.copy(self.vehicle.mesh.position);
                    self.lights.position.addVectors(self.lights.target.position, new THREE.Vector3(20, 20, -15));

                }
                self.renderer.render(self.scene, self.camera);


            }, self);



        console.info('CowabungaMainModule started', results, self);
        GLOBALS.pb.set(100);
    });




};
CowabungaMainModule.prototype.produce = function() {
    var self = this; //things are gonna get nasty
    if (!this.enabled || !this.started) {
        return;
    }
    self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({
            framecount: this.framecount
        });
    };
};

//binded to a frameproducer
CowabungaMainModule.prototype.consume = function(frame) {
    this.produce();
};

},{"../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./submodules/CowabungaCarInput.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaCarInput.js","./submodules/CowabungaHardware.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaHardware.js","./submodules/CowabungaMouseHandler.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaMouseHandler.js","./submodules/CowabungaMulti.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaMulti.js","./submodules/CowabungaPhysics.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaPhysics.js","./submodules/CowabungaWorld.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaWorld.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaCar.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');
var CowabungaCarInput = require('./CowabungaCarInput.js');

module.exports = CowabungaCar;


function CowabungaCar(parent, opts) {
    if (!(this instanceof CowabungaCar)) return new CowabungaCar(parent, opts);
    this.opts = helper.extend({
        name: 'CowabungaCar',
        id: 'CowabungaCar'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.producer = this.opts.producer || this.parent;
    this.input = this.opts.input || new CowabungaCarInput({
        enabled: true
    });
    SModule.call(this, this.opts);

    return this;
}
inherits(CowabungaCar, SModule);

CowabungaCar.prototype.postInit = function() {
    console.info('CowabungaCar started: remember to call asyncStart(callback)');
};


CowabungaCar.prototype.asyncStart = function(callback) {
    var self = this; //things are gonna get nasty
    console.info('CowabungaCar Starting');
    var loader = new THREE.JSONLoader();
    loader.load("/assets/models/mustang.js", function(car, car_materials) {
        loader.load("/assets/models/mustang_wheel.js", function(wheel, wheel_materials) {
            var mesh = new Physijs.BoxMesh(
                car,
                new THREE.MeshFaceMaterial(car_materials)
            );
            mesh.position.y = 2;
            mesh.castShadow = mesh.receiveShadow = true;
            //VehicleTuning( , , , max_suspension_travel, ,  )
            var vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
                55.88, //suspension_stiffness - 10.88 
                10.83, //suspension_compression - 1.83
                0.18, //suspension_damping - 0.28
                800, //max_suspension_travel -500 
                10.5, //friction_slip - 10.5
                6000 //max_suspension_force - 6000
            ));
            var wheel_material = new THREE.MeshFaceMaterial(wheel_materials);
            self.parent.scene.add(vehicle);
            for (var i = 0; i < 4; i++) {
                vehicle.addWheel(
                    wheel,
                    wheel_material,
                    new THREE.Vector3(
                        i % 2 === 0 ? -1.6 : 1.6, -1,
                        i < 2 ? 3.3 : -3.2
                    ),
                    new THREE.Vector3(0, -1, 0),
                    new THREE.Vector3(-1, 0, 0),
                    0.5,
                    0.7,
                    i < 2 ? false : true
                );
            }
            var maxSteering = 0.15;
            var engineForce = 600;
            var brake = engineForce/2;
            var correction = 0.05;
            var drag = engineForce/4;
            self.bindToProducer(
                function() {
                    var input = self.input.input;
                    var vehicle = self.vehicle;
                    if (input.direction !== null) {
                        input.steering += input.direction / 30;
                        if (input.steering < -maxSteering) input.steering = -maxSteering;
                        if (input.steering > maxSteering) input.steering = maxSteering;
                    }else{
                        if (Math.abs(input.steering)<=correction){input.steering=0;}
                        else if (input.steering>0) {input.steering-=correction;}else{input.steering+=correction;}
                    }
                    vehicle.setSteering(input.steering, 0);
                    vehicle.setSteering(input.steering, 1);

                    if (input.power === true) {
                        vehicle.applyEngineForce(engineForce);
                    } else if (input.power === false) {
                        vehicle.setBrake(brake, 2);
                        vehicle.setBrake(brake, 3);
                    } else {
                        vehicle.applyEngineForce(0);
                        vehicle.setBrake(drag, 2);
                        vehicle.setBrake(drag, 3);
                    }
                }, self.parent); //BIND TO THE PARENT (frame producer) and not to the Input Module

            self.vehicle = vehicle;
            callback(vehicle);
        });
    });
};


CowabungaCar.prototype.consume = function(input) {

};

},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./CowabungaCarInput.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaCarInput.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaCarInput.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');

module.exports = CowabungaCarInput;


function CowabungaCarInput(opts) {
    if (!(this instanceof CowabungaCarInput)) return new CowabungaCarInput(opts);
    this.opts = helper.extend({
        name: 'CowabungaCarInput',
        id: 'CowabungaCarInput'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    this.input = {
        power: null,
        direction: null,
        steering: 0
    };
    return this;
}

inherits(CowabungaCarInput, SModule);

CowabungaCarInput.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CowabungaCarInput started');
    document.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 37: // left
                self.input.direction = 1;
                break;

            case 38: // forward
                self.input.power = true;
                break;

            case 39: // right
                self.input.direction = -1;
                break;

            case 40: // back
                self.input.power = false;
                break;
        }
        self.produce();
    });
    document.addEventListener('keyup', function(ev) {
        switch (ev.keyCode) {
            case 37: // left
                self.input.direction = null;
                break;

            case 38: // forward
                self.input.power = null;
                break;

            case 39: // right
                self.input.direction = null;
                break;

            case 40: // back
                self.input.power = null;
                break;
        }
        self.produce();
    });

};
CowabungaCarInput.prototype.produce = function() {
    var self = this; //things are gonna get nasty
     if (!this.enabled || !this.started) {
        return;
    }
    self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({
            input: this.input
        });
    };
};

},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaHardware.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');
module.exports = CowabungaHardware;


function CowabungaHardware(parent, opts) {
    if (!(this instanceof CowabungaHardware)) return new CowabungaHardware(parent, opts);
    this.opts = helper.extend({
        name: 'CowabungaHardware',
        id: 'CowabungaHardware'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.producer = this.opts.producer || this.parent;
    this.settings =  this.opts.settings || {};
    this.settings.renderer =  this.settings.renderer || {};
    this.settings.camera =  this.settings.camera || {};
    this.settings.camera.maxZoom = 50 || this.settings.camera.maxZoom;
    this.settings.camera.minZoom = 5 || this.settings.camera.minZoom;

    SModule.call(this, this.opts);
    return this;
}

inherits(CowabungaHardware, SModule);

CowabungaHardware.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CowabungaHardware started');

    var projector = new THREE.Projector;
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    //RENDERER
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.setClearColorHex(0xaaaaaa);
    self.parent.handler.prepend(renderer.domElement);

    //STATS
    var render_stats = new Stats();//TODO:MOVE TO CSS
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '1px';
    render_stats.domElement.style.right = '1px';
    render_stats.domElement.style.zIndex = 100;
    self.parent.handler.append(render_stats.domElement);

    var camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
	self.parent.scene.add( camera );

    self.projector = projector;
    self.renderer = self.parent.renderer = renderer;
    self.camera = self.parent.camera = camera;
    self.stats = render_stats;
    self.bindToProducer(
        function(framecount) {
            self.stats.update();
        }, self.producer );

    $(window).smartresize(function onWindowResize() {
        self.parent.handler.width(window.innerWidth);
        self.parent.handler.height(window.innerHeight);
        var w = self.parent.handler.width();
        var h = self.parent.handler.height();

        self.camera.aspect = w / h;
        self.camera.updateProjectionMatrix();

        self.renderer.setSize(w, h);

    });
};

var zoomFactor = 1.2;
CowabungaHardware.prototype.zoomIn = function() {
    this.camera.fov *= zoomFactor;
    this.camera.fov = Math.min(this.settings.camera.maxZoom,this.camera.fov);
    this.camera.updateProjectionMatrix();
    console.info(this.camera.fov);
};
CowabungaHardware.prototype.zoomOut = function() {
    this.camera.fov /= zoomFactor;
    this.camera.fov = Math.max(this.settings.camera.minZoom,this.camera.fov);
    this.camera.updateProjectionMatrix();
    console.info(this.camera.fov);
};
},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaMouseHandler.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');

module.exports = CowabungaMouseHandler;


function CowabungaMouseHandler(canvas,opts) {
    if (!(this instanceof CowabungaMouseHandler)) return new CowabungaMouseHandler(canvas, opts);
    this.opts = helper.extend({
        name: 'CowabungaMouseHandler',
        id: 'CowabungaMouseHandler'
    }, opts);
    this.canvas = canvas;
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    this.input = {
        s_down : false,
        d_down : false,
        w_down : false,
        w_roll : 0
    };
    return this;
}

inherits(CowabungaMouseHandler, SModule);

CowabungaMouseHandler.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CowabungaMouseHandler started');
    this.canvas.click(function(event){
        self.produce(event);
    });
    this.canvas.bind('mousewheel', function(event){
        event.up = (event.originalEvent.wheelDelta /120 > 0);
        self.produce(event);      
    });


};
CowabungaMouseHandler.prototype.produce = function(event) {
    var self = this; //things are gonna get nasty
     if (!this.enabled || !this.started) {
        return;
    }
    self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({
            event: event
        });
    };
};

},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaMulti.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');

module.exports = CowabungaMulti;


function CowabungaMulti(parent, opts) {
    if (!(this instanceof CowabungaMulti)) return new CowabungaMulti(parent, opts);
    this.opts = helper.extend({
        name: 'CowabungaMulti',
        id: 'CowabungaMulti'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.producer = this.opts.producer || this.parent;
    SModule.call(this, this.opts);

    return this;
}
inherits(CowabungaMulti, SModule);

CowabungaMulti.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    self.ready = false;
    var host = window.location.protocol+'//'+window.location.host;
    console.info('CowabungaMulti Starting',host);
    GarageServerIO.initializeGarageServer(host, {
        onReady: function(data) {
            console.info('onReady');
            self.ready = true;
        },
        onPlayerConnect: function(data) {
            console.info('onPlayerConnect');
        },
        onUpdatePlayerPrediction: function(state, inputs, deltaTime) {
            console.info('onUpdatePlayerPrediction');
            return{};
        },
        onInterpolation: function(previousState, targetState, amount) {
            console.info('onInterpolation');
        },
        onWorldState: function(state) {
            console.info('onWorldState');
        }
    });

    self.bindToProducer(
        function(framecount) {
            //console.info('multi update');

        }, self.producer);
    self.bindToProducer(
        function(data) {
            //console.info('input update',data);
            if (self.ready)
            GarageServerIO.addInput(data.input)
        }, self.parent.carinput);
};

},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaPhysics.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');

module.exports = CowabungaPhysics;


function CowabungaPhysics(parent, opts) {
    if (!(this instanceof CowabungaPhysics)) return new CowabungaPhysics(parent, opts);
    this.opts = helper.extend({
        name: 'CowabungaPhysics',
        id: 'CowabungaPhysics'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.producer = this.opts.producer || this.parent;
    

    SModule.call(this, this.opts);    
    Physijs.scripts.worker = '/libs/physijs_worker.js';
    Physijs.scripts.ammo = '/libs/ammo.js';


    return this;
}
inherits(CowabungaPhysics, SModule);

CowabungaPhysics.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CowabungaPhysics Starting');
    var physics_stats = new Stats(); //TODO:MOVE TO CSS
    physics_stats.domElement.style.position = 'absolute';
    physics_stats.domElement.style.top = '50px';
    physics_stats.domElement.style.right = '1px';
    physics_stats.domElement.style.zIndex = 100;
    self.parent.handler.append(physics_stats.domElement);
    self.stats = physics_stats;


    //Create the scene
    var scene = new Physijs.Scene;
    scene.setGravity(this.opts.gravity || new THREE.Vector3(0, -30, 0));




    self.scene = self.parent.scene = scene;
    self.bindToProducer(
        function(framecount) {
            self.stats.update();
            scene.simulate(undefined, 2);
        }, self.parent);
};


},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaWorld.js":[function(require,module,exports){
var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');

module.exports = CowabungaWorld;


function CowabungaWorld(parent, opts) {
    if (!(this instanceof CowabungaWorld)) return new CowabungaWorld(parent, opts);
    this.opts = helper.extend({
        name: 'CowabungaWorld',
        id: 'CowabungaWorld'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.producer = this.opts.producer || this.parent;
    SModule.call(this, this.opts);

    return this;
}
inherits(CowabungaWorld, SModule);

CowabungaWorld.prototype.postInit = function() {
    var self = this;
    console.info('CowabungaWorld Starting');
    self.started = false;


    self.parent.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
    async.parallel({
        //addLights
        addLights: function(callback) {
            self.parent.lights = self.lights = self.addLights();
            callback(null, self.lights);
        },
        addGround: function(callback) {
            self.parent.ground = self.ground = self.addGround();
            callback(null, self.ground);
        },
        addCar: function(callback) {
            self.parent.vehicle = self.vehicle = self.addVehicle(function() {
                callback(null, self.car);
            });

        },
    }, function(err, results) {
        self.started = true;
        console.info('CowabungaWorld started', results, self);
    });


    self.bindToProducer(
        function(framecount) {


        }, self.producer);

};


CowabungaWorld.prototype.addLights = function() {
    var light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 20, -15);
    light.target.position.copy(this.parent.scene.position);
    light.castShadow = true;
    light.shadowCameraLeft = -150;
    light.shadowCameraTop = -150;
    light.shadowCameraRight = 150;
    light.shadowCameraBottom = 150;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 400;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 2048;
    light.shadowDarkness = .7;
    this.parent.scene.add(light);
    return light;
};

CowabungaWorld.prototype.addGround = function() {
    //Create Material
    var ground_material = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/cowabunga/ground.jpg')
        }),
        0.8, // high friction
        0.1 // low restitution
    );
    ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
    ground_material.map.repeat.set(10, 10);

    var NoiseGen = new SimplexNoise;
    var ground_geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);
    for (var i = 0; i < ground_geometry.vertices.length; i++) {
        var vertex = ground_geometry.vertices[i];
        //vertex.y = NoiseGen.noise( vertex.x / 30, vertex.z / 30 ) * 1;
    }
    ground_geometry.computeFaceNormals();
    ground_geometry.computeVertexNormals();

    var ground = new Physijs.HeightfieldMesh(
        ground_geometry,
        ground_material,
        0 // mass
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;

    this.parent.scene.add(ground);

    return ground;
};

var CowabungaCar = require('./CowabungaCar.js');
CowabungaWorld.prototype.addVehicle = function(callback) {
    var self = this;
    var car = new CowabungaCar(this.parent, {input: this.opts.carInput});
    car.asyncStart(function(vehicle) {
        car.start();
        self.parent.vehicle = self.vehicle = vehicle;
        callback();
    })


};

},{"../../../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./../../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./CowabungaCar.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\submodules\\CowabungaCar.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js":[function(require,module,exports){
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

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.ortho.js":[function(require,module,exports){
var Storify = {}; //namespace

var helper = require('./Helper.js')();
var StoryFactory = require('./StoryFactory.js');
//watchify .\public\js\storify\storify.ortho.js -o .\public\js\storify\dist\storify.bundle.js

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
var StoryFactory = require('./StoryFactory.js');
var SEngine = require('./engine/SEngine.js');
var SModule = require('./modules/SModule.js');
var RAFClickProducer = require('./modules/RAFClickProducer.js');

var CowabungaMainModule = require('./modules/cowabunga/CowabungaMainModule.js');
//var KMLImporter = require('./modules/KMLImporter.js');


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
            title: '1 Year of earthquakes',
            description: '#earthquake',
            timelineOpts: {
                start: new Date('01/01/2014 00:00'),
                end: new Date('01/01/2015 00:00'),
                scale: 1 //1 frame ogni minuto
            },
        }).generate();
        console.info(story);


        /*SHOULD BE MOVED IN A CONFIGURATION MODULE*/
        var getModules = function() {

            var fpsGenerator = new RAFClickProducer({ //Base
                enabled: true
            }); //call produce approx 66 times per second

            var renderListener = new SModule({
                enabled: true,
                name: 'renderListener',
                callbacks: {
                    consume: function(frameCount) {
                        //called every time one of his producers call the render function
                    }
                }
            }).addProducer(fpsGenerator);

            var cowabunga = new CowabungaMainModule(
                '#main', //DIV
                {   //OPTIONS
                    enabled : true,
                    physics : true,
                    multiplayer : true,
                    submodules : [],
                    debug : true,
                    debugSubmodules : []
            }).addProducer(fpsGenerator);


            return [ //MODULES
                renderListener,
                fpsGenerator,
                cowabunga
            ];

        };
        /*START THE ENGINE*/
        var engine = new SEngine().start(getModules(), {});

        helper.setUIModes(true, true); //view and edit window
    }
};

},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./StoryFactory.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js","./engine/SEngine.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js","./modules/RAFClickProducer.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\RAFClickProducer.js","./modules/SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./modules/cowabunga/CowabungaMainModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\cowabunga\\CowabungaMainModule.js"}]},{},["C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.ortho.js"]);
