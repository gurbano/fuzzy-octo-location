var SModule = require('./../../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../../Smartresize.js');
var helper = require('../../../Helper.js')();
var EventType = require('../../../EventType.js');
var CowabungaCarInput = require('./CowabungaCarInput.js');

module.exports = CowabungaCar;


function CowabungaCar(parent, opts) {
    if (!(this instanceof CowabungaCar)) return new CowabungaCar(parent, opts);
    this.opts = helper.extend({
        name: 'CowabungaCar',
        id: 'CowabungaCar'
    }, opts);
    /*CALL SUPERCLASS*/
    this.parent = parent;
    this.producer = this.opts.producer || this.parent;
    this.input = this.opts.input || new CowabungaCarInput({
        enabled: true
    });
    SModule.call(this, this.opts);

    return this;
}
inherits(CowabungaCar, SModule);

CowabungaCar.prototype.postInit = function() {
    console.info('CowabungaCar started: remember to call asyncStart(callback)');
};


CowabungaCar.prototype.asyncStart = function(callback) {
    var self = this; //things are gonna get nasty
    console.info('CowabungaCar Starting');
    var loader = new THREE.JSONLoader();
    loader.load("/assets/models/mustang.js", function(car, car_materials) {
        loader.load("/assets/models/mustang_wheel.js", function(wheel, wheel_materials) {
            var mesh = new Physijs.BoxMesh(
                car,
                new THREE.MeshFaceMaterial(car_materials)
            );
            mesh.position.y = 2;
            mesh.castShadow = mesh.receiveShadow = true;
            var vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
                10.88,
                1.83,
                0.28,
                500,
                10.5,
                6000
            ));
            var wheel_material = new THREE.MeshFaceMaterial(wheel_materials);
            self.parent.scene.add(vehicle);
            for (var i = 0; i < 4; i++) {
                vehicle.addWheel(
                    wheel,
                    wheel_material,
                    new THREE.Vector3(
                        i % 2 === 0 ? -1.6 : 1.6, -1,
                        i < 2 ? 3.3 : -3.2
                    ),
                    new THREE.Vector3(0, -1, 0),
                    new THREE.Vector3(-1, 0, 0),
                    0.5,
                    0.7,
                    i < 2 ? false : true
                );
            }
            var maxSteering = 0.5;
            var engineForce = 1200;
            var brake = 200;
            var correction = 0.05;
            var drag = 50;
            self.bindToProducer(
                function() {
                    var input = self.input.input;
                    var vehicle = self.vehicle;
                    if (input.direction !== null) {
                        input.steering += input.direction / 30;
                        if (input.steering < -maxSteering) input.steering = -maxSteering;
                        if (input.steering > maxSteering) input.steering = maxSteering;
                    }else{
                        if (Math.abs(input.steering)<=correction){input.steering=0;}
                        else if (input.steering>0) {input.steering-=correction;}else{input.steering+=correction;}
                    }
                    vehicle.setSteering(input.steering, 0);
                    vehicle.setSteering(input.steering, 1);

                    if (input.power === true) {
                        vehicle.applyEngineForce(engineForce);
                    } else if (input.power === false) {
                        vehicle.setBrake(brake, 2);
                        vehicle.setBrake(brake, 3);
                    } else {
                        vehicle.applyEngineForce(0);
                        vehicle.setBrake(drag, 0);
                        vehicle.setBrake(drag, 1);
                    }
                }, self.parent);

            self.vehicle = vehicle;
            callback(vehicle);
        });
    });
};


CowabungaCar.prototype.consume = function(input) {

};
