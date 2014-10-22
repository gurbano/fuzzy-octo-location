var inherits = require('inherits');
var Event = require('./Event.js');

module.exports = GpsEvent;
function GpsEvent(opts){
	if (!(this instanceof GpsEvent)) return new GpsEvent(opts);
	Event.call(this);

	this.type = EventType.POSITION;
	return this;
}