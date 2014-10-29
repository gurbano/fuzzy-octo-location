var Frame = require('./Frame.js');

module.exports = Timeline;

function Timeline(opts) {
    if (!(this instanceof Timeline)) return new Timeline(opts);
    this.scale = opts.scale || 1; // delta minutes between frames
    this.frames = opts.frames || [];
    this.start = opts.start || 0; // ms
    this.end = opts.end || 0; // ms
    this.events = opts.events || [];

    this.initialize();

    return this;
}

/**
 * 1- crea l'array di Frame
 * @return list of events created during initialization
 */

Timeline.prototype.initialize = function() {
    console.warn('starting initialization');
    var GpsEvent = require('./GpsEvent.js');
    var startMs = this.start.getTime();
    var endMs = this.end.getTime();
    var diffMs = endMs - startMs;
    var diffm = diffMs / 1000 / 60;
    var diffh = diffm / 60;
    var diffd = diffh / 24;
    var self = this; //things are gonna get messy
    var lat = GLOBALS.position.coords.latitude;
    var lng = GLOBALS.position.coords.longitude;
    var ev = new GpsEvent({
        position: new google.maps.LatLng(lat, lng),
        start_frame : 0,
        end_frame : diffm-1,
        start_time : startMs,
        end_time : endMs
    });

    this.steps = diffm / this.scale;
    for (var i = 0; i < this.steps; i++) {        
        var frame = new Frame({
            index: i,
            time: startMs + (i * 1000 * 60 * this.scale),
            events: [ev] //cache is initialized 
        });
        this.frames.push(frame);
    }
    this.events.push(ev);
};



Timeline.prototype.getFrameAtPerc = function(_p) {
    var percentage = Math.max(0, Math.min(_p,100));
    var offset = ((percentage / 100) * (this.steps -1)).toFixed(0);
    return this.frames[offset];
};