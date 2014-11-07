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
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\CameraPostProcessor.js":[function(require,module,exports){
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

},{"./../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\CustomClickModule.js":[function(require,module,exports){
var SModule = require('././SModule.js');
var inherits = require('inherits');
var smartresize = require('.././Smartresize.js');
var helper = require('.././Helper.js')();
var EventType = require('.././EventType.js');

module.exports = CustomClickModule;


function CustomClickModule(delay, opts) {
    if (!(this instanceof CustomClickModule)) return new CustomClickModule(delay,opts);
    this.opts = helper.extend({
        name: 'CustomClickModule',
        id: 'CustomClickModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    this.delay = delay;
    return this;
}

inherits(CustomClickModule, SModule);

CustomClickModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CustomClickModule started');
    this.timeout = setTimeout(function(){
    	self.produce.call(self)
    }, self.delay);
};
CustomClickModule.prototype.produce = function() {
	var self = this; //things are gonna get nasty
	self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({});
    };
     this.timeout = setTimeout(function(){
    	self.produce.call(self)
    }, self.delay);
};

},{".././EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js",".././Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js",".././Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","././SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\Earthmodule.js":[function(require,module,exports){
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
    var self = this; //things are gonna get nasty
    if (!(this instanceof EarthModule)) return new EarthModule(opts);
    opts = helper.extend({
        name: 'EarthModule',
        id: 'EarthModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.canvas = opts.parent; // where the canvas will be displayed
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});
    this.opts = opts;
    return this;
}

inherits(EarthModule, SModule);

var HW = require("./earthmodule/EarthModule.Hardware.js");
var SM = require("./earthmodule/EarthModule.SceneManager.js");
var EARTH = require("./earthmodule/EarthModule.Earth.js");
var EarthModuleRAFProducer = require("./earthmodule/EarthModule.RAFProducer.js");
var EarthModuleCameraPostProcessor = require('./earthmodule/EarthModule.CameraPostProcessor.js');

/*SUBMODULES*/
EarthModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('EarthModule started');
    self.hw = new HW(self, {}).start(); //Init hardware
    self.sm = new SM(self, {}).start(); //Init scene manager
    /*OBJECTS TO DISPLAY*/
    self.earth = new EARTH(self, {}).start(); //Planet earth
    var pp = new EarthModuleCameraPostProcessor(self, self.sm.scene, self.hw.camera, self.hw.renderer, {});

    /*Create a ticker:
        1 - run the loop passed as arguments ()
     */
    self.ticker = new EarthModuleRAFProducer(
        self, {}, //parent, options 
        function(framecount, earthmodule) { //main loop. 
            earthmodule.hw.controls.update();
            earthmodule.hw.renderer.render(earthmodule.sm.scene, earthmodule.hw.camera);
            if (pp){
                //earthmodule.hw.renderer.clear();
                //pp.render(1);    
            }else{
                
            }

            


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

},{"../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./earthmodule/EarthModule.CameraPostProcessor.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.CameraPostProcessor.js","./earthmodule/EarthModule.Earth.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Earth.js","./earthmodule/EarthModule.Hardware.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Hardware.js","./earthmodule/EarthModule.RAFProducer.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.RAFProducer.js","./earthmodule/EarthModule.SceneManager.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.SceneManager.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\KMLImporter.js":[function(require,module,exports){
var SModule = require('././SModule.js');
var inherits = require('inherits');
var smartresize = require('.././Smartresize.js');
var helper = require('.././Helper.js')();
var EventType = require('.././EventType.js');

module.exports = KMLImporter;


function KMLImporter(story,opts) {
    if (!(this instanceof KMLImporter)) return new KMLImporter(story, opts);
    this.opts = helper.extend({
        name: 'KMLImporter',
        id: 'KMLImporter'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
	this.story = story;
    return this;
}

inherits(KMLImporter, SModule);

KMLImporter.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('KMLImporter started');
    this.win = this.createModalWindow(
        'Google Location Import Tool', // Title
        { //options
            id: '___KMLImporter',
            content: '<p style="font-size:0.8em">Drop KML here</p>', //html to be displayed
            resizable: false,
            modal: true,
            width: 200,
            height: 150,
            position: {
                top: '20px',
                left: '10px'
            }
        },
        this.UIedit); //parent div

    var myDropzone = new Dropzone("div#___KMLImporter", {
        url: "/storify/uploadKML"
    });
    myDropzone.on("success", function(file, res) {
        //console.info(res);
        self.importKML(res);
    });
    myDropzone.on("complete", function(file) {

    });
    myDropzone.on("uploadprogress", function(file, progress) {

    });
    this.drop = myDropzone;
};
KMLImporter.prototype.onFramePicked = function(frame) {
    var self = this; //things are gonna get nasty
    var ev = frame.getPositionEvent();

};

var KMLImporterBackend = require('./services/KMLService.js');
KMLImporter.prototype.importKML = function(res, opts) {
    var start = new Date(res.start)
    var end = new Date(res.end)
    if (this.story.timeline.start.getTime() > start.getTime()) {
        //console.info('need to extend start', this.story.timeline.start, start);
        this.story.timeline.extend(start, this.story.timeline.end);
    }
    if (this.story.timeline.end.getTime() < end.getTime()) {
        //console.info('need to extend end', this.story.timeline.end, end);
        this.story.timeline.extend(this.story.timeline.start, end);
    }
    console.info('Importing events ', res);
    var importer = new KMLImporterBackend(this);
    var events = importer.importGoogleLocation({
        postProcessing: [{
            func: importer.pp.fixNeighbours,
            opts: {
                name: 'fixNeighbours'
            }
        }, {
            func: importer.pp.interpolator,
            opts: {
                name: 'interpolator',
                sensXY: 10, //m
                sensT: 0.5 * 60 * 60 * 1000 // 30 min
            }
        }, {
            func: importer.pp.reducer,
            opts: {
                name: 'reducer',
                sensXY: 100, //m if two events are one next to each other, merge them
            }
        }]
    }, res, this.story.timeline); //timeline is needed to get infos about frame, scale etc.etc.

    var real = 0;
    var num = 0;
    var interpolated = 0;
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        this.story.timeline.addEvent(event);
        num++;
        if (event.isReal) real++;
        if (event.interpolated) interpolated++;
    };
    console.info('**********END IMPORT KML************');
    console.info(this.story.timeline);
};

},{".././EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js",".././Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js",".././Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","././SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./services/KMLService.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\services\\KMLService.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js":[function(require,module,exports){
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


},{"../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js":[function(require,module,exports){
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

},{"../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.CameraPostProcessor.js":[function(require,module,exports){
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

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../CameraPostProcessor.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\CameraPostProcessor.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Earth.js":[function(require,module,exports){
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
    var subscene = new THREE.Scene();

    

    
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
                self.addClouds(earth);



            });
        }
    );
    //add subscene to the main scene
    self.subscene = subscene;
    scene.add(self.subscene);
    console.info('added planet earth', scene);
    return self;
};



EarthModuleObjEarth.prototype.addClouds = function(scene) {
    var radius = EARTH_SIZE;
    var segments = 32;
    var self = this; //things are gonna get nasty
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius + 5, segments, segments),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/nteam/fair_clouds_4k.png'),
            color: 0xffffff,
            transparent: true,
            opacity: 1,
        })
    );
    scene.add(mesh);
    self.clouds = mesh;
    mesh.castShadow = true;
    mesh.receiveShadow = false;
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
            bumpScale: 0.50,
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

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Hardware.js":[function(require,module,exports){
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

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.RAFProducer.js":[function(require,module,exports){
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

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./requestAnimationFrame.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.SceneManager.js":[function(require,module,exports){
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
},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js":[function(require,module,exports){
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

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\services\\KMLService.js":[function(require,module,exports){
module.exports = KMLService;
var helper = require('../../Helper.js')();
/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
var LOCAL = {};

function KMLService(parent, opts) {
    var self = this; //things are gonna get nasty
    this.parent = parent;

    this.pp = {};
    /**
     * go trough the events.
     *     for each event x, search the followers, until it finds a real one.
     *     then x.next is set as the latter
     * @param  {[type]} events [description]
     * @return {[type]}        [description]
     */
    this.pp.fixNeighbours = function(opts, events) {
        var now = new Date().getTime();
        console.info('*** postProcessing fixNeighbours started');
        for (var i = 0; i < events.length; i++) {
            if (i > 0) {
                for (var y = i - 1; y >= 0; y--) { //fix prev
                    var prev = events[y];
                    if (prev.isReal) {
                        events[i].prev = prev;
                        events[i].postProcessingInfo.push('fixNeighbours - fixed prev');
                        break;
                    }
                }
            } else {
                events[0].prev = events[0];
            }
            if (i < events.length - 1) {
                for (var y = i + 1; y < events.length; y++) { //fix next
                    var succ = events[y];
                    if (succ.isReal) {
                        events[i].next = succ;
                        events[i].postProcessingInfo.push('fixNeighbours - fixed succ');
                        break;
                    }
                };
            } else {
                events[events.length - 1].next = events[events.length - 1];
            }
        };
        console.info('*** postProcessing fixNeighbours ended in ' + (new Date().getTime() - now) + 'ms');
        return events;
    }; // fix neighbours 
    /**
     * if event
     *     !isReal && //we don't have a relevation in the frame time slot
     *     delta_meters(next,prev) > threshold1 && // we interpolate only if the 'user' has moved (not sleeping)
     *     delta_time(next,prev) > threshold2 //we interpolate only ove rthreshold
     * @param  {[type]} opts   [description]
     * @param  {[type]} events [description]
     * @return {[type]}        [description]
     */
    this.pp.interpolator = function(opts, events) {
        var interpolate = function(ev, pre, post) {
            var time = (ev.end_time + ev.start_time) / 2;
            var newLat = helper.easeInOutQuad(
                Number(time - pre.real_time), //elapsed -- steps 
                Number(pre.position.lat()), //
                Number(post.position.lat()) - Number(pre.position.lat()),
                Number(post.real_time) - Number(pre.real_time)
            );
            var newLng = helper.easeInOutQuad(
                Number(time - pre.real_time), //elapsed -- steps 
                Number(pre.position.lng()), //
                Number(post.position.lng()) - Number(pre.position.lng()),
                Number(post.real_time) - Number(pre.real_time)
            );
            ev.interpolated = true;
            ev.position = new google.maps.LatLng(newLat, newLng);
            events[i].postProcessingInfo.push('interpolator - interpolated');
        };
        var th_meters = opts.sensXY || 3; //x meters * minute
        var th_time = opts.sensT || 2 * 60 * 60 * 1000; //2 hours
        for (var i = 0; i < events.length; i++) {
            var ev = events[i];
            if (!ev.isReal) {
                var distance = helper.distance(ev.next.position, ev.prev.position);
                var elapsed = ev.next.real_time - ev.prev.real_time;
                if ((th_meters * ev.scale) <= distance) {
                    if ((th_time) <= elapsed) {
                        interpolate(ev, ev.prev, ev.next);
                    }
                }
            }
        };


        return events;
    }; // interpolate 
    this.pp.reducer = function(opts, events) {
        return events;
    }; // interpolate 

    return self;
}
var GpsEvent = require('../../GpsEvent.js');
KMLService.prototype.importGoogleLocation = function(opts, values, timeline) {
    var self = this; //things are gonna get nasty
    var events = [];
    var lastIndex = 0;
    var frames = timeline.frames;
    var gevents = values.ret;
    /*RAW IMPORT*/
    var index = 0;
    var ev = new GpsEvent({
        position: new google.maps.LatLng(gevents[lastIndex].where.lat, gevents[lastIndex].where.lng),
        start_frame: 0,
        end_frame: 0,
        start_time: frames[0].time,
        end_time: frames[0].time + timeline.getMsStep(),
        real_time: new Date(gevents[0].when).getTime(),
        subtype: '__google'
    });
    ev.postProcessingInfo = [];
    ev.scale = timeline.scale;
    ev.index = index++;
    events.push(ev);
    lastIndex = 1;
    var between = function(_date, _start, _end) {
        return _date >= _start && _date <= _end;
    }
    for (var i = 1; i < frames.length; i++) { //cycle through all frames
        var frameTime = frames[i].time;
        var skipped = 0;
        var skippedPoints = [];
        for (var y = lastIndex; y < gevents.length; y++) {

            var valTime = new Date(gevents[y].when).getTime();
            if (valTime <= frameTime) {
                skipped++;
                skippedPoints.push(new google.maps.LatLng(gevents[y].where.lat, gevents[y].where.lng));
            } else {
                var dist = helper.distance(
                    new google.maps.LatLng(gevents[lastIndex].where.lat, gevents[lastIndex].where.lng),
                    new google.maps.LatLng(gevents[y].where.lat, gevents[y].where.lng)
                ).toFixed(2);
                lastIndex = y;
                var real_time = new Date(gevents[lastIndex].when).getTime();
                var included = between(real_time, frameTime, frameTime + timeline.getMsStep());
                //found the first event after the frame. add an event with the info from the event before

                var ev = new GpsEvent({
                    position: new google.maps.LatLng(gevents[lastIndex].where.lat, gevents[lastIndex].where.lng),
                    real_time: real_time,
                    isReal: included,
                    start_frame: i,
                    end_frame: i,
                    start_time: frameTime,
                    end_time: frameTime + timeline.getMsStep(),
                    subtype: '__google',
                    distance: dist,
                    speed: (dist / timeline.scale).toFixed(2),
                    skipped: skippedPoints
                });
                ev.postProcessingInfo = [];
                ev.scale = timeline.scale;
                ev.index = index++;
                events.push(ev);
                //console.info(i, '/', frames.length, ' skipped ', skipped, 'real: ', real, ' delta (', helper.deltaToString(ev.real_time - ev.end_time) ,')');
                //console.info(i, included, ev.isReal, helper.deltaToString(ev.real_time - ev.end_time) );
                break;
            }
        }
    }
    if (opts.postProcessing) {
        for (var i = 0; i < opts.postProcessing.length; i++) {
            console.info(events.length, 'calling post processor', opts.postProcessing[i].opts.name);
            events = opts.postProcessing[i].func(opts.postProcessing[i].opts, events);
        };
    }
    return events;
};

},{"../../GpsEvent.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js","../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.earth.js":[function(require,module,exports){
var Storify = {}; //namespace

var helper = require('./Helper.js')();
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
var SEngine = require('./engine/SEngine.js');
var SModule = require('./modules/SModule.js');
var CustomClickModule = require('./modules/CustomClickModule.js');
var TimelineModule = require('./modules/TimelineModule.js');
var EarthModule = require('./modules/Earthmodule.js');
var KMLImporter = require('./modules/KMLImporter.js');


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
                scale: 1  //1 frame ogni minuto
            },
        }).generate();
        console.info(story);


        /*SHOULD BE MOVED IN A CONFIGURATION MODULE*/
        var getModules = function() {

            //timeline module: create the bar with the slider 
            var tmm = new TimelineModule(story, {
                enabled: true
            });
            var fps33 = new CustomClickModule(1000 / 66  , {enabled: true}); //call produce approx 33 times per second
            var player = new SModule({enabled: true,
                name: 'autoPlayer',
                callbacks: {
                    consume: function() {
                        tmm.nextFrame();
                    },
                }
            }).addProducer(fps33);

        //create a kml importer. modify the story object
        var importer = new KMLImporter(story, {
            enabled: true
        });

        //display a rotating earth.
        //postInit customization:
        //      -- bind to timeline event: rotate earth according to the date
        //      -- bind to (its own) render cycle: rotate clouds //test purpose
        var earthModule = new EarthModule({
            parent: $('#main'),
            enabled: true,
            callbacks: {
                postInit: function() {
                    earthModule.bindToProducer(function(frame) { //BINDED TO TIMELINE CONTROLS
                        earthModule.earth.setSunPosition(new Date(frame.time));
                        //earthModule.earth.createDebugLine();
                    }, tmm);
                    earthModule.bindToProducer(function(framecount) {
                        if (earthModule.earth.clouds) {
                            earthModule.earth.clouds.rotation.y += (34 / 30000);
                            earthModule.earth.clouds.rotation.x += (8 / 30000);
                        }
                    }, earthModule);
                }
            }
        }); //create THREE.JS environment, scene manager, scene etc.etc

        /*CLOCK ON TOP*/
        var dateDisplayer = new SModule({
            enabled: true,
            name: 'dateDisplayer',
            callbacks: {
                postInit: function() {
                    $('#UI-EDIT').prepend('<div class="button raised grey" style="width:200px;height:30px;position:absolute;margin-left:-100px;top:50px;left:50%;text-align:center;" id="__clock"></div>');
                },
                consume: function(frame) {
                    $('#__clock').html(helper.msToString(frame.time));
                }
            }
        }).addProducer(tmm);

        var renderListener = new SModule({
            enabled: true,
            name: 'renderListener',
            callbacks: {
                consume: function(frameCount) {
                    //called every time one of his producers call the render function
                }
            }
        }).addProducer(earthModule);



        return [ //MODULES
            earthModule,
            dateDisplayer,
            renderListener,
            importer,
            tmm,
            fps33,
            player
        ];

    };
    /*START THE ENGINE*/
    var engine = new SEngine().start(getModules(), {});

    helper.setUIModes(true, true); //view and edit window
}
};

},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Story.js","./StoryFactory.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js","./engine/SEngine.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js","./modules/CustomClickModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\CustomClickModule.js","./modules/Earthmodule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\Earthmodule.js","./modules/KMLImporter.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\KMLImporter.js","./modules/SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./modules/TimelineModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js"}]},{},["C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.earth.js"]);
