Newteam.prototype.UX = function(options) {
    var self = this;
    self.tmp = {};
    self.tmp.dx = false;
    self.throw = function(type, params, event) {
        //console.info(type,event);
        if (options[type]) {
            options[type](params,event);
        }
    };
    self.UX = {
        mouse: {
            move: false,
            sx: false,
            dx: false,
            x: 0,
            y: 0,
            directionX: 0,
            directionY: 0,
        }
    };


    self.mapDiv.addEventListener("mousedown", function(event) {
        self.UX.mouse.sx = true;
    }, false);
    self.mapDiv.addEventListener("mousemove", function(event) {
    	self.UX.mouse.directionX = self.UX.mouse.x > event.clientX;	
    	self.UX.mouse.directionY = self.UX.mouse.y > event.clientY;	
    	if(self.UX.mouse.sx){
    		self.throw('onDrag', {},event);
    	}        
        self.UX.mouse.x = event.clientX;
        self.UX.mouse.y = event.clienty;

    }, false);
    self.mapDiv.addEventListener("mouseup", function(event) {
        self.UX.mouse.sx = false;
    }, false);
};
