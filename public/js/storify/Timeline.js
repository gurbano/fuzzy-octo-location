var Frame = require('./Frame.js');

module.exports = Timeline;

function Timeline(opts){
	if (!(this instanceof Timeline)) return new Timeline(opts);
	this.scale = opts.scale || 1; // delta minutes between frames
	this.frames = opts.frames || []; 
	this.start = opts.start || 0; // delta minutes between frames
	this.end = opts.end || 0; // delta minutes between frames
	return this;
}