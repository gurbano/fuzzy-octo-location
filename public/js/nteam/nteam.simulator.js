var Simulator = function(dataDisplayer) {
    var self = this;
    self.dd = dataDisplayer;
    self.start = function(data, _callback) {
        console.info('Loading geo data');
        $.get('/assets/data/nteam/countries.txt', function(data) {
            data = $.parseJSON(data);
            var index = 0;
            var _index = 0;
            var relevanceMap = {
            	Asia : 150000,
            	Europe : 150000,
            	Africa : 150000,
            	Oceania : 150000,
            	Americas: 150000
            }
            for (var i = 0; i < data.length; i++) {
                if (Number(data[i].area) >= relevanceMap[data[i].region]) {
                    data[i].id = new Date().getTime();
                    self.dd.drawCity(data[i].id, data[i].capital, data[i].latlng[0], data[i].latlng[1]);
                    //console.info(index++ + ')added ' + data[i].name.common,data[i].region,data[i].area);
                }else{
                	console.info(_index++ + ')discarderd ' + data[i].name.common,data[i].region,data[i].area);
                }
            };
            self.countries = data;
            _callback();
        });
    }
    return self;
}
