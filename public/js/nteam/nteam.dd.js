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
materials.sphereMat = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.2
});

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

    var cube = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), materials.sphereMat);
    cube.position.x = position.x;
    cube.position.y = position.y;
    cube.position.z = position.z;
    cube.lookAt(new THREE.Vector3(0, 0, 0));
    self.parent.sp.add(cube);
    return cube;
};

DataDisplayer.prototype.drawCity = function(id, name, lat, lng, data) {
    var self = this;
    //var cube = self.drawSphere(lat, lng, 10 + data.relevance*5);
    //cube.name = data.name.common;
    //DRAW CITY NAME
    //self.parent.scene.collision.push(cube);
    //return cube;
}
var easeInOutQuad = function(t, b, c, d) {
    if (t < d / 2) return 2 * c * t * t / (d * d) + b;
    var ts = t - d / 2;
    return -2 * c * ts * ts / (d * d) + 2 * c * ts / d + c / 2 + b;
}
DataDisplayer.prototype.drawMovingObject = function(start, end, speed) {
    var self = this;
    var _s = self.drawSphere(start.lat, start.lng, 3);
    var _e = self.drawSphere(end.lat, end.lng, 3);
    self.parent.scene.collision.push(_s);
    self.parent.scene.collision.push(_e);

    var obj = self.drawCube(start.lat, start.lng, 5);
    var updateObj = function(obj, start, end, step, steps) {
        if (step == steps) {
            updateObj(obj, end, start, 0, distance(start.lat,start.lng,end.lat,end.lng));
            return;
        }
        var newLat = easeInOutQuad(Number(step), Number(start.lat), Number(end.lat) - Number(start.lat), steps);
        var newLng = easeInOutQuad(Number(step), Number(start.lng), Number(end.lng) - Number(start.lng), steps);
        var position = self.parent.coords(newLat, newLng, 0);
        obj.position.x = position.x;
        obj.position.y = position.y;
        obj.position.z = position.z;
        obj.lookAt(_e.position);
        setTimeout(
            function() {
                step++;
                updateObj(obj, start, end, step, steps);
            }, 10/8
        );
    };
    setTimeout(
        function() {
            updateObj(obj, start, end, 0, distance(start.lat,start.lng,end.lat,end.lng));
        }, 10/8
    );

}


        


function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
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
    self.op = new ObjectPicker(self);


    return self;
};

var ObjectPicker = function(_parent) {
    var self = this;
    self.parent = _parent;
    self.projector = new THREE.Projector();
    var getPointer = function() {
        var light = new THREE.DirectionalLight(0x333333, .3);
        light.position.set(POS_X_L, POS_Y_L, POS_Z_L);
        light.lookAt(POS_X, POS_Y, POS_Z);
        return light;
    };
    self.parent.pointer = getPointer();
    self.parent.scene.add(self.parent.pointer);
    self.pick = function(x, y, cb) {
        var objects = self.parent.scene.collision;
        var camera = self.parent.camera;
        var vector = new THREE.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5);
        self.projector.unprojectVector(vector, camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
            cb(intersects[0], intersects);
        }

    };


    GLOBALS.pick = self.pick;

    return self;
}
