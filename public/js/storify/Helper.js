module.exports = Helper;

function Helper(){
	if (!(this instanceof Helper)) return new Helper();
	this.DATE_FORMAT = 'hh:ii dd/mm/y';
	return this;
}
Helper.prototype.dateToString = function(date) {
        return $.formatDateTime(this.DATE_FORMAT, date);
};
Helper.prototype.stringToDate = function(s) {
        return new Date(s);
};