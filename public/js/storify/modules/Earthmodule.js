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
