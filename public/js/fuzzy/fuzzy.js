init = function(GLOBALS) {
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
    var out = new cc($('#console')).start();
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("div#map-canvas", {
        url: "/upload"
    });
    myDropzone.on("success", function(file, res) {
        running = false;
        prepare(res);
    });
    myDropzone.on("complete", function(file) {
        myDropzone.removeFile(file);
    });
    myDropzone.on("uploadprogress", function(file, progress) {
        GLOBALS.pb.set(progress / 2);
    });


    /*MAP*/
    var center = new google.maps.LatLng(41.54, 12.30);

    var mapOptions = {
        center: center,
        disableDefaultUI: true,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,

    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'Hello World!'
    });
    var running = false;
    var speed = 100;

    //DRAGGABLE TO PERCENTAGE
    var d2p = function() {
        var px = $("#draggable").css('top').substr(0, $("#draggable").css('top').length - 2);
        return ((px / ($(window).height() - 50)) * 100).toFixed(4);
    };
    //PERCENTAGE TO DRAGGABLE
    var p2d = function(perc) {
        var total = $(window).height() - 50;
        $("#draggable").css('top', ((perc / 100) * total) + 'px');
    };
    //PERCENTAGE TO INDEX
    var p2i = function(perc) {
        index = ((data.length - 1) * (perc / 100)).toFixed(0);
        refresh()
    };

    var options = {
        axis: "y",
        containment: "parent",
        start: function() {
            running = false;
        },
        drag: function() {
            running = false;
            p2i(d2p());
        },
        stop: function() {
            running = true;
            p2i(d2p());
            start();
        }
    };
    $("#draggable").hide();
    var data = [];
    var prepare = function(_data) {
        $("#draggable").draggable(options);
        data = _data;
        $("#draggable").show();
        setTimeout(function() {
            running = true;
            start(0);
        }, speed * 5);
    };
    var index = 0;
    var refresh = function() {
        center = new google.maps.LatLng(data[index].where.lat, data[index].where.lng);
        map.setCenter(center);
        marker.setPosition(center);
        var perc = (index / data.length) * 100;
        p2d(perc);
        $("#draggable").html('<span>' + d(index) + '</span>');

    };
    var start = function() {
        if (data.length > 0 && running) {
            console.info(d(index));
            refresh();
            setTimeout(function() {
                index++;
                start(index);
            }, speed);
        } else {
            running = false;
            return;
        }
    };
    var f = function(date) {
        return $.formatDateTime('dd/mm/y hh:ii', date)
    };
    var d = function(index) {
        return f(new Date(data[index].when));
    };
};
