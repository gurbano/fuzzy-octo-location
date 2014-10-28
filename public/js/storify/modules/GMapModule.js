var SModule = require('./SModule.js');
var inherits = require('inherits');
var helper = require('../Helper.js')();

module.exports = GMapModule;

/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
function GMapModule(opts) {
    if (!(this instanceof GMapModule)) return new GMapModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'GMapModule',
        id: 'GMAP'
    });

    this.selector = opts.selector; // where the map will be displayed

    this.mapOptions = {
        center: new google.maps.LatLng(41.54, 12.30),
        disableDefaultUI: true,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});


    return this;
}

inherits(GMapModule, SModule);

GMapModule.prototype.postInit = function() {
    console.info('GMapModule started');
    this.$elector = $(document.getElementById(this.selector));
    this.adjustSize();
    this.map = new google.maps.Map(document.getElementById(this.selector), this.mapOptions);
    return this;
};

GMapModule.prototype.adjustSize = function() {
	var $elector = this.$elector;
	helper.maximize($elector);
    $(window).resize(
    	function(){
    		helper.maximize($elector);
    	});
};
