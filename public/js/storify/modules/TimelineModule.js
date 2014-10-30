var SModule = require('./SModule.js');
var inherits = require('inherits');
var helper = require('../Helper.js')();
var smartresize = require('../Smartresize.js');

module.exports = TimelineModule;

/**
 * GMAP MODULE
 * !!! DOM NOT READY YET WHEN CALLED
 * manages integration with google maps
 *
 * @param {Object} opts
 */
function TimelineModule(story, opts) {
    if (!(this instanceof TimelineModule)) return new TimelineModule(opts);
    /*CALL SUPERCLASS*/
    SModule.call(this, {
        name: 'TimelineModule',
        id: 'GMAP'
    });
    this.UIedit = opts.UIedit; // timeline wrapper
    this.listeners = [];
    this.story = story; //story.js object
    return this;
}

inherits(TimelineModule, SModule);


/**
 * DOM READY HERE
 * @return {[type]} [description]
 */
TimelineModule.prototype.postInit = function() {
    console.info('TimelineModule started', this.story.timeline);
    var self = this; //things are gonna get nasty

    /*CREATE AND APPEND THE MODULE UI*/
    this.$timeline = $($('<div class="module_timeline"></div>'));
    this.$timeline.show();
    this.$dragger = $($('<div class="draggable"></div>'));
    this.$timeline.append(this.$dragger);


    this.UIedit.append(this.$timeline);


    this._bk = 0;

    $(window).smartresize(function() {
        self.$dragger.setPosition(self._bk);
    });

    this.$dragger.getMaxPx = function() {
        return (self.$timeline.width() - self.$dragger.width());
    }
    this.$dragger.getPosition = function() {
        console.info(self.$dragger.offset());
        return (100 * (self.$dragger[0].offsetLeft / self.$dragger.getMaxPx()).toFixed(10));
    }
    this.$dragger.setPosition = function(percentage) {
        var offset = (percentage / 100) * self.$dragger.getMaxPx();
        //console.info(offset);
        self.$dragger.css('left', offset);
    }
    this.$dragger.pickFrame = function() {
        return self.story.timeline.getFrameAtPerc(self.$dragger.getPosition());
    }
    this.$dragger.draggable({
        containment: "parent",
        drag: function() {
            console.info(new Date(self.$dragger.pickFrame().time));
            //helper.debounce(self.notify)();
            self.notify();
        },
        stop: function() {
            self._bk = self.$dragger.getPosition(); 
        }
    });
    return this;
};

TimelineModule.prototype.notify = function() {
    var frame = this.$dragger.pickFrame();
    for (var i = 0; i < this.listeners.length; i++) {
        var listener = this.listeners[i];
        if (listener.onFramePicked) {
            listener.onFramePicked(frame);
        }
    };
    return this;
};
