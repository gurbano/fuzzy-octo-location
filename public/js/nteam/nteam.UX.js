Newteam.prototype.UX = function(options) {
    var self = this;
    self.tmp = {};
    self.tmp.dx = false;
    self.throw = function(type, params, event) {
        //console.info(type,event);
        if (options[type]) {
            options[type](params, event);
        }
    };
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    self.stats = stats;
    $('body').append(stats.domElement);
    if (options.events){
        for (var i = options.events.length - 1; i >= 0; i--) {
            var ev = options.events[i];
            self.mapDiv.addEventListener(ev,function(event){
                self.throw(ev,{},event);
            });
        };
    }


};













/*
    
    self.mapDiv.addEventListener("mousedown", function(event) {
        self.UX.mouse.sx = true;
        self.UX.mouse.dragStart.x = event.clientX;
        self.UX.mouse.dragStart.y = event.clientY;

    }, false);
    self.mapDiv.addEventListener("mousemove", function(event) {
        if(self.UX.mouse.sx){
            self.throw('onDrag', 
                {dx: event.clientX - self.UX.mouse.dragStart.x , dy: event.clientY - self.UX.mouse.dragStart.y}
                ,event);
            self.UX.mouse.dragStart.x = event.clientX;
            self.UX.mouse.dragStart.y = event.clientY;
        }        

    }, false);
    self.mapDiv.addEventListener("mouseup", function(event) {
        self.UX.mouse.sx = false;
    }, false);

    $(document).keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        self.throw('keypress', {}, event);

    });
*/