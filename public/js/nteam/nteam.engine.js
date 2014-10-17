Newteam.prototype.initData = function(_callback) {
    $.get('/assets/data/nteam/density.csv', function(data) {
        _callback(data);
    });


};


Newteam.prototype.startEngine = function(_callback) {
    //debugger;
    var self = this;
    self.initData(function(data) {
        //console.info(data);
        /*
        	
			
        	
        	Giorno quattro o Quarto giorno - Sole e Luna
        	Giorno cinque o Quinto giorno - Pesci e uccelli
        	Giorno sei o Sesto giorno - Uomo e Animali
        	Giorno sette o Settimo giorno - Riposo
        */
        self.data = data;
        self.lightsOn(); //Giorno uno o Primo giorno - Notte e Giorno
        self.separateWaterFromEarth(); //Giorno due o Secondo giorno - Cielo e Mare
        //self.breathWind();
        
        
        //Giorno tre o Terzo giorno - Alberi e piante
        

        self.startLoop(function gameLoop(){
            
            self.updateCamera();
            self.updateEarthRotation();
    		self.render();
        });
        _callback(null);

    });

    /*
    addDensity(CSVToArray(data));
            
            
            addClouds();
    */


};
