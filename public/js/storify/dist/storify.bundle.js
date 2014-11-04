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
Helper.prototype.random = function(min,max) {
    return Math.random() * (max - min) + min;
};
Helper.prototype.randomInt = function(min,max) {
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
},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Timeline.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Timeline.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js":[function(require,module,exports){
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
},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\Earthmodule.js":[function(require,module,exports){
var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = EarthModule;


function EarthModule(opts) {
    if (!(this instanceof EarthModule)) return new EarthModule(opts);
    opts = helper.extend({
        name: 'EarthModule',
        id: 'EarthModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.canvas = opts.parent; // where the canvas will be displayed
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});

    return this;
}

inherits(EarthModule, SModule);

var HW = require("./earthmodule/EarthModule.Hardware.js");
var SM = require("./earthmodule/EarthModule.SceneManager.js");
var EARTH = require("./earthmodule/EarthModule.Earth.js");
var Engine = require("./earthmodule/EarthModule.Engine.js");
/*SUBMODULES*/
EarthModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('EarthModule started');
    self.hw  = new HW(self,{}).start();
    self.sm  = new SM(self,{}).start();
    self.earth = new EARTH(self,{}).start();
    self.engine = new Engine(self,{}).start();

    return this;
};

EarthModule.prototype.requestRender = function() {

};

EarthModule.prototype.adjustSize = function() {

};


EarthModule.prototype.onFramePicked = function(frame) {
    var self = this; //things are gonna get nasty

};

EarthModule.prototype.onRender = function(frame) {
    var self = this; //things are gonna get nasty

};

},{"../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./earthmodule/EarthModule.Earth.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Earth.js","./earthmodule/EarthModule.Engine.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Engine.js","./earthmodule/EarthModule.Hardware.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Hardware.js","./earthmodule/EarthModule.SceneManager.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.SceneManager.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule.js":[function(require,module,exports){
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
    if (!(this instanceof GMapModule)) return new GMapModule(opts);
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

    //this.bar = this.createTimelineUI('GMapModuleTBar', this.UIedit);
    //this.bar.css('bottom', '50px');

    this.win = this.createModalWindow(
        'Google Location Import Tool', // Title
        { //options
            id: 'GMapModuleTBar',
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

    var myDropzone = new Dropzone("div#GMapModuleTBar", {
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
    var center;

    function calculateCenter() {
        center = self.map.getCenter();
    }
    google.maps.event.addDomListener(this.map, 'idle', function() {
        calculateCenter();
        //console.info('idle', center);
    });
    $(window).smartresize(function() {
        self.map.setCenter(center);
        //console.info('resize', center);
    });
    this.marker = new google.maps.Marker({
        position: this.mapOptions.center,
        map: this.map
    });

    this.poly = new google.maps.Polyline({
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        path: []
    });
    this.poly.setMap(this.map);

    return this;
};


var GMapModuleImporter = require('./GMapModule/GMapModuleImporter.js');
GMapModule.prototype.importKML = function(res, opts) {
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
    var importer = new GMapModuleImporter(this);
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
                name: 'reducer'
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

},{"../EventType.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\EventType.js","../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./GMapModule/GMapModuleImporter.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule\\GMapModuleImporter.js","./SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule\\GMapModuleImporter.js":[function(require,module,exports){
module.exports = GMapModuleImporter;
var helper = require('../../Helper.js')();
/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
var LOCAL = {};

function GMapModuleImporter(parent, opts) {
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
GMapModuleImporter.prototype.importGoogleLocation = function(opts, values, timeline) {
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

},{"../../GpsEvent.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\GpsEvent.js","../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js":[function(require,module,exports){
module.exports = SModule;
var inherits = require('inherits');
var helper = require('../Helper.js')();

function SModule(opts) {
    if (!(this instanceof SModule)) return new SModule(opts);
    opts = helper.extend({}, opts);
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

SModule.prototype.onFramePicked = function(frame) {
    if (this.callbacks && this.callbacks.onFramePicked) {
        this.callbacks.onFramePicked(frame);
        return;
    }
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
    this.listeners = this.listeners || [];
    this.listeners.push(module);
    return this;
};
SModule.prototype.attachTo = function(target) {
    target.attach(this);
    return this;
};
SModule.prototype.require = function(id, target) {
    //target.attach(this);
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
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
function TimelineModule(story, opts) {
    if (!(this instanceof TimelineModule)) return new TimelineModule(opts);
    opts = helper.extend({
        name: 'TimelineModule',
        id: 'GMAP'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.current = 0; //index of the current frame
    this.listeners = [];
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


    this.UIedit.append(this.$timeline);


    this._bk = 0;

    $(window).smartresize(function() {
        self.$dragger.notify();
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
    this.$dragger.notify = function() {
        var index = self.current;
        self.$dragger.setPosition(self.story.timeline.getPercAtFrame(self.current, 10)); //In case the frame is changed,update position
    };
    this.$dragger.draggable({
        containment: "parent",
        drag: function(event) {
            self.current = self.story.timeline.getFrameAtPerc(self.$dragger.getPosition()).index;
            self.notify();
        },
        stop: function() {
            self.current = self.story.timeline.getFrameAtPerc(self.$dragger.getPosition()).index;
            self.notify();
        }
    });

    this.dateDisplay = $("<span></span>");
    this.$dragger.append(this.dateDisplay);

    return this;
};
TimelineModule.prototype.goToFrame = function(index) { //TODO: implementare bene
    var self = this; //things are gonna get nasty
    self.current = Math.max(0, Math.min(index, self.story.timeline.steps - 1));;
    self.notify();
};
TimelineModule.prototype.pickFrame = function() {
    var self = this; //things are gonna get nasty
    return self.story.timeline.frames[self.current];
};

TimelineModule.prototype.notify = function() {
    var frame = this.pickFrame();
    if (frame) {
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (listener.onFramePicked) {
                listener.onFramePicked(frame);
            }
        }
        this.$dragger.notify();
        this.dateDisplay.html(helper.dateToString(new Date(frame.time)) + '(' + frame.index + ')');


        //console.info(frame);

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

},{"../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","../Smartresize.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Smartresize.js","./SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Earth.js":[function(require,module,exports){
var helper = require('../../Helper.js')();

var EARTH_SIZE = 600;
var POS_X = 0;
var POS_Y = 0;
var POS_Z = 2800;

var POS_X_L = 120800;
var POS_Y_L = 0;
var POS_Z_L = 120800;

module.exports = EarthModuleObjEarth;

function EarthModuleObjEarth(parent, opts) {
    if (!(this instanceof EarthModuleObjEarth)) return new EarthModuleObjEarth(opts);
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
    var scene = parent.sm.scene;
    console.info('creating subscene', scene);
    var subscene = new THREE.Scene();

    //STARFIELD
    self.addBackground(subscene);
    self.addLights(subscene);

    //EARTH
    self.loadTexture([{
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
            opacity: 0.8
        })
    );
    scene.add(mesh);
};

EarthModuleObjEarth.prototype.addLights = function(scene) {
    var self = this; //things are gonna get nasty
    self.light = new THREE.DirectionalLight(0xffaaaa, 1);
    self.light.position.set(POS_X_L, POS_Y_L, POS_Z_L);
    self.light.lookAt(POS_X, POS_Y, POS_Z);
    scene.add(self.light);
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


EarthModuleObjEarth.prototype.loadTexture = function(textures, callback, ret) {
    var self = this; //things are gonna get nasty

    ret = ret || {};
    console.info('Loading textures  [' + ret.length + '/' + textures.length + ']');
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

EarthModuleObjEarth.prototype.createEarth = function(scene, textures, callback) {
    var self = this;
    var geo = new THREE.SphereGeometry(EARTH_SIZE, 50, 50);
    geo.position = new THREE.Vector3(0, 0, 0);


    var mesh = new THREE.Mesh(
        geo,
        new THREE.MeshPhongMaterial({
            map: textures['planet'], //THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
            bumpMap: textures['bump'], //THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
            bumpScale: 0.005,
            specularMap: textures['specular'], //THREE.ImageUtils.loadTexture('images/water_4k.png'),
            specular: new THREE.Color('grey')
        })
    );

    callback(mesh);
};

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Engine.js":[function(require,module,exports){
var helper = require('../../Helper.js')();
require('./requestAnimationFrame.js');

module.exports = EarthModuleEngine;

function EarthModuleEngine(parent, opts) {
    if (!(this instanceof EarthModuleEngine)) return new EarthModuleEngine(opts);
    opts = helper.extend({
        name: 'EarthModuleEngine',
        id: 'EarthModuleEngine'
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
EarthModuleEngine.prototype.start = function() {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var hw = parent.hw;
    console.info('starting engines...');
    self.render(self);


    return self;
};

EarthModuleEngine.prototype.render = function(self) {
    self.parent.hw.renderer.render(self.parent.sm.scene, self.parent.hw.camera);
    self.parent.hw.controls.update();
    requestAnimationFrame(function() {
        self.render(self);
    });    
};

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./requestAnimationFrame.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\requestAnimationFrame.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.Hardware.js":[function(require,module,exports){
var helper = require('../../Helper.js')();

module.exports = EarthModuleHardware;

var POS_X = 0;
var POS_Y = 0;
var POS_Z = 2800;

var POS_X_L = 120800;
var POS_Y_L = 0;
var POS_Z_L = 120800;

var EARTH_SIZE = 600;

var FOV = 45;
var NEAR = 1;
var FAR = 400000;
var CLEAR_HEX_COLOR = 0x000000;

var CAMERA_SPEED = 0.009;

function EarthModuleHardware(parent, opts) {
    if (!(this instanceof EarthModuleHardware)) return new EarthModuleHardware(opts);
    opts = helper.extend({
        name: 'EarthModuleHardware',
        id: 'EarthModuleHardware'
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
    self.controls = new THREE.TrackballControls(self.camera,document.getElementById('UI-VIEW'));
    self.controls.rotateSpeed = 1.0;
    self.controls.zoomSpeed = 1.2;
    self.controls.panSpeed = 0.8;

    self.controls.noZoom = false;
    self.controls.noPan = false;

    self.controls.staticMoving = false;
    self.controls.dynamicDampingFactor = 0.3;

    self.controls.minDistance = 1200;
    self.controls.maxDistance = 4000;

    self.controls.keys = [65, 83, 68];
    self.controls.addEventListener('change', function() {
        self.parent.requestRender();
    });

    return self;
};

},{"../../Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\earthmodule\\EarthModule.SceneManager.js":[function(require,module,exports){
var helper = require('../../Helper.js')();

module.exports = EarthModuleSceneManager;

function EarthModuleSceneManager(parent, opts) {
    if (!(this instanceof EarthModuleSceneManager)) return new EarthModuleSceneManager(opts);
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

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.earth.js":[function(require,module,exports){
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
var SEngine = require('./engine/SEngine.js');
var SModule = require('./modules/SModule.js');
var TimelineModule = require('./modules/TimelineModule.js');
var EarthModule = require('./modules/Earthmodule.js');

var GMapModule = require('./modules/GMapModule.js');


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
                start: new Date('01/01/2014'),
                end: new Date('1/1/2015'),
                scale: 1 * 60 //1 frame every ora
            },
        }).generate();
        //console.info($.toJSON(story));
        console.info(story);

        /*CREATE MODULES*/
        /*SOURCES*/
        /*TIMELINE*/
        var tmm = new TimelineModule(story, {
            enabled: true
        });
        /*EDIT*/
        /*VIEW*/
        var earthModule = new EarthModule({
            parent: $('#main'),
            enabled: true
        }).attachTo(tmm);


        var gmm = new GMapModule(story, { //Move marker, show map ecc.ecc.
            parent: $('#main'),
            enabled: false
        }).attachTo(tmm).require('tmm', tmm);
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
                earthModule,
                tmm, //timneline                
                //gmm,
                postInitializer // anonymous module on complete
            ]
        );

    }
};

},{"./Helper.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Helper.js","./Story.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\Story.js","./StoryFactory.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\StoryFactory.js","./engine/SEngine.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\engine\\SEngine.js","./modules/Earthmodule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\Earthmodule.js","./modules/GMapModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\GMapModule.js","./modules/SModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\SModule.js","./modules/TimelineModule.js":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\modules\\TimelineModule.js"}]},{},["C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\storify\\storify.earth.js"]);
