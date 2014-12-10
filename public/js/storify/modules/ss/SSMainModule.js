var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

module.exports = SSMainModule;


function SSMainModule(target, opts) {
    if (!(this instanceof SSMainModule)) return new SSMainModule(opts);
    this.opts = helper.extend({
        name: 'SSMainModule',
        id: 'SSMainModule'
    }, opts);
    /*CALL SUPERCLASS*/
    this.$target = target;
    SModule.call(this, this.opts);
    return this;
}

inherits(SSMainModule, SModule);

var SSLoader = require('./SSLoader.js');
var SSHardware = require('./SSHardware.js');
var SSSceneManager = require('./SSSceneManager.js');
var SSEntityFactory = require('./SSEntityFactory.js');

SSMainModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('SSMainModule started');

    /*CREATE THE LOADER: load submodules async*/
    self.loader = new SSLoader({});
    self.bindToProducer(function(event) {
        console.info(event);
        if (event.type === 'onLoad') {

        }
        if (event.type === 'onLoadStart') {

        }
        if (event.type === 'onLoadEnd') {
        	self.sm.addEntity(self.ef.createTerrain(100, 100),'TERRAIN');
            //self.sm.addEntity(self.ef.getSphere(100).moveAt(0, 0, 0),'SPHERE');
            self.sm.addEntity(self.ef.createAxis(true, true, true),'AXIS','TERRAIN');
            //self.sm.addEntity(self.ef.createLights(true, true, true),'AXIS','TERRAIN');

        }
    }, self.loader);

    /*Create submodules and start application*/
    self.ef = new SSEntityFactory();
    self.sm = new SSSceneManager(self, {
        enabled: true
    });
    self.hw = new SSHardware(
        self, //parent
        self.$target, //target 
        {
            enabled: true,
            producer: self,
            settings: {
                camera: {
                    maxZoom: 40,
                    minZoom: 10
                },
                renderer: {}
            }
        }
    );
    self.loader.addSubmodule(self.sm).addSubmodule(self.hw).start();
};









SSMainModule.prototype.produce = function(frame) {
    var self = this; //things are gonna get nasty
    self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({
            framecount: frame
        });
    }
};


/*FRAME CONSUMER
  1 - produce (work as a proxy)
  2 - call render
  3 - update controls
*/
SSMainModule.prototype.consume = function(frame) {
    var self = this; //things are gonna get nasty
    self.produce(frame);
    if (self.renderer && self.scene && self.camera) {
        self.renderer.render(self.scene, self.camera);
    }
    if (self.controls) {
        self.controls.update();
        //console.info(self.camera.position);
    }
};
