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
    this.bindToProducer(function(frame) {   //BINDED TO TIMELINE CONTROLS
        var h = ((frame.time/(1000*60*60)).toFixed(0));
        var deg = (h%24)*15;
        self.earth.setEarthRotation(deg);
    }, opts.timeLineProducer || new SModule());
    //this.bindToProducer(function() {
    //
    //   }, opts.dataProducer || new SModule());
    this.opts = opts;
    return this;
}

inherits(EarthModule, SModule);

var HW = require("./earthmodule/EarthModule.Hardware.js");
var SM = require("./earthmodule/EarthModule.SceneManager.js");
var EARTH = require("./earthmodule/EarthModule.Earth.js");
var EarthModuleRAFProducer = require("./earthmodule/EarthModule.RAFProducer.js");

/*SUBMODULES*/
EarthModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('EarthModule started');
    self.hw = new HW(self, {}).start(); //Init hardware
    self.sm = new SM(self, {}).start(); //Init scene manager
    /*OBJECTS TO DISPLAY*/
    self.earth = new EARTH(self, {}).start(); //Planet earth

    console.info(this.opts);

    /*Create a ticker:
        1 - run the loop passed as arguments ()
        

     */
    self.ticker = new EarthModuleRAFProducer(
        self, {}, //parent, options 
        function(framecount, earthmodule) { //main loop. 
            earthmodule.hw.renderer.render(earthmodule.sm.scene, earthmodule.hw.camera);
            earthmodule.hw.controls.update();
            this.produce(framecount);
        }).start();

    return this;
};

EarthModule.prototype.produce = function(framecount) {
    debugger;
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume(framecount);
    };
};

EarthModule.prototype.consume = function(frame) { //

};
