var helper = require('../../Helper.js')();

module.exports = EarthModuleHardware;

var POS_X = 0;
var POS_Y = 0;
var POS_Z = 2800;

var POS_X_L = 120800;
var POS_Y_L = 0;
var POS_Z_L = 120800;

var EARTH_SIZE = 600;

var FOV = 45;
var NEAR = 1;
var FAR = 400000;
var CLEAR_HEX_COLOR = 0x000000;

var CAMERA_SPEED = 0.009;

function EarthModuleHardware(parent, opts) {
    if (!(this instanceof EarthModuleHardware)) return new EarthModuleHardware(opts);
    opts = helper.extend({
        name: 'EarthModuleHardware',
        id: 'EarthModuleHardware'
    }, opts);

    this.parent = parent;
    return this;
}

/**
 * init
 * 		this.renderer
 * 		this.camera
 * 		this.controls
 * @return {[type]} [description]
 */
EarthModuleHardware.prototype.start = function() {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var canvas = parent.canvas;
    var w = canvas.width();
    var h = canvas.height();

    /*
    RENDERER
     */
    self.renderer = new THREE.WebGLRenderer();
    self.renderer.setSize(w, h);
    self.renderer.setClearColorHex(0x000000);
    canvas.append(self.renderer.domElement);

    /*
    CAMERA
     */
    self.camera = new THREE.PerspectiveCamera(FOV, w / h, NEAR, FAR);
    self.camera.position.set(POS_X, POS_Y, POS_Z);
    self.camera.lookAt(new THREE.Vector3(0, 0, 0));

    /*
    CONTROLS
     */
    self.controls = new THREE.TrackballControls(self.camera,document.getElementById('UI-VIEW'));
    self.controls.rotateSpeed = 1.0;
    self.controls.zoomSpeed = 1.2;
    self.controls.panSpeed = 0.8;

    self.controls.noZoom = false;
    self.controls.noPan = false;

    self.controls.staticMoving = false;
    self.controls.dynamicDampingFactor = 0.3;

    self.controls.minDistance = 1200;
    self.controls.maxDistance = 4000;

    self.controls.keys = [65, 83, 68];
    self.controls.addEventListener('change', function() {
        self.parent.requestRender();
    });

    return self;
};
