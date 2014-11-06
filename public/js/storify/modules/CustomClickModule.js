var SModule = require('././SModule.js');
var inherits = require('inherits');
var smartresize = require('.././Smartresize.js');
var helper = require('.././Helper.js')();
var EventType = require('.././EventType.js');

module.exports = CustomClickModule;


function CustomClickModule(delay, opts) {
    if (!(this instanceof CustomClickModule)) return new CustomClickModule(opts);
    this.opts = helper.extend({
        name: 'CustomClickModule',
        id: 'CustomClickModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    this.delay = delay;
    return this;
}

inherits(CustomClickModule, SModule);

CustomClickModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('CustomClickModule started');
    this.timeout = setTimeout(function(){
    	self.produce.call(self)
    }, self.delay);
};
CustomClickModule.prototype.produce = function() {
	var self = this; //things are gonna get nasty
	self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({});
    };
     this.timeout = setTimeout(function(){
    	self.produce.call(self)
    }, self.delay);
};
