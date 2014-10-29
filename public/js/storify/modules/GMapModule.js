var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

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
    var self = this; //things are gonna get nasty
    console.info('GMapModule started');
    this.$elector = $(document.getElementById(this.selector));
    this.adjustSize();
    this.map = new google.maps.Map(document.getElementById(this.selector), this.mapOptions);
    var center;

    function calculateCenter() {
        center = self.map.getCenter();
    }
    google.maps.event.addDomListener(this.map, 'idle', function() {
        calculateCenter();
        console.info('idle', center);
    });
    $(window).smartresize(function() {
        self.map.setCenter(center);
        console.info('resize', center);
    });
    this.marker = new google.maps.Marker({
        position: this.mapOptions.center,
        map: this.map
    });

    return this;
};

GMapModule.prototype.adjustSize = function() {
    var $elector = this.$elector;
    helper.maximize($elector);
    $(window).smartresize(
        function() {
            helper.maximize($elector);
        });
};


GMapModule.prototype.onFramePicked = function(frame) {
    var self = this; //things are gonna get nasty
    this.marker.setPosition(frame.getPositionEvent().position);
    if (this.editMode) { //in edit mode just move the mark
        
    } else {
        this.debounce(
            function() {
                //console.info(self.name + '[' + self.id + ']' + ' updated ', frame);
                //console.info(frame.getPosition());
                self.updatePosition(frame.getPositionEvent().position);
            }, 1000 / 33
        );
    }
};

GMapModule.prototype.updatePosition = function(position, opt) {
    var options = opt || {};

    this.map.setCenter(position);
};
