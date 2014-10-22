var Story = require('./Story.js');
var Helper = require('./Helper.js');

module.exports = StoryFactory;
function StoryFactory(opts){
	if (!(this instanceof StoryFactory)) return new StoryFactory(opts);
	return this;
}

StoryFactory.prototype.generate = function() {

};