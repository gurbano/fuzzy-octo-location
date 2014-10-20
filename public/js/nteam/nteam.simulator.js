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
                Asia: 15000,
                Europe: 5500,
                Africa: 150000,
                Oceania: 15000,
                Americas: 1500
            };
            var lastIndex = -1;
            var count = 0;
            var objs = 0;


            for (var i = 0; i < data.length; i++) {
                if (Number(data[i].area) * Number(data[i].relevance) >= relevanceMap[data[i].region]) {
                    count++;
                    data[i].id = new Date().getTime();
                    self.dd.drawCity(data[i].id, data[i].capital, data[i].latlng[0], data[i].latlng[1], data[i]);

                    if (lastIndex > 0) {
                        objs++;
                        self.dd.drawMovingObject({
                                "lat": data[i].latlng[0],
                                "lng": data[i].latlng[1]
                            }, {
                                "lat": data[lastIndex].latlng[0],
                                "lng": -data[lastIndex].latlng[1]
                            },
                            10);
                    }
                    lastIndex = i;

                } else {

                }
            };

            self.countries = data;
            console.info('added ' + count + ' countries');
            console.info('added ' + objs + ' objs');
            
            /*self.dd.drawMovingObject({
                    "lat": 42.83333333,
                    "lng": 12.83333333
                }, {
                    "lat": 38,
                    "lng": -97
                },
                100);
            */

            _callback();
        });
    }
    return self;
}
