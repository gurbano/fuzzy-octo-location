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
function GMapModule(story, opts) {
    if (!(this instanceof GMapModule)) return new GMapModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'GMapModule',
        id: 'GMAP'
    });

    this.parent = opts.parent; // where the map will be displayed

    this.mapOptions = {
        center: new google.maps.LatLng(41.54, 12.30),
        disableDefaultUI: true,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapOptions = helper.extend(this.mapOptions, opts.mapOptions || {});
    this.story = story; //story.js object
    return this;
}

inherits(GMapModule, SModule);

GMapModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('GMapModule started');
    this.$elector = $($("<div id='map-canvas'></div>"));
    this.parent.append(this.$elector);
    this.adjustSize();
    this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);

    this.bar = this.createTimelineUI('GMapModuleTBar', this.parent);
    this.bar.css('bottom', '50px');

    var myDropzone = new Dropzone("div#GMapModuleTBar", {
        url: "/storify/uploadKML"
    });
    myDropzone.on("success", function(file, res) {
        //console.info(res);
        self.importKML(res);
    });
    myDropzone.on("complete", function(file) {

    });
    myDropzone.on("uploadprogress", function(file, progress) {

    });
    this.drop = myDropzone;
    var center;

    function calculateCenter() {
        center = self.map.getCenter();
    }
    google.maps.event.addDomListener(this.map, 'idle', function() {
        calculateCenter();
        //console.info('idle', center);
    });
    $(window).smartresize(function() {
        self.map.setCenter(center);
        //console.info('resize', center);
    });
    this.marker = new google.maps.Marker({
        position: this.mapOptions.center,
        map: this.map
    });

    return this;
};


var GMapModuleImporter = require('./GMapModule/GMapModuleImporter.js');
GMapModule.prototype.importKML = function(res, opts) {
    var start = new Date(res.start)
    var end = new Date(res.end)
    if (this.story.timeline.start.getTime() > start.getTime()) {
        //console.info('need to extend start', this.story.timeline.start, start);
        this.story.timeline.extend(start, this.story.timeline.end);
    }
    if (this.story.timeline.end.getTime() < end.getTime()) {
        //console.info('need to extend end', this.story.timeline.end, end);
        this.story.timeline.extend(this.story.timeline.start, end);
    }
    console.info('Importing events ', res);
    var importer = new GMapModuleImporter(this);
    var events = importer.importGoogleLocation({
        postProcessing: [{
            func: importer.pp.fixNeighbours,
            opts: {
                name: 'fixNeighbours'
            }
        }, {
            func: importer.pp.interpolator,
            opts: {
                name: 'interpolator',
                sensXY: 10, //m
                sensT: 0.5 * 60 * 60 * 1000// 30 min
            }
        }, {
            func: importer.pp.reducer,
            opts: {
                name: 'reducer'
            }
        }]
    }, res, this.story.timeline); //timeline is needed to get infos about frame, scale etc.etc.

    var real = 0;
    var num = 0;
    var interpolated = 0;
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        this.story.timeline.addEvent(event);
        num++;
        if (event.isReal) real++;
        if (event.interpolated) interpolated++;
    };
    console.info('**********END IMPORT KML************');
    console.info(this.story.timeline);
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
    var ev = frame.getPositionEvent();
    if (ev) {
       // console.info('frameTime: ' + helper.dateToString(new Date(ev.end_time)) + ' --- real time: ' + helper.dateToString(new Date(ev.real_time)));
        
        //console.info('*****FRAME '+ev.index+' DUMP');
        //console.info( ev.index + ') R: (' + ev.isReal + ') I: (' + ev.interpolated + ') - dT: (' + helper.deltaToString(ev.real_time - ev.end_time) + ')' );
        console.info(ev.prev.index + ' ---> ' + ev.index + (ev.interpolated ? '*' : '' ) + ' ---> ' + ev.next.index );
        //console.info(ev);
        this.marker.setPosition(frame.getPositionEvent().position);

        if (this.editMode) { //in edit mode just move the mark

        } else {
            self.updatePosition(frame.getPositionEvent().position);
            // this.debounce(
            //     function() {
            //         //console.info(self.name + '[' + self.id + ']' + ' updated ', frame);
            //         //console.info(frame.getPosition());
            //         self.updatePosition(frame.getPositionEvent().position);
            //     }, 1000 / 33
            // );
        }
    }
};

GMapModule.prototype.updatePosition = function(position, opt) {
    var options = opt || {};

    this.map.setCenter(position);
};
