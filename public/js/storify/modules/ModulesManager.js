var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = ModulesManager;


function ModulesManager(opts) {
    if (!(this instanceof ModulesManager)) return new ModulesManager(opts);
    opts = helper.extend({
        name: 'ModulesManager',
        id: 'ModulesManager'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);
    this.parent = opts.parent; // where the UI will be displayed 
    this.opts = opts;
    return this;
}

inherits(ModulesManager, SModule);

ModulesManager.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    console.info('ModulesManager started');
    var self = this; //things are gonna get nasty
    //this.win -- this.win.$title -- this.win.$content
    this.win = this.createModalWindow(
        'ModulesManager', // Title
        { //options
            content: '', //html to be displayed
            resizable: false,
            modal: true,
            width: 200,
            height: 150
        },
        this.parent); //parent div
    this.refresh();
}
ModulesManager.prototype.refresh = function() {
    var self = this; //things are gonna get nasty
    var html = '<p style="font-size:0.8em">List of modules installed</p>';
    this.win.$content.html(html);
    var ul = $('<ul style="list-style-type:none"></ul>');
    for (var i = 0; i < this.listeners.length; i++) {
        var module = this.listeners[i];
        var li = $("<li>" + module.name + "</li>");
        var check = $('<input type="checkbox"></input>');
        check.prop('val', i);
        li.prepend(check);
        check.prop('checked', module.enabled);
        check.click(function(el) {
            self.listeners[$(el.target).prop('val')].toggle(check.is(':checked'));
            setTimeout(function() {
                self.refresh();
            }, 500);
        });
        ul.append(li);
    };
    this.win.$content.append(ul);

}
