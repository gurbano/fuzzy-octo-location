var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

module.exports = SSEntityFactory;


function SSEntityFactory(opts) {
	if (!(this instanceof SSEntityFactory)) return new SSEntityFactory(opts);
	this.opts = helper.extend({
		name: 'SSEntityFactory',
		id: 'SSEntityFactory'
	}, opts);
	/*CALL SUPERCLASS*/
	SModule.call(this, this.opts);
	this.start();
	return this;
}

inherits(SSEntityFactory, SModule);

SSEntityFactory.prototype.postInit = function() {
	var self = this; //things are gonna get nasty
	console.info('SSEntityFactory started');
};

SSEntityFactory.prototype.getSphere = function(radius, material) {
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 100, 100), material || new THREE.MeshNormalMaterial());
	sphere.overdraw = true;
	return sphere
};

SSEntityFactory.prototype.createAxis = function(x, y, z) {
	var axisLength = 850;
	var createAxis = function(p1, p2, color, width) {
		var line, lineGeometry = new THREE.Geometry(),
			lineMat = new THREE.LineBasicMaterial({
				color: color,
				lineWidth: width
			});
		lineGeometry.vertices.push(p1, p2);
		line = new THREE.Line(lineGeometry, lineMat);
		return line;
	}
	var group = new THREE.Object3D();//create an empty container 
	if (x) group.add(createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000, 1));
	if (y) group.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00, 1));
	if (z) group.add(createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF, 1));
	return group;
};

function v(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

THREE.Mesh.prototype.moveAt = function(x, y, z) {
	this.position.set(x, y, z);
	return this;
};