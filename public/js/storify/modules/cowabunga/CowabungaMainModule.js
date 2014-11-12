var SModule = require('./../SModule.js');
var inherits = require('inherits');
var smartresize = require('../../Smartresize.js');
var helper = require('../../Helper.js')();
var EventType = require('../../EventType.js');

/*SUBMODULES*/
var CowabungaPhysics = require('./submodules/CowabungaPhysics.js');
var CowabungaHardware = require('./submodules/CowabungaHardware.js');
var CowabungaWorld = require('./submodules/CowabungaWorld.js');
var CowabungaCarInput = require('./submodules/CowabungaCarInput.js');


module.exports = CowabungaMainModule;


function CowabungaMainModule(handler, opts) {
    if (!(this instanceof CowabungaMainModule)) return new CowabungaMainModule(opts);
    this.opts = helper.extend({
        name: 'CowabungaMainModule',
        id: 'CowabungaMainModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, this.opts);
    //DEFAULT
    this.handler = $(handler);
    this.opts.physics = this.opts.physics || false;
    this.opts.multiplayer = this.opts.multiplayer || false;
    this.submodules = this.opts.submodules || [];
    this.opts.debug = this.opts.debug || false;
    this.debugSubmodules = this.opts.debugSubmodules || [];
    return this;
}

inherits(CowabungaMainModule, SModule);



CowabungaMainModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    this.started = false;
    GLOBALS.pb.set(0);
    async.parallel({
        //Init physics engine, create scene
        initPhysi: function(callback) {
            GLOBALS.pb.set(10);
            self.phy = new CowabungaPhysics(
                self, //parent
                {
                    gravity: new THREE.Vector3(0, -30, 0),
                    enabled: true,
                    producer: self
                });
            self.submodules.push(self.phy);
            callback(null, self.phy);
        },
        initHardware: function(callback) { //Camera, renderer
            GLOBALS.pb.set(20);
            self.hw = new CowabungaHardware(self, {
                enabled: true,
                producer: self
            });
            self.submodules.push(self.hw);
            callback(null, self.hw);
        },
        initInput: function(callback) { //create the input
            GLOBALS.pb.set(30);
            self.input = new CowabungaCarInput({
                enabled: true
            });
            self.submodules.push(self.input);
            callback(null, true);
        },
        initWorld: function(callback) { // add terrain, car
            GLOBALS.pb.set(40);
            self.world = new CowabungaWorld(self, {
                enabled: true,
                producer: self,
                carInput: self.input
            });
            self.submodules.push(self.world);
            callback(null, self.world);
        },
        initMulti: function(callback) {
            GLOBALS.pb.set(50);
            callback(null, true);
        },
        initSubModules: function(callback) {
            GLOBALS.pb.set(60);
            for (var i = 0; i < self.submodules.length; i++) {
                self.submodules[i].start();
            };

            callback(null, true);
        },
        initDebugSubModules: function(callback) {
            GLOBALS.pb.set(70);
            callback(null, self.opts.debug);
        },
    }, function(err, results) {
        self.started = true;

        self.bindToProducer(
            function(framecount) {
                //console.info('cowabunga main loop');
                self.camera.position.copy(self.ground.position).add(new THREE.Vector3(100, 80, 100));
                self.camera.lookAt(self.ground.position);
                self.renderer.render(self.scene, self.camera);

                /*UPDATE CAR*/
                //car position is updated in CowabungaCar.js -- line 70


            }, self);



        console.info('CowabungaMainModule started', results, self);
        GLOBALS.pb.set(100);
    });




};
CowabungaMainModule.prototype.produce = function() {
    var self = this; //things are gonna get nasty
    if (!this.enabled || !this.started) {
        return;
    }
    self.consumers = self.consumers || [];
    for (var i = 0; i < this.consumers.length; i++) {
        this.consumers[i].consume({
            framecount: this.framecount
        });
    };
};

CowabungaMainModule.prototype.consume = function(frame) {
    this.produce();
};
