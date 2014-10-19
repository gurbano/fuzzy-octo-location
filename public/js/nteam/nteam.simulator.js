var Simulator = function(dataDisplayer) {
    var self = this;
    self.dd = dataDisplayer;
    self.start = function(data, _callback) {

        $.get('/assets/data/nteam/countries.txt', function(data) {
            data = $.parseJSON(data);
            console.info('Loading geo data', data);
            var index = 0;
            var _index = 0;
            var relevanceMap = {
                Asia: 1500,
                Europe: 1500,
                Africa: 1500,
                Oceania: 1500,
                Americas: 1500
            };
            for (var i = 0; i < data.length; i++) {
                if (Number(data[i].area) >= relevanceMap[data[i].region]) {
                    data[i].id = new Date().getTime();
                    self.dd.drawCity(data[i].id, data[i].capital, data[i].latlng[0], data[i].latlng[1], data[i]);

                } else {
                    self.dd.drawMovingObject({
                            "lat": data[i].latlng[0],
                            "lng": data[i].latlng[1]
                        }, {
                            "lat": data[i-1].latlng[0],
                            "lng": -data[i-1].latlng[1]
                        },
                        100);
                }
            };
            self.countries = data;

            self.dd.drawMovingObject({
                    "lat": 42.83333333,
                    "lng": 12.83333333
                }, {
                    "lat": 38,
                    "lng": -97
                },
                100);


            _callback();
        });
    }
    return self;
}
