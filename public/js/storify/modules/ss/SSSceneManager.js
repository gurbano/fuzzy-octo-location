var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

module.exports = SSSceneManager;


function SSSceneManager(parent,opts) {
    if (!(this instanceof SSSceneManager)) return new SSSceneManager(parent,opts);
    this.opts = helper.extend({
        name: 'SSSceneManager',
        id: 'SSSceneManager'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    SModule.call(this, this.opts);
    this.entities = {};
    return this;
}

inherits(SSSceneManager, SModule);

SSSceneManager.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('SSSceneManager started');
    self.scene = self.parent.scene = new THREE.Scene();   
};


SSSceneManager.prototype.addEntity = function(entity, parentId) {
	if (!entity.id){
		entity.id = helper.getUID();
	}
	this.entities[entity.id] = entity;

	if (!parentId || !this.entities[parentId]){
		this.scene.add(entity);
	}else{
		this.entities[parentId].add(entity);
	}
};


SSSceneManager.prototype.addAxis = function(entity, parentId) {
	if (!entity.id){
		entity.id = helper.getUID();
	}
	this.entities[entity.id] = entity;

	if (!parentId || !this.entities[parentId]){
		this.scene.add(entity);
	}else{
		this.entities[parentId].add(entity);
	}
};
