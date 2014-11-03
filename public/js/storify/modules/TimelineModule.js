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
    this.current = 0; //index of the current frame
    this.UIedit = opts.UIedit; // timeline wrapper
    this.listeners = [];
    this.story = story; //story.js object
    var self = this; //things are gonna get nasty
    $(document).keydown(function(e) {
        switch (e.which) {
            case 37: // left
                self.goToFrame(self.current - 1);
                break;

            case 38: // up
                break;

            case 39: // right
                self.goToFrame(self.current + 1);
                break;

            case 40: // down
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });



    return this;
}



inherits(TimelineModule, SModule);


/**
 * DOM READY HERE
 * @return {[type]} [description]
 */
TimelineModule.prototype.postInit = function() {
    //console.info('TimelineModule started', this.story.timeline);
    var self = this; //things are gonna get nasty

    /*CREATE AND APPEND THE MODULE UI*/
    this.$timeline = $($('<div class="module_timeline"></div>'));
    this.$timeline.show();
    this.$dragger = $($('<div class="draggable"></div>'));
    this.$timeline.append(this.$dragger);


    this.UIedit.append(this.$timeline);


    this._bk = 0;

    $(window).smartresize(function() {
        self.$dragger.notify();
    });
    this.$dragger.getMaxPx = function() {
        return (self.$timeline.width() - self.$dragger.width());
    };
    this.$dragger.getPosition = function() {
        return (100 * (self.$dragger[0].offsetLeft / self.$dragger.getMaxPx()).toFixed(10));
    };
    this.$dragger.setPosition = function(percentage) {
        var offset = (percentage / 100) * self.$dragger.getMaxPx();
        self.$dragger.css('left', offset);
    };
    this.$dragger.notify = function() {
        var index = self.current;
        self.$dragger.setPosition(self.story.timeline.getPercAtFrame(self.current, 10)); //In case the frame is changed,update position
    };
    this.$dragger.draggable({
        containment: "parent",
        drag: function() {
            self.current = self.story.timeline.getFrameAtPerc(self.$dragger.getPosition()).index;
            self.notify();
        },
        stop: function() {
            self.current = self.story.timeline.getFrameAtPerc(self.$dragger.getPosition()).index;
            self.notify();
        }
    });

    this.dateDisplay = $("<span></span>");
    this.$dragger.append(this.dateDisplay);

    return this;
};
TimelineModule.prototype.goToFrame = function(index) { //TODO: implementare bene
    var self = this; //things are gonna get nasty
    self.current = Math.max(0, Math.min(index, self.story.timeline.steps - 1));;
    self.notify();
};
TimelineModule.prototype.pickFrame = function() {
    var self = this; //things are gonna get nasty
    return self.story.timeline.frames[self.current];
};

TimelineModule.prototype.notify = function() {
    var frame = this.pickFrame();
    if (frame) {
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (listener.onFramePicked) {
                listener.onFramePicked(frame);
            }
        }
        this.$dragger.notify();
        this.dateDisplay.html(helper.dateToString(new Date(frame.time)));
        

        //console.info(frame);

    }
    return this;
};
