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
    this.editMode =  opts.editMode || false;
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