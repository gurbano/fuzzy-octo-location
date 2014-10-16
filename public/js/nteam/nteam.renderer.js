//Newteam.prototype.requestAnimationFrame = requestAnimationFrame;
Newteam.prototype.startLoop = function(gameLoop) {
    var self = this;
    self.giveLife(function() {
        //console.info('gameLoop');
        gameLoop();
    });
};


Newteam.prototype.render = function() {
    var self = this;

    var timer = Date.now() * 0.0001;
    
    self.renderer.render(self.scene, self.camera);
};




Newteam.prototype.giveLife = function(dead) {
    var self = this;
    var heartBeat = function(self) {
        dead();
        requestAnimationFrame(function() {
            heartBeat(self)
        });
    }

    heartBeat(self);
}