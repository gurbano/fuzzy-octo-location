Newteam.prototype.separateWaterFromEarth = function() {
    var self = this;
    self.rotation = {
        x: 0,
        y: 0,
        z: 0
    };
    self.spGeo = new THREE.SphereGeometry(600, 50, 50);
    self.planetTexture = THREE.ImageUtils.loadTexture("/assets/data/nteam/map.jpg");
    self.mat2 = new THREE.MeshPhongMaterial({
        map: self.planetTexture,
        shininess: 0.2
    });
    self.sp = new THREE.Mesh(self.spGeo, self.mat2);
    self.sp.rotation.x = 0;
    self.sp.rotation.y = 0;
    self.sp.rotation.z = 0;
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
    self.rotation.x = self.sp.rotation.x;
    self.rotation.y = self.sp.rotation.y;
    self.rotation.z = self.sp.rotation.z;
};


Newteam.prototype.getWorldRotation = function() {
    return this.rotation;
}
Newteam.prototype.setWorldRotation = function(rotation) {
    this.rotation = rotation;
};
Newteam.prototype.updateWorldRotation = function() {
     var self = this;
     
     if (self.rotation.x)
         self.sp.rotation.y = self.rotation.x;
     else self.sp.rotation.y = 0;
    /* if (self.rotation.y)
         self.sp.rotation.y = 0; //self.rotation.y
     else self.sp.rotation.y = 0;
     */
     if (self.rotation.y)
         self.sp.rotation.z = - self.rotation.y;
     else self.sp.rotation.z = 0;
    

    console.info(self.sp.rotation);
    self.camera.position.x = self.camera.position.x +1;
    //self.camera.lookAt(self.scene.position);
    //self.light.position = self.camera.position;
    //self.light.lookAt(self.scene.position);
};
