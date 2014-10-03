var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
	objectId: {type: mongoose.Schema.Types.ObjectId, index: false} ,
	when: {type: Date, index:true},
	where: {lat: {type : Number} , lng: {type: Number} }
});
var Event = mongoose.model('Event', EventSchema);
mongoose.
module.exports = Event;