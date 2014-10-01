/*http://adambom.github.io/parallel.js/*/
var Parallel = require('paralleljs');
//var eval ='modules/eval.js';
var $ = require('../global');
exports = module.exports = function($) {
	var battery = {};
	battery.maxWorkers = 10;
	battery.job = function(job, data, callback) {
		new Parallel(data).spawn(job).then(callback);
	};
	battery.map = function(job, data, callback) {
		new Parallel(data).map(job).then(callback);
	};
	battery.reduce = function(map, reduce, data, callback) {
		new Parallel(data).map(map).reduce(reduce).then(callback);
	};
	battery.start = function() {
		console.info('battery module running', '//', ' workers:', battery.maxWorkers);
		return battery;
	};
	return battery;
};



/*
 -- USE
var longJob = function(data){console.info('job ', data ,' started');while(new Date().getTime() < new Date().getTime()+ 5000) {;}
                return data;};                    
var loggingCallback = function(result){console.info('job ', result ,' completed');};

battery.job(longJob,i,loggingCallback); 

*/