var helper = require('../../Helper.js')();
require('./requestAnimationFrame.js');

module.exports = EarthModuleEngine;

function EarthModuleEngine(parent, opts) {
    if (!(this instanceof EarthModuleEngine)) return new EarthModuleEngine(opts);
    opts = helper.extend({
        name: 'EarthModuleEngine',
        id: 'EarthModuleEngine'
    }, opts);

    this.parent = parent;
    return this;
}

/**
 * init
 *      this.renderer
 *      this.camera
 *      this.controls
 * @return {[type]} [description]
 */
EarthModuleEngine.prototype.start = function() {
    var self = this; //things are gonna get nasty
    var parent = self.parent;
    var hw = parent.hw;
    console.info('starting engines...');
    self.render(self);


    return self;
};

EarthModuleEngine.prototype.render = function(self) {
    console.info('render');
    self.parent.hw.renderer.render(self.parent.sm.scene, self.parent.hw.camera);
    requestAnimationFrame(function() {
        self.render(self);
    });    
};
