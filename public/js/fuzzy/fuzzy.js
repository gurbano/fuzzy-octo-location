function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cc = function(div) {
    var self = this;
    self.version = '0.0.1';
    var text = '';
    var type = function(destination, stringa, _callback) {
        var chars = getRandomInt(1, 2);
        destination.html(destination.html() + stringa.substr(0, chars));
        if (stringa.length > 0) {
            setTimeout(function() {
                type(destination, stringa.substr(chars, stringa.length), _callback);
            }, 100);
        } else {
            if (_callback) _callback();
        }
    };
    self.info = function(stringa, _callback) {
        var element = $('<span class="info"></span>');
        div.append(element);
        type(element, stringa, _callback);
    };
    self.error = function(stringa, _callback) {
        var element = $('<span class="error"></span>');
        div.append(element);
        type(element, stringa, _callback);
    };
    self.go = function(phrases, _callback) {
        if (phrases.length > 0) {
            self.info(phrases[0], function() {
                self.go(phrases.slice(1), _callback);
            });
        } else {
            _callback();
        }
    };
    self.start = function() {
        return self;
    };
    return self;
};


init = function(GLOBALS) {

    $('#controls').click(function() {
        $(this).addClass('open');
    });
    $('#controls').dblclick(function() {
        $(this).removeClass('open');
    });
    var generateLink = function() {
        var stringa = "https://maps.google.com/locationhistory/b/0/kml?startTime=$start&endTime=$end";
        stringa = stringa.replace('$start', new Date($('#datepicker-from').val()).getTime());
        stringa = stringa.replace('$end', new Date($('#datepicker-to').val()).getTime());
        $('#google-location-history-link').attr("href", stringa);
    };
    $("#datepicker-from").datepicker({
        onSelect: function() {
            generateLink();
            return;
        }
    });
    $("#datepicker-to").datepicker({
        onSelect: function() {
            generateLink();
            return;
        }
    });
    var mapOptions = {
        center: {
            lat: 50.8231643,
            lng: 4.3673519
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var out = new cc($('#console')).start();
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("div#map-canvas", {
        url: "/upload"
    });
    myDropzone.on("success", function(file, res) {
        onUpload(res);
    });
    myDropzone.on("complete", function(file) {
        myDropzone.removeFile(file);
    });
    myDropzone.on("uploadprogress", function(file, progress) {
        GLOBALS.pb.set(progress/2);
    });

    

    var onUpload = function(data) {
    	var step = 50/data.length;
        for (var i = 0; i < data.length; i++) {
        	GLOBALS.pb.set(50 + (step*i));
            var event = data[i];
            data[i] = new google.maps.LatLng(data[i].where.lat, data[i].where.lng);
            data[i]._event = event;
        }
        var pointArray = new google.maps.MVCArray(data);
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });
        heatmap.set('radius', 20);
        heatmap.setMap(map);
    };
};