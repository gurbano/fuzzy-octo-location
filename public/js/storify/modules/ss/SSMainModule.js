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
	self.loader = new SSLoader({});
	self.bindToProducer(function(event) {
		console.info(event);
		if (event.type === 'onLoad') {

		}
		if (event.type === 'onLoadStart') {

		}
		if (event.type === 'onLoadEnd') {
			self.scene.add(self.ef.getSphere(100).moveAt(0, 0, 0));
			self.scene.add(self.ef.createAxis(true, true, true));
		}
	}, self.loader);
	self.ef = new SSEntityFactory();
	self.loader.addSubmodule(self.sm = new SSSceneManager(self, {
		enabled: true
	}));
	self.loader.addSubmodule(self.hw = new SSHardware(
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
	));
	self.loader.start();

};
SSMainModule.prototype.produce = function(frame) {
	var self = this; //things are gonna get nasty
	self.consumers = self.consumers || [];
	for (var i = 0; i < this.consumers.length; i++) {
		this.consumers[i].consume({
			framecount: frame
		});
	};
};

SSMainModule.prototype.consume = function(frame) {
	var self = this; //things are gonna get nasty
	self.produce(frame);
	if (self.renderer && self.scene && self.camera)
		self.renderer.render(self.scene, self.camera);
};