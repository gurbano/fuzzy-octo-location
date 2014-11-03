var helper = require('../../Helper.js')();

var EARTH_SIZE = 600;
var POS_X = 0;
var POS_Y = 0;
var POS_Z = 2800;

var POS_X_L = 120800;
var POS_Y_L = 0;
var POS_Z_L = 120800;

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
    //EARTH
    self.loadTexture([{
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
                subscene.add(earth);
                self.addLights(subscene);
            });
        }
    );






    //add subscene to the main scene
    self.subscene = subscene;
    scene.add(self.subscene);
    console.info('added planet earth', scene);
    return self;
};


EarthModuleObjEarth.prototype.addLights = function(scene) {
    var self = this; //things are gonna get nasty
    self.light = new THREE.DirectionalLight(0xffaaaa, 1);
    self.light.position.set(POS_X_L, POS_Y_L, POS_Z_L);
    self.light.lookAt(POS_X, POS_Y, POS_Z);
    scene.add(self.light);
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


EarthModuleObjEarth.prototype.loadTexture = function(textures, callback, ret) {
    var self = this; //things are gonna get nasty

    ret = ret || {};
    console.info('Loading textures  [' + ret.lenght + '/' + textures.lenght + ']');
    if (textures.length === 0) {
        callback(ret);
    } else {
        var id = textures[textures.length - 1].id;
        var file = textures[textures.length - 1].file;
        THREE.ImageUtils.loadTexture(file, undefined, function(texture) {
            ret[id] = texture;
            self.loadTexture(textures.splice(0, textures.length - 1), callback, ret);
        });
    }
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
