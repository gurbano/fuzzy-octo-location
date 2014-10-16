Newteam.prototype.lightsOn = function() {
    var self = this;
    self.light = new THREE.DirectionalLight(0x3333ee, 3.5, 500);
    self.scene.add(self.light);
    self.light.position.set(POS_X, POS_Y, POS_Z);
};
