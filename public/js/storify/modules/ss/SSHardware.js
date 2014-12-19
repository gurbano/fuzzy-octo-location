var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

module.exports = SSHardware;


var POS_X = -1000;
var POS_Y = 1000;
var POS_Z = 1000;

var FOV = 45;
var NEAR = 1;
var FAR = 400000 * 1000000;
var CLEAR_HEX_COLOR = 0x000000;

function SSHardware(parent, target, opts) {
    if (!(this instanceof SSHardware)) return new SSHardware(parent, opts);
    this.opts = helper.extend({
        name: 'SSHardware',
        id: 'SSHardware'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.target = target;
    this.producer = this.opts.producer || this.parent;
    this.settings =  this.opts.settings || {};
    this.settings.renderer =  this.settings.renderer || {};
    this.settings.camera =  this.settings.camera || {};
    this.settings.camera.maxZoom = 50 || this.settings.camera.maxZoom;
    this.settings.camera.minZoom = 5 || this.settings.camera.minZoom;

    
    SModule.call(this, this.opts);
    return this;
}

inherits(SSHardware, SModule);

SSHardware.prototype.postInit = function() {

    var self = this; //things are gonna get nasty
    console.info('SSHardware started');


    if (!self.parent.scene){
        console.error('THREE SCENE not initializated');
        return;
    }

    var projector = new THREE.Projector;
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    //RENDERER
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.setClearColorHex(0x000000);
    self.target.prepend(renderer.domElement);

    //STATS
    var render_stats = new Stats();//TODO:MOVE TO CSS
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '1px';
    render_stats.domElement.style.right = '1px';
    render_stats.domElement.style.zIndex = 100;
    self.target.append(render_stats.domElement);



    var camera = new THREE.PerspectiveCamera(FOV, window.innerWidth /  window.innerHeight, NEAR, FAR);
	self.parent.scene.add( camera );
    self.projector = projector;
    self.renderer = self.parent.renderer = renderer;
    self.camera = self.parent.camera = camera;
    self.camera.position.set(POS_X, POS_Y, POS_Z);
    self.camera.lookAt(new THREE.Vector3(0, 0, 0));
    self.stats = render_stats;
    self.bindToProducer(
        function(framecount) {
            self.stats.update();
            
        }, self.producer );


    //self.controls = self.parent.controls = self.getTrackballControls();
    self.controls = self.parent.controls = self.getFPSControls();

    

    /*RESIZE*/
    $(window).smartresize(function onWindowResize() {
        self.target.width(window.innerWidth);
        self.target.height(window.innerHeight);
        var w = self.target.width();
        var h = self.target.height();

        self.camera.aspect = w / h;
        self.camera.updateProjectionMatrix();

        self.renderer.setSize(w, h);

    });
};

var zoomFactor = 1.2;
SSHardware.prototype.zoomIn = function() {
    this.camera.fov *= zoomFactor;
    this.camera.fov = Math.min(this.settings.camera.maxZoom,this.camera.fov);
    this.camera.updateProjectionMatrix();
    //console.info(this.camera.fov);
};
SSHardware.prototype.zoomOut = function() {
    this.camera.fov /= zoomFactor;
    this.camera.fov = Math.max(this.settings.camera.minZoom,this.camera.fov);
    this.camera.updateProjectionMatrix();
    //console.info(this.camera.fov);
};

SSHardware.prototype.getTrackballControls = function() {
    var controls = new THREE.TrackballControls(this.camera, document.getElementById('UI-VIEW'));
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
    //controls.minDistance = EARTH_SIZE + EARTH_SIZE / 100;
    controls.maxDistance = 400000;
    controls.keys = [65, 83, 68];
    return controls;
};

SSHardware.prototype.getFPSControls = function() {
    var controls = new THREE.PointerLockControls( this.camera );
    this.camera.position.set(0, 0, 0);
    controls.enabled = true;
    this.parent.scene.add(controls.getObject());
    return controls;
};