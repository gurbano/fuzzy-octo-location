var SModule = require('./SModule.js');
var inherits = require('inherits');
var smartresize = require('../Smartresize.js');
var helper = require('../Helper.js')();
var EventType = require('../EventType.js');

module.exports = PlayBackModule;


function PlayBackModule(opts) {
    if (!(this instanceof PlayBackModule)) return new PlayBackModule(opts);
     opts = helper.extend({
            name: 'PlayBackModule',
            id: 'PlayBackModule'
    }, opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, opts);


    return this;
}

inherits(PlayBackModule, SModule);

PlayBackModule.prototype.postInit = function() {
    var self = this; //things are gonna get nasty
    var tmm = this.required('tmm');
    console.info('PlayBackModule  started');

    this.win = this.createModalWindow(
        'Playback', // Title
        { //options
            id: 'PlaybackWindows',
            content: '', //html to be displayed
            resizable: false,
            modal: false,
            width: 400,
            height: 150,
            position: {top: '90%', left:'0px'}
        },
        this.UIview); //parent div
    this.win.width($(window).width());

    $(window).smartresize(function(){
        self.win.width($(window).width());
    });
    this.win.$content.append(
        this.createButton(tmm.playback ? '||' : '->', function(btn, module) {
            tmm.togglePlay();
            btn.$text.html(tmm.playback ? '||' : '->');
        })
    );


    

    $(document).keydown(function(e) {
        switch (e.which) {
            case 32: //space bar
               
                return;
            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    return this;
}
PlayBackModule.prototype.consume = function(frame) {
    var self = this; //things are gonna get nasty
    var ev = frame.getPositionEvent();

}
