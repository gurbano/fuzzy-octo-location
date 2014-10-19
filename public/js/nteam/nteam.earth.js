Newteam.prototype.loadTexture = function(_callback) {
    var self = this;
    self.planetTexture = THREE.ImageUtils.loadTexture("/assets/images/nteam/2_no_clouds_4k.jpg", undefined, function() {
        self.planetBumpMap = THREE.ImageUtils.loadTexture("/assets/images/nteam/elev_bump_4k.jpg", undefined, function() {
            self.planetSpecularMap = THREE.ImageUtils.loadTexture("/assets/images/nteam/water_4k.png", undefined, function() {
                _callback();
            });
        });
    });
};

function createClouds(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius + 5, segments, segments),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/nteam/fair_clouds_4k.png'),
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        })
    );
}

function createStars(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('/assets/images/nteam/galaxy_starfield.png'),
            side: THREE.BackSide
        })
    );
}


Newteam.prototype.createEarth = function() {
    var self = this;
    self.spGeo = new THREE.SphereGeometry(EARTH_SIZE, 50, 50);
    self.spGeo.position = new THREE.Vector3(0, 0, 0);
    self.scene.add(createStars(3500, 32));
    self.clouds = createClouds(EARTH_SIZE, 32);
    self.scene.add(self.clouds);
    self.sp = new THREE.Mesh(
        self.spGeo,
        new THREE.MeshPhongMaterial({
            map: self.planetTexture, //THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
            bumpMap: self.planetBumpMap, //THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
            bumpScale: 0.005,
            specularMap: self.planetSpecularMap, //THREE.ImageUtils.loadTexture('images/water_4k.png'),
            specular: new THREE.Color('grey')
        })
    );

    var axisLength = 850;
    if (true) {
        /*
        self.sp.add(createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000, 1));
        self.sp.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00, 1));
        self.sp.add(createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF, 1));
        */
    }

    if (true) {
        axisLength = 10850;
        /*
        self.scene.add(createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000, 3));
        self.scene.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00, 3));
        self.scene.add(createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF, 3));
        */
        self.scene.add(createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0xffffff, 3));
    }
    self.scene.add(self.sp);


};



var xAxis = new THREE.Vector3(1, 0, 0);
var yAxis = new THREE.Vector3(0, 1, 0);
var zAxis = new THREE.Vector3(0, 0, 1);
var xyaxis = new THREE.Vector3(1, 0, 1);

var tmp = 0;

Newteam.prototype.updateEarthRotation = function(deltax, deltay) {
    var self = this;
    /*
    if (deltax) {
        self.sp.rotateAroundOwnAxis(yAxis, deltax / 100);
    };
    if (deltay) {        
        self.sp.rotateAroundOwnAxis(xAxis, -deltay / 100);
    };
   
    */
    //self.sp.rotation.y += 0.00032;
    self.clouds.rotation.y += 0.00034;
    self.clouds.rotation.x += 0.00008;
};


var rotWorldMatrix;
THREE.Object3D.prototype.rotateAroundOwnAxis = function(axis, radians) {
    this.rotateAroundWorldAxis(axis, radians);

};
THREE.Object3D.prototype.rotateAroundWorldAxis = function(axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(this.matrix);
    this.matrix = rotWorldMatrix;
    this.rotation.setFromRotationMatrix(this.matrix);
};









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
