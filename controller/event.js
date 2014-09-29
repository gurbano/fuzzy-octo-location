exports = module.exports = function(Model){
	return{
		findAll: function(callback){
			Model.find({},function(err,docs){
				callback(err,docs);
			});
		},
		removeAll: function(callback){
			Model.remove({},function(err){callback(err);});
		},
		registerEvent : function(event,callback){
			var mod = new Model(event);
			mod.save(function (err, saved) {if (err) return console.error(err);});
		}
	}
}