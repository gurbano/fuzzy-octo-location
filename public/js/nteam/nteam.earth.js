Newteam.prototype.separateWaterFromEarth = function() {
    var self = this;
    self.rotation = {x:0,y:0};
    self.spGeo = new THREE.SphereGeometry(600, 50, 50);
    self.planetTexture = THREE.ImageUtils.loadTexture("/assets/data/nteam/map.jpg");
    self.mat2 = new THREE.MeshPhongMaterial({
        map: self.planetTexture,
        shininess: 0.2
    });
    self.sp = new THREE.Mesh(self.spGeo, self.mat2);
    //self.sp.rotation = self.rotation;
    self.scene.add(self.sp);
};

Newteam.prototype.breathWind = function() {
    var self = this;

    self.spGeoClouds = new THREE.SphereGeometry(600, 50, 50);
    self.cloudsTexture = THREE.ImageUtils.loadTexture("/assets/data/nteam/earth_clouds_1024.png");
    self.materialClouds = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: self.cloudsTexture,
        transparent: true,
        opacity: 0.3
    });
    self.meshClouds = new THREE.Mesh(self.spGeoClouds, self.materialClouds);
    self.meshClouds.scale.set(1.015, 1.015, 1.015);
    self.scene.add(self.meshClouds);
    self.rotation={x:0,y:0};
};


Newteam.prototype.getWorldRotation = function() {
    return this.rotation;
}
Newteam.prototype.setWorldRotation = function(rotation) {
    this.rotation = rotation;
};
Newteam.prototype.updateWorldRotation = function() {
    var self = this;
    self.sp.rotation =  self.rotation; 

    self.camera.lookAt(self.scene.position);
    self.light.position = self.camera.position;
    self.light.lookAt(self.scene.position);
};
