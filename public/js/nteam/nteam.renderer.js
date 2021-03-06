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

    if(self.stats)self.stats.update();
    if (self.renderer)
        self.renderer.render(self.scene, self.camera);
};




Newteam.prototype.giveLife = function(dead) {
    var self = this;
    var heartBeat = function(self) {
        dead();
        self.controls.update();
        requestAnimationFrame(function() {
            heartBeat(self)
        });
    }

    heartBeat(self);
}
