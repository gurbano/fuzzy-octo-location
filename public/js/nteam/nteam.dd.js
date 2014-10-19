var DataDisplayer = function(parent) {
    var self = this;
    self.parent = parent;
    //self.parent.dataLayer = new 

    return self;
};
var materials = {};
materials.cubeMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.2,
    emissive: 0xffffff
});
/*
materials.sphereMat = new THREE.ShaderMaterial( {
	uniforms: {
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() }
	},
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );*/

DataDisplayer.prototype.drawCube = function(lat, lng, height) {
    var self = this;
    var value = parseFloat(height);
    var position = self.parent.coords(lat, lng, 0);
    var cube = new THREE.Mesh(new THREE.BoxGeometry(5, 5, value), materials.cubeMat);
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;
    cube.lookAt(new THREE.Vector3(0, 0, 0));
    self.parent.sp.add(cube);
    return cube;
};
DataDisplayer.prototype.drawSphere = function(lat, lng, radius) {
    var self = this;
    var value = parseFloat(radius);
    var position = self.parent.coords(lat, lng, value - radius);

    var cube = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), materials.cubeMat);
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;
    cube.lookAt(new THREE.Vector3(0, 0, 0));
    self.parent.scene.add(cube);
    return cube;
};

DataDisplayer.prototype.drawCity = function(id,name, lat, lng) {
    var self = this;
    var cube = self.drawCube(lat, lng, 30);
 	//DRAW CITY NAME
    return cube;
}

Newteam.prototype.coords = function(lat, lon, heigth) {
    var phi = (lat) * Math.PI / 180;
    var theta = (lon - 180) * Math.PI / 180;

    var x = -(EARTH_SIZE + heigth) * Math.cos(phi) * Math.cos(theta);
    var y = (EARTH_SIZE + heigth) * Math.sin(phi);
    var z = (EARTH_SIZE + heigth) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
};



Newteam.prototype.initDataDisplayer = function(first_argument) {
    var self = this;
    self.dd = new DataDisplayer(self);


    //self.dd.drawCube(41.9, 12.5, 10);
    //self.dd.drawSphere(41.9, 12.5, 100);


    return self;
};
