var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');

module.exports =  CowabungaSceneUpdater;


function CowabungaSceneUpdater(parent,opts) {
    if (!(this instanceof CowabungaSceneUpdater)) return new CowabungaSceneUpdater(parent,opts);
    this.opts = helper.extend({
            name: 'CowabungaSceneUpdater',
            id: 'CowabungaSceneUpdater'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
 	this.parent = parent;
 	this.target = this.opts.target || parent.scene;
    return this;
}

inherits(CowabungaSceneUpdater, SModule);

CowabungaSceneUpdater.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CowabungaSceneUpdater started');
};


CowabungaSceneUpdater.prototype.consume = function(data) {
    var self = this; //things are gonna get nasty
    console.info(data);
};