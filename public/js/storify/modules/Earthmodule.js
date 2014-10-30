var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = EarthModule;


function EarthModule(opts) {
    if (!(this instanceof EarthModule)) return new EarthModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'EarthModule',
        id: 'EARTH'
    });

    this.selector = opts.selector; // where the map will be displayed
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});

    return this;
}

inherits(EarthModule, SModule);

EarthModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('EarthModule started');
    this.$elector = $(document.getElementById(this.selector));

    /**/
    


    return this;
};

EarthModule.prototype.adjustSize = function() {
    
};


EarthModule.prototype.onFramePicked = function(frame) {
    var self = this; //things are gonna get nasty
   
};

EarthModule.prototype.onRender = function(frame) {
    var self = this; //things are gonna get nasty
   
};