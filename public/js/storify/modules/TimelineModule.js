var SModule = require('./SModule.js');
var inherits = require('inherits');
var helper = require('../Helper.js')();

module.exports = TimelineModule;

/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
function TimelineModule(timeline,opts) {
    if (!(this instanceof TimelineModule)) return new TimelineModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'TimelineModule',
        id: 'GMAP'
    });
    this.selector = opts.selector; // timeline wrapper
    this.listeners = [];
    this.timeline = timeline;
    return this;
}

inherits(TimelineModule, SModule);

TimelineModule.prototype.postInit = function() {
    console.info('TimelineModule started');
    this.$elector = $(document.getElementById(this.selector));
    this.$elector.show();
    return this;
};
TimelineModule.prototype.attach = function(module) {
    this.listeners.push(module);
    return this;
};
TimelineModule.prototype.notify = function() {
    
    return this;
};


