(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\urbangi\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\events\\events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\fps\\index.js":[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')

module.exports = fps

// Try use performance.now(), otherwise try
// +new Date.
var now = (
  (function(){ return this }()).performance &&
  'function' === typeof performance.now
) ? function() { return performance.now() }
  : Date.now || function() { return +new Date }

function fps(opts) {
  if (!(this instanceof fps)) return new fps(opts)
  EventEmitter.call(this)

  opts = opts || {}
  this.last = now()
  this.rate = 0
  this.time = 0
  this.decay = opts.decay || 1
  this.every = opts.every || 1
  this.ticks = 0
}
inherits(fps, EventEmitter)

fps.prototype.tick = function() {
  var time = now()
    , diff = time - this.last
    , fps = diff

  this.ticks += 1
  this.last = time
  this.time += (fps - this.time) * this.decay
  this.rate = 1000 / this.time
  if (!(this.ticks % this.every)) this.emit('data', this.rate)
}


},{"events":"C:\\Users\\urbangi\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\events\\events.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\fps\\node_modules\\inherits\\inherits.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\fps\\node_modules\\inherits\\inherits.js":[function(require,module,exports){
module.exports = inherits

function inherits (c, p, proto) {
  proto = proto || {}
  var e = {}
  ;[c.prototype, proto].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      e[k] = Object.getOwnPropertyDescriptor(s, k)
    })
  })
  c.prototype = Object.create(p.prototype, e)
  c.super = p
}

//function Child () {
//  Child.super.call(this)
//  console.error([this
//                ,this.constructor
//                ,this.constructor === Child
//                ,this.constructor.super === Parent
//                ,Object.getPrototypeOf(this) === Child.prototype
//                ,Object.getPrototypeOf(Object.getPrototypeOf(this))
//                 === Parent.prototype
//                ,this instanceof Child
//                ,this instanceof Parent])
//}
//function Parent () {}
//inherits(Child, Parent)
//new Child

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js":[function(require,module,exports){
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

},{}],"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\ticker\\index.js":[function(require,module,exports){
(function (global){
var EventEmitter = require('events').EventEmitter

var _raf =
  global.requestAnimationFrame ||
  global.webkitRequestAnimationFrame ||
  global.mozRequestAnimationFrame ||
  global.msRequestAnimationFrame ||
  global.oRequestAnimationFrame

module.exports = ticker

var currtime =
  global.performance &&
  global.performance.now ? function() {
    return performance.now()
  } : Date.now || function () {
    return +new Date
  }

function ticker(element, rate, limit) {
  var fps = 1000 / (rate || 60)
    , emitter = new EventEmitter
    , last = currtime()
    , time = 0

  var raf = _raf || function(fn, el) {
    setTimeout(fn, fps)
  }

  limit = arguments.length > 2 ? +limit + 1 : 2

  function loop() {
    raf(loop, element || null)

    var now = currtime()
    var dt = now - last
    var n = limit

    emitter.emit('data', dt)
    time += dt
    while (time > fps && n) {
      time -= fps
      n -= 1
      emitter.emit('tick', fps)
    }

    time = (time + fps * 1000) % fps
    if (n !== limit) emitter.emit('draw', time / fps)
    last = now
  }

  loop()

  return emitter
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"events":"C:\\Users\\urbangi\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\events\\events.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\flock\\flock.js":[function(require,module,exports){
var GLOBALS = {};
var ticker = require('ticker'),
    Boids = require('./traffic'),
    fps = require('fps'),
    world = require('./world');


init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    GLOBALS.pb.set(0);
    console.info('Flock application started');

    var attractors = [
        [
            Infinity // x
            , Infinity // y
            , 150 // dist
            , 0.25 // spd
        ]
    ];
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    var boids = new Boids({
        boids: 100,
        speedLimit: 2,
        accelerationLimit: 0.5,
        attractors: attractors,
        cohesionForce : 0.1,
        alignmentForce :140.25
    });
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.appendChild(canvas)
    window.onresize = debounce(function() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }, 100);
    window.onresize();
    document.body.onmousemove = function(e) {
        var halfHeight = canvas.height / 2,
            halfWidth = canvas.width / 2;

        attractors[0][0] = e.x - halfWidth;
        attractors[0][1] = e.y - halfHeight;
    }

    var frames = fps({
        every: 10,
        decay: 0.04
    }).on('data', function(rate) {
        //console.info(rate);


    })

    ticker(window, 60).on('tick', function() {
        frames.tick();
        boids.tick();
    }).on('draw', function() {
        //console.info('draw');
        var boidData = boids.traffic,
            halfHeight = canvas.height / 2,
            halfWidth = canvas.width / 2

        ctx.fillStyle = 'rgba(255,241,235,0.25)' // '#FFF1EB'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00FF00'
        for (var i = 0, l = boidData.length, x, y; i < l; i += 1) {
            x = boidData[i][0];
            y = boidData[i][1]
                // wrap around the screen
            boidData[i][0] = x > halfWidth ? -halfWidth : -x > halfWidth ? halfWidth : x
            boidData[i][1] = y > halfHeight ? -halfHeight : -y > halfHeight ? halfHeight : y
            ctx.fillRect(x + halfWidth, y + halfHeight, 2, 2)
        }


    })


    GLOBALS.pb.set(100);
};


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

},{"./traffic":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\flock\\traffic.js","./world":"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\flock\\world.js","fps":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\fps\\index.js","ticker":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\ticker\\index.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\flock\\traffic.js":[function(require,module,exports){
module.exports = Traffic;
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var sqrt = Math.sqrt
  , POSITIONX = 0
  , POSITIONY = 1
  , SPEEDX = 2
  , SPEEDY = 3
  , ACCELERATIONX = 4
  , ACCELERATIONY = 5;

function Traffic(opts, callback) {
    if (!(this instanceof Traffic)) return new Traffic(opts, callback);
    EventEmitter.call(this);

    opts = opts || {};
    callback = callback || function() {};

    this.speedLimitRoot = opts.speedLimit || 0;
    this.accelerationLimitRoot = opts.accelerationLimit || 1;
    this.speedLimit = Math.pow(this.speedLimitRoot, 2);
    this.accelerationLimit = Math.pow(this.accelerationLimitRoot, 2);
    this.separationDistance = Math.pow(opts.separationDistance || 60, 2);
    this.alignmentDistance = Math.pow(opts.alignmentDistance || 180, 2);
    this.cohesionDistance = Math.pow(opts.cohesionDistance || 180, 2);
    this.separationForce = opts.separationForce || 0.15;
    this.cohesionForce = opts.cohesionForce || 0.1;
    this.alignmentForce = opts.alignmentForce || opts.alignment || 0.25;
    this.attractors = opts.attractors || [];

    var traffic = this.traffic = [];
    for (var i = 0, l = opts.traffic === undefined ? 50 : opts.traffic; i < l; i += 1) {
        traffic[i] = [
            Math.random() * 25, Math.random() * 25 // position
            , 0, 0 // speed
            , 0, 0 // acceleration
        ];
    }

    this.on('tick', function() {
        callback(traffic);
    });
}

inherits(Traffic, EventEmitter);


Traffic.prototype.tick = function() {
    var traffic = this.traffic,
        sepDist = this.separationDistance,
        sepForce = this.separationForce,
        cohDist = this.cohesionDistance,
        cohForce = this.cohesionForce,
        aliDist = this.alignmentDistance,
        aliForce = this.alignmentForce,
        speedLimit = this.speedLimit,
        accelerationLimit = this.accelerationLimit,
        accelerationLimitRoot = this.accelerationLimitRoot,
        speedLimitRoot = this.speedLimitRoot,
        size = traffic.length,
        current = size,
        sforceX, sforceY, cforceX, cforceY, aforceX, aforceY, spareX, spareY, attractors = this.attractors,
        attractorCount = attractors.length,
        distSquared, currPos, targPos, length, target;

    while (current--) {
        sforceX = 0;
        sforceY = 0;
        cforceX = 0;
        cforceY = 0;
        aforceX = 0;
        aforceY = 0;
        currPos = traffic[current];

        // Attractors
        target = attractorCount
        while (target--) {
            attractor = attractors[target];
            spareX = currPos[0] - attractor[0];
            spareY = currPos[1] - attractor[1];
            distSquared = spareX * spareX + spareY * spareY;

            if (distSquared < attractor[2] * attractor[2]) {
                length = sqrt(spareX * spareX + spareY * spareY);
                traffic[current][SPEEDX] -= (attractor[3] * spareX / length) || 0;
                traffic[current][SPEEDY] -= (attractor[3] * spareY / length) || 0;
            }
        }

        target = size
        while (target--) {
            if (target === current) continue;
            spareX = currPos[0] - traffic[target][0];
            spareY = currPos[1] - traffic[target][1];
            distSquared = spareX * spareX + spareY * spareY;

            if (distSquared < sepDist) {
                sforceX += spareX;
                sforceY += spareY;
            } else {
                if (distSquared < cohDist) {
                    cforceX += spareX;
                    cforceY += spareY;
                }
                if (distSquared < aliDist) {
                    aforceX += traffic[target][SPEEDX];
                    aforceY += traffic[target][SPEEDY];
                }
            }
        }

        // Separation
        length = sqrt(sforceX * sforceX + sforceY * sforceY);
        traffic[current][ACCELERATIONX] += (sepForce * sforceX / length) || 0;
        traffic[current][ACCELERATIONY] += (sepForce * sforceY / length) || 0;
            // Cohesion
        length = sqrt(cforceX * cforceX + cforceY * cforceY);
        traffic[current][ACCELERATIONX] -= (cohForce * cforceX / length) || 0;
        traffic[current][ACCELERATIONY] -= (cohForce * cforceY / length) || 0;
            // Alignment
        length = sqrt(aforceX * aforceX + aforceY * aforceY);
        traffic[current][ACCELERATIONX] -= (aliForce * aforceX / length) || 0;
        traffic[current][ACCELERATIONY] -= (aliForce * aforceY / length) || 0;
    }
    current = size;

    // Apply speed/acceleration for
    // this tick
    while (current--) {
        if (accelerationLimit) {
            distSquared = traffic[current][ACCELERATIONX] * traffic[current][ACCELERATIONX] + traffic[current][ACCELERATIONY] * traffic[current][ACCELERATIONY];
            if (distSquared > accelerationLimit) {
                ratio = accelerationLimitRoot / sqrt(distSquared);
                traffic[current][ACCELERATIONX] *= ratio;
                traffic[current][ACCELERATIONY] *= ratio;
            }
        }

        traffic[current][SPEEDX] += traffic[current][ACCELERATIONX];
        traffic[current][SPEEDY] += traffic[current][ACCELERATIONY];

        if (speedLimit) {
            distSquared = traffic[current][SPEEDX] * traffic[current][SPEEDX] + traffic[current][SPEEDY] * traffic[current][SPEEDY];
            if (distSquared > speedLimit) {
                ratio = speedLimitRoot / sqrt(distSquared);
                traffic[current][SPEEDX] *= ratio;
                traffic[current][SPEEDY] *= ratio;
            }
        }

        traffic[current][POSITIONX] += traffic[current][SPEEDX];
        traffic[current][POSITIONY] += traffic[current][SPEEDY];
    }

    this.emit('tick', traffic);
}

},{"events":"C:\\Users\\urbangi\\AppData\\Roaming\\npm\\node_modules\\watchify\\node_modules\\browserify\\node_modules\\events\\events.js","inherits":"C:\\workspaces\\github\\fuzzy-octo-location\\node_modules\\inherits\\inherits_browser.js"}],"C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\flock\\world.js":[function(require,module,exports){
module.exports = World;


function World(opts, callback) {
    if (!(this instanceof World)) return new World(opts, callback);

    
}

},{}]},{},["C:\\workspaces\\github\\fuzzy-octo-location\\public\\js\\flock\\flock.js"]);
