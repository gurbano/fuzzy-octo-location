Newteam.prototype.separateWaterFromEarth = function() {
    var self = this;
    self.spGeo = new THREE.SphereGeometry(600, 50, 50);
    self.spGeo.position = new THREE.Vector3(-300, 0, -300);
    self.planetTexture = THREE.ImageUtils.loadTexture("/assets/data/nteam/map.jpg");
    self.mat2 = new THREE.MeshPhongMaterial({
        map: self.planetTexture,
        shininess: 0.2
    });
    self.sp = new THREE.Mesh(self.spGeo, self.mat2);

    var axisLength = 850;
    if (true) {
        self.sp.add(createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000, 1));
        self.sp.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00, 1));
        self.sp.add(createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF, 1));
    }

    if (true) {
        axisLength = 1850
        self.scene.add(createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000, 3));
        self.scene.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00, 3));
        self.scene.add(createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF, 3));
    }
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
};



var xAxis = new THREE.Vector3(1, 0, 0);
var yAxis = new THREE.Vector3(0, 1, 0);
var zAxis = new THREE.Vector3(0, 0, 1);
var xyaxis = new THREE.Vector3(1, 0, 1);

var tmp = 0;
Newteam.prototype.updateEarthRotation = function(deltax, deltay) {
    var self = this;
    if (deltax) {
        self.sp.rotateAroundOwnAxis(yAxis, deltax / 100);
    };
    if (deltay) {        
        self.sp.rotateAroundOwnAxis(xAxis, -deltay / 100);
    };
    self.sp.rotation.y += 0.0008;
}


var rotWorldMatrix;
THREE.Object3D.prototype.rotateAroundOwnAxis = function(axis, radians) {
    mesh.matrix.multiplySelf(rotation_matrix);
    mesh.rotation.setRotationFromMatrix(mesh.matrix);
    this.rotateAroundWorldAxis(axis,radians);

}
THREE.Object3D.prototype.rotateAroundWorldAxis = function(axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(this.matrix);
    this.matrix = rotWorldMatrix;
    this.rotation.setFromRotationMatrix(this.matrix);
}









function v(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

//Create axis (point1, point2, colour)
function createAxis(p1, p2, color, width) {
    var line, lineGeometry = new THREE.Geometry(),
        lineMat = new THREE.LineBasicMaterial({
            color: color,
            lineWidth: width
        });
    lineGeometry.vertices.push(p1, p2);
    line = new THREE.Line(lineGeometry, lineMat);
    //scene.add(line);
    return line;
}
