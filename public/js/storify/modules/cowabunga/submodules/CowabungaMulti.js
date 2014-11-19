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
