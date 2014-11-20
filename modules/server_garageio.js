var garageServer = require('garageserver.io');


exports = module.exports = GarageServer;

function GarageServer(server, $) {
    if (!(this instanceof GarageServer)) return new GarageServer(server, $);
    var self = this; //things are gonna get nasty    
    this.physicsInterval = 15;
    this.physicsDelta = this.physicsInterval / 1000;
    this.physicsIntervalId = 0;
    var io = require('socket.io');
    var sockets = io.listen(server.listener);
    this.server = garageServer.createGarageServer(sockets, {
        stateInterval: 45,
        logging: false,
        clientSidePrediction: true,
        interpolation: true,
        interpolationDelay: 100,
        smoothingFactor: 0.2,
        pingInterval: 2000,
        maxUpdateBuffer: 120,
        maxHistorySecondBuffer: 1000,
        worldState: {},
        onPlayerConnect: function(socket){
            console.info('onPlayerConnect');
        },
        onPlayerInput: function(socket,input){
            //console.info('onPlayerInput',socket,input);
        },
        onPlayerDisconnect: function(socket){
            console.info('onPlayerDisconnect');
        },
        onEventPing: function(socket,data){
           // console.info('onEventPing');
        },
        onEvent: function(data){
            //console.info('onEvent',data);
            if (data.type==='updateposition'){
                self.server.updatePlayerState(data.id, data.state);
            }
        },
    });
    return self;
};

GarageServer.prototype.start = function() {
    console.info('garageio // starting ');
    var self = this;
    this.physicsIntervalId = setInterval(function() {
        self.update();
    }, this.physicsInterval);
    this.server.start();
    console.info('garageio // started');
    return this;
};

GarageServer.prototype.update = function() {;
    var players = this.server.getPlayers(),
        entities = this.server.getEntities(),
        self = this;
    players.forEach(function(player) {
         
    });
    for (var i = entities.length - 1; i >= 0; i--) {

    }
};
