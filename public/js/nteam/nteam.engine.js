Newteam.prototype.initData = function(_callback) {
    /*$.get('/assets/data/nteam/density.csv', function(data) {
        _callback(data);
    });
    */
    $.get('/nteam/userdata/' + GLOBALS.usm.user.id, function(data) {
        console.info(data);
        _callback(data);
    })
};


Newteam.prototype.startEngine = function(_callback) {
    //debugger;
    var self = this;
    self.initData(function(data) { //LOAD GAME DATA
        //console.info(data);
        self.renderer.setSize(window.innerWidth, window.innerHeight);
        self.camera.aspect = window.innerWidth / window.innerHeight;
        self.camera.updateProjectionMatrix();
        self.initDataDisplayer();
        self.simulator = new Simulator(self.dd);
        self.loadTexture(function() {
            self.createEarth(); //Giorno due o Secondo giorno - Cielo e Mare
            self.simulator.start(data, function() {
                self.lightsOn(); //Giorno uno o Primo giorno - Notte e Giorno
                //Giorno tre o Terzo giorno - Alberi e piante
                self.startLoop(function gameLoop() {

                    self.updateCamera();
                    self.updateEarthRotation();
                    self.render();
                });
                _callback(null);
            });
        });



    });

    /*
    addDensity(CSVToArray(data));
            
            
            addClouds();
    */


};
