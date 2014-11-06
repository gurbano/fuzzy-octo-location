var helper = require('../../Helper.js')();

var EARTH_SIZE = 600;
var POS_X = 0;
var POS_Y = 0;
var POS_Z = 0;

var POS_X_L = 12080;
var POS_Y_L = 0;
var POS_Z_L = 12080;

module.exports = EarthModuleObjEarth;

function EarthModuleObjEarth(parent, opts) {
    if (!(this instanceof EarthModuleObjEarth)) return new EarthModuleObjEarth(opts);
    opts = helper.extend({
        name: 'EarthModuleObjEarth',
        id: 'EarthModuleObjEarth'
    }, opts);

    this.parent = parent;
    return this;
}

/**
 * init
 *      this.renderer
 *      this.camera
 *      this.controls
 * @return {[type]} [description]
 */
EarthModuleObjEarth.prototype.start = function(callback) {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var hw = parent.hw;
    var scene = parent.sm.scene;
    console.info('creating subscene', scene);
    var subscene = new THREE.Scene();

    //STARFIELD
    self.addBackground(subscene);
    self.addLights(subscene);

    //EARTH
    hw.loadTexture([{ //Big textures, ask for help from hw module
            id: 'planet',
            file: '/assets/images/nteam/2_no_clouds_4k.jpg'
        }, {
            id: 'bump',
            file: '/assets/images/nteam/elev_bump_4k.jpg'
        }, {
            id: 'specular',
            file: '/assets/images/nteam/water_4k.png'
        }, ],
        function(textures) { //asyncWay, earth is added once textures are loaded
            self.createEarth(subscene, textures, function(earth) {
                self.earthMesh = earth; //mesh
                subscene.add(earth);
                self.addClouds(earth);
            });
        }
    );






    //add subscene to the main scene
    self.subscene = subscene;
    scene.add(self.subscene);
    console.info('added planet earth', scene);
    return self;
};


EarthModuleObjEarth.prototype.addClouds = function(scene) {
    var radius = EARTH_SIZE;
    var segments = 32;
    var self = this; //things are gonna get nasty
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius + 5, segments, segments),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/nteam/fair_clouds_4k.png'),
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        })
    );
    scene.add(mesh);
};

EarthModuleObjEarth.prototype.addLights = function(scene) {
    var self = this; //things are gonna get nasty
    self.light = new THREE.DirectionalLight(0xffaaaa, 1);
    self.light.position.set(POS_X_L, POS_Y_L, POS_Z_L);
    self.light.lookAt(POS_X, POS_Y, POS_Z);
    scene.add(self.light);
    scene.add(new THREE.AmbientLight(0x151515));
    this.addSun(scene);
};

EarthModuleObjEarth.prototype.addSun = function(scene) {
    var self = this; //things are gonna get nasty
    var geometry = new THREE.SphereGeometry(EARTH_SIZE*10, 32, 16);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(POS_X_L, POS_Y_L, POS_Z_L);
};


EarthModuleObjEarth.prototype.addBackground = function(scene) {
    var radius = 3500;
    var segments = 32;
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/nteam/galaxy_starfield.png'),
            side: THREE.BackSide
        })
    );
    scene.add(mesh);
};




EarthModuleObjEarth.prototype.createEarth = function(scene, textures, callback) {
    var self = this;
    var geo = new THREE.SphereGeometry(EARTH_SIZE, 50, 50);
    geo.position = new THREE.Vector3(0, 0, 0);


    var mesh = new THREE.Mesh(
        geo,
        new THREE.MeshPhongMaterial({
            map: textures['planet'], //THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
            bumpMap: textures['bump'], //THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
            bumpScale: 0.005,
            specularMap: textures['specular'], //THREE.ImageUtils.loadTexture('images/water_4k.png'),
            specular: new THREE.Color('grey')
        })
    );

    callback(mesh);
};


EarthModuleObjEarth.prototype.setEarthRotation = function(degree) {
    if (this.earthMesh)
        this.earthMesh.rotation.y = degree * Math.PI / 180 // Rotates  45 degrees per frame
};

/*

mesh.rotation.x += 1;                      // Rotates   1 radian  per frame
mesh.rotation.x += Math.PI / 180;          // Rotates   1 degree  per frame
mesh.rotation.x += 45 * Math.PI / 180      // Rotates  45 degrees per frame

 */
