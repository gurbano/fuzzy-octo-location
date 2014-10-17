Newteam.prototype.lightsOn = function() {
    var self = this;
    self.light = new THREE.DirectionalLight(0x3333ee, 3.5, 500);
    self.scene.add(self.light);
    self.light.position.set(POS_X, POS_Y, POS_Z - 1000);
    self.light.lookAt(POS_X, POS_Y, POS_Z);

    var hex  = 0xff0000;
    var bbox = new THREE.BoundingBoxHelper(self.light, hex);
    bbox.update();
    self.scene.add(bbox);
};
