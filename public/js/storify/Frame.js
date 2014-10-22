var EventType = require('./EventType.js');
var GpsEvent = require('./GpsEvent.js');
var Event = require('./Event.js');

module.exports = Frame;

function Frame(opts){
	if (!(this instanceof Frame)) return new Frame(opts);
	this.index = opts.index || 0; // index of the frame, relative to the timeline
	this.time =  opts.time || 0; // date of the frame in ms
	this.events = opts.events || [];
	if (this.getEventsByType(EventType.POSITION).length==0){ //if no position is set, generate a new one (either from options or from null)
		this.events.push(opts.gps || new GpsEvent(opts.position || {}) ); //position infos
	}
	return this;
};


Frame.prototype.getEventsByType = function(type) {
	var ret =[];
	for (var i = 0; i < this.events.length; i++) {
		if (this.events[i].type === type){
			ret.push(this.events[i]);
		}
	};
	return ret;
};