Newteam.prototype.lightsOn = function() {
    var self = this;
    /*
    self.light = new THREE.DirectionalLight(0x3333ee, 3.5, 500);
    self.scene.add(self.light);
    self.light.position.set(POS_X, POS_Y, POS_Z_L);
    self.light.lookAt(POS_X, POS_Y, POS_Z);
*/

     // soft white light
	//self.scene.add( new THREE.AmbientLight( 0x151515 ) );
	


    self.light = new THREE.DirectionalLight(0xffaaaa, 1);
    self.light.position.set(POS_X_L, POS_Y_L, POS_Z_L);
    self.light.lookAt(POS_X, POS_Y, POS_Z);
    self.scene.add(self.light);
};
