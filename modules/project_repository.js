exports = module.exports = function($) {
	var api = {};
	api.findAll = function findAll(testData) {
		return [
			newProject('storify',{},'storify',''),
			newProject('earth',{},'earth',''),
			newProject('cowabunga',{},'cowabunga','')
		]
	};
	return api;
}
var newProject = function(_name, _tags, _url, _desc){
	return{
		name : _name,
		tags : _tags,
		url : _url,
		description : _desc
	}
}