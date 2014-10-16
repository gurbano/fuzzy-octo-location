function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /** Binds functions to divs*/
var Binder = function() {
    var self = this;
    /*CONTROLS*/
    self.controls = $('#controls');
    self.downloadLink = $('#google-location-history-link');
    self.datepicker_from = $('#datepicker-from');
    self.datepicker_to = $('#datepicker-to');
    self.help_keyboard = $('#help_keyboard');
    //http://flipclockjs.com/
    self.clock = new FlipClock($('#flipclock'), {
        autoStart: false
    });
    self.speedclock = new FlipClock($('#flipspeed'), {
        autoStart: false,
        clockFace: 'Counter'
    });
    self.clock.div = $('#flipclock');
    self.speedclock.div = $('#flipspeed');

    /*LOAD */
    self.loadExampleData = function() {
        $('#link_load_usa').click(function() {
            GLOBALS.pb.set(40);
            $.get("/fuzzy/load/usa", function(data) {
                self.hideControls();
                GLOBALS.engine.running = false;
                GLOBALS.dragger.init();
                GLOBALS.engine.init(data);
                GLOBALS.pb.set(100);
            });
        });
    };
    self.loadExampleData();

    self.hideControls = function() {
        self.controls.removeClass('open');
    };
    self.enableControls = function() {
        self.controls.click(function() {
            self.controls.addClass('open');
        });
        self.controls.dblclick(function() {
            self.controls.removeClass('open');
        });
        self.datepicker_from.datepicker({
            onSelect: function() {
                self.generateLink();
                return;
            }
        });
        self.datepicker_to.datepicker({
            onSelect: function() {
                self.generateLink();
                return;
            }
        });
    };
    self.generateLink = function() {
        var stringa = "https://maps.google.com/locationhistory/b/0/kml?startTime=$start&endTime=$end";
        stringa = stringa.replace('$start', new Date(self.datepicker_from.val()).getTime());
        stringa = stringa.replace('$end', new Date(self.datepicker_to.val()).getTime());
        self.downloadLink.attr("href", stringa);
    };
    self.enableRunUI = function() {
        $('#VCRcontrolBar').addClass('open');
        //self.help_keyboard.show();
        self.clock.div.show();
        self.speedclock.div.show();
    };
    self.disableRunUI = function() {
        $('#VCRcontrolBar').removeClass('open');
        self.help_keyboard.hide();
        self.clock.div.hide();
        self.speedclock.div.hide();
    };
    self.bindVCR = function() {
        $('.VCRcontrols').each(function(index) {
            $(this).click(function() {
                var command = $(this).attr('action');
                GLOBALS.engine.getCommand(command)();
            });
        });
    };
    var i = 0;
    self.updateUI = function(current) {
        //console.info(current);
        //$('#infotext').html(current.date);
        var date = current.date;
        //var timezone = +7; //TODO: REAL TIMEZONE
        // date.setHours(date.getHours()+timezone);
        self.clock.setTime(
            (60 * 60 * date.getHours()) +
            (60 * date.getMinutes()) +
            (getRandomInt(0, 59))
        );

        self.speedclock.setTime(
            prepad('' + current.speed, '0', 3)
        );
    };
    //self.disableRunUI();
    return self;
};
var prepad = function(stringa, _char, length) {
    if (stringa.length >= length) {
        return stringa;
    }
    var ret = stringa;
    for (var i = 0; i < length - stringa.length; i++) {
        ret = _char + ret;
    }
    return ret;
};
var Helper = function() {
    var self = this;
    //GLOBALS.handler.h = GLOBALS.handler.css('height').substr(0, GLOBALS.handler.css('height').length - 2);
    GLOBALS.handler.h = GLOBALS.handler.css('width').substr(0, GLOBALS.handler.css('width').length - 2);
    //DRAGGABLE TO PERCENTAGE
    self.d2p = function() {
        var px = GLOBALS.handler.css('left').substr(0, GLOBALS.handler.css('left').length - 2);
        //return ((px / ($(window).height() - GLOBALS.handler.h)) * 100).toFixed(4);
        return ((px / ($(window).width() - GLOBALS.handler.h)) * 100).toFixed(4);
    };
    //PERCENTAGE TO DRAGGABLE
    self.p2d = function(perc) {
        //var total = $(window).height() - GLOBALS.handler.h;
        var total = $(window).width() - GLOBALS.handler.h;
        //GLOBALS.handler.css('top', ((perc / 100) * total) + 'px');
        GLOBALS.handler.css('left', ((perc / 100) * total) + 'px');
    };
    //PERCENTAGE TO INDEX
    self.p2i = function(perc) {
        GLOBALS.engine.index = ((GLOBALS.engine.data.length - 1) * (perc / 100)).toFixed(0);
        GLOBALS.engine.refresh();
    };
    self.d2s = function(date) {
        return $.formatDateTime('hh:ii dd/mm/y', date);
    };
    self.i2d = function(index) {
        var data = GLOBALS.engine.data[GLOBALS.engine.index];
        return self.d2s(new Date(data.time));
    };

    return self;
};


var Dragger = function() {
    var self = this;
    //OPTIONS FOR THE DRAGGABLE
    self.options = {
        axis: "x",
        containment: "parent",
        start: function() {
            self.startDrag();
        },
        drag: function() {
            self.drag();

        },
        stop: function() {
            self.stopDrag();
        }
    };
    self.handler = $("#draggable");
    GLOBALS.handler = self.handler;
    GLOBALS.handler.hide();
    self.startDrag = function() {
        GLOBALS.engine.running = false;
    };
    self.drag = function() {
        GLOBALS.engine.running = false;
        //GLOBALS.controls.updateUI(GLOBALS.current());
        self.helper.p2i(self.helper.d2p());
    };
    self.stopDrag = function() {
        GLOBALS.controls.updateUI(GLOBALS.current());
        GLOBALS.map.setSpeedFactor(GLOBALS.current().speed, GLOBALS.current().acc);
        GLOBALS.engine.setSpeedFactor(GLOBALS.current().speed, GLOBALS.current().acc);
        self.helper.p2i(self.helper.d2p());
        //GLOBALS.engine.start();
    };
    self.init = function(_data) {
        self.helper = new Helper(self);
        GLOBALS.handler.draggable(self.options); //jquery draggable
        GLOBALS.handler.show();
        GLOBALS.controls.enableRunUI();
    };
    return self;
};

var Dropper = function(Dropzone) {
    var self = this;
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("div#map-canvas", {
        url: "/fuzzyupload"
    });
    myDropzone.on("success", function(file, res) {
        GLOBALS.engine.running = false;
        GLOBALS.dragger.init();
        GLOBALS.engine.init(res);
    });
    myDropzone.on("complete", function(file) {
        myDropzone.removeFile(file);
    });
    myDropzone.on("uploadprogress", function(file, progress) {
        GLOBALS.pb.set(progress);
    });
    return self;
};



var FuzzyMap = function() {
    var self = this;
    var BASE_ZOOM = 13;
    self.center = new google.maps.LatLng(41.54, 12.30);

    self.mapOptions = {
        center: self.center,
        disableDefaultUI: true,
        zoom: BASE_ZOOM,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    self.map = new google.maps.Map(document.getElementById('map-canvas'), self.mapOptions);
    self.marker = new google.maps.Marker({
        position: self.center,
        map: self.map,
        title: 'Hello World!',
    });
    google.maps.event.addListener(self.marker, 'click', function() {
        self.displayStreetView(self.marker.position);
    });
    self.displayStreetView = function(position) {
        $('#streetview').height($(document).height());
        //$('#streetview').show();
        var stringa = 'https://maps.googleapis.com/maps/api/streetview?size=200x200&location=' + position.lat() + ',' + position.lng() + '&key=AIzaSyBVzd4DmZi7gTTxGgl1xxu-dt9z-IOnRvc';
        $('#streetview-imageN').attr('src', stringa + '&heading=0');
        $('#streetview-imageNE').attr('src', stringa + '&heading=45');
        $('#streetview-imageE').attr('src', stringa + '&heading=90');
        $('#streetview-imageSE').attr('src', stringa + '&heading=135');
        $('#streetview-imageS').attr('src', stringa + '&heading=180');
        $('#streetview-imageSW').attr('src', stringa + '&heading=225');
        $('#streetview-imageW').attr('src', stringa + '&heading=270');
        $('#streetview-imageNW').attr('src', stringa + '&heading=315');
        $('#streetview img').each(function() {
            $(this).removeClass('hidden');
            $(this).click(function() {
                self.hideStreetView();
            });
        });
    };
    self.hideStreetView = function() {
        $('#streetview img').each(function() {
            $(this).addClass('hidden');
        });
    };
    self.setSpeedFactor = function(speed, acc) {
        //SANITY CHECK
        if (acc > 200) return;
        if (acc < -200) return;
        var currentZoom = Number(self.map.getZoom());
        var zoom = currentZoom; // BASE_ZOOM;
        //if (speed < 80 && zoom < BASE_ZOOM) { //at slow speed can zoom in
         //   zoom = BASE_ZOOM;
        //}
        //if (speed > 150) zoom = BASE_ZOOM - 2;
        if (speed > 200) zoom = BASE_ZOOM - 2;
        if (speed > 300) zoom = BASE_ZOOM - 4;
        if (speed > 400) zoom = BASE_ZOOM - 5;
        if (speed > 500) zoom = BASE_ZOOM - 6;
        if (speed > 600) zoom = BASE_ZOOM - 7;
        if (speed > 700) zoom = BASE_ZOOM - 8;
        //zoom = zoom - ( Number((GLOBALS.engine.speed - 3)/5).toFixed(0) ); //TODO:zoom according to the simulation speed
        if (zoom !== currentZoom) {
            console.info('ZOOM:', currentZoom, 'to', zoom, speed, GLOBALS.engine.speed);
            self.map.setZoom(zoom);
            GLOBALS.engine.pauseFor(Number(500 * Math.abs(currentZoom - zoom)));
        }
    };
    self.setCenter = function(center) {
        self.center = center;
        self.map.setCenter(center);
        self.marker.setPosition(center);
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            self.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        });
    }
    self.path = {};
    self.path.initialized = false;
    self.path.path = new google.maps.Polyline();
    self.path.pre = undefined;
    self.path.post = undefined;
    self.clearPath = function() {
        if (self.path.initialized) {
            self.path.initialized = false;
            self.path.path.setMap(null);
        }
    };
    self.drawPath = function(source, dest) {
        if (self.path.initialized) {
            if (self.path.pre.id == source.id && self.path.post.id == dest.id) {
                //same line, no need to redraw
                return;
            } else {
                self.clearPath();
            }
        }
        //DRAW THE NEW PATH
        var coords = [new google.maps.LatLng(source), new google.maps.LatLng(dest)];
        self.path.path = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        self.path.path.setMap(self.map);
        self.path.pre = source;
        self.path.post = dest;
    };
    return self;
};


var DataHolder = function() {
    var self = this;
    self.data = [];
    var MAX_ACCEL = 30000;
    // t: current time, b: begInnIng value, c: change In value, d: duration
    var easeInQuad = function(t, b, c, d) {
        return Number(c * (t /= d) * t + b);
    };
    var easeInOutQuad = function(t, b, c, d) {
        if (t < d / 2) return 2 * c * t * t / (d * d) + b;
        var ts = t - d / 2;
        return -2 * c * ts * ts / (d * d) + 2 * c * ts / d + c / 2 + b;
    }
    var toEvent = function(data) {
        var ret = {};
        ret.id = new Date().getTime();
        ret.where = {
            lat: data.where.lat,
            lng: data.where.lng
        };
        ret.latLng = new google.maps.LatLng(data.where.lat, data.where.lng);
        ret.when = data.when;
        ret.date = new Date(data.when);
        ret.time = ret.date.getTime();
        ret.interpolated = false;
        ret.speed = 0;
        return ret;
    };
    var toEventInterpolated = function(time, pre, post) {
        //http://stackoverflow.com/questions/1739019/how-to-use-linear-interpolation-estimate-current-position-between-two-geo-coordi
        pre = toEvent(pre);
        post = toEvent(post);
        //LINEAR
        var interpolation = (time - pre.time) / (post.time - pre.time);
        var newLat = Number(pre.where.lat) + Number(interpolation * (post.where.lat - pre.where.lat));
        var newLng = Number(pre.where.lng) + Number(interpolation * (post.where.lng - pre.where.lng));
        

        var hours = 1.5;
        var limit = hours * 60 * 60 * 1000;
        

        //var newLat = easeInOutQuad(Number(time - pre.time), Number(pre.where.lat), Number(post.where.lat) - Number(pre.where.lat), Number(post.time) - Number(pre.time));
        //var newLng = easeInOutQuad(Number(time - pre.time), Number(pre.where.lng), Number(post.where.lng) - Number(pre.where.lng), Number(post.time) - Number(pre.time));
        //var m = google.maps.geometry.spherical.computeDistanceBetween(self.data[x].latLng, self.data[x + 1].latLng);

        var interpolatePosition = true;//((post.time - pre.time) >= limit);
        var ret = {};
        ret.id = new Date().getTime();
        if (interpolatePosition) {
            ret.where = {
                lat: Number(newLat),
                lng: Number(newLng)
            };
            ret.latLng = new google.maps.LatLng(ret.where.lat, ret.where.lng);
        } else {
            ret.where = pre.where;
            ret.latLng = new google.maps.LatLng(pre.where.lat, pre.where.lng);
        }
        ret.date = new Date(time);
        ret.when = pre.when; //$.formatDateTime('hh:ii dd/mm/y', time);        
        ret.time = time;
        ret.interpolated = true;
        ret.pre = pre;
        ret.post = post;
        ret.speed = 0;
        return ret;
    };
    self.getRealTime = function(data) {
        if (data.isInterpolated) {
            return data.pre.time;
        } else {
            return data.time;
        }
    };
    self.init = function(_data) {
        var minTime = new Date(_data[0].when).getTime();
        var maxTime = new Date(_data[_data.length - 1].when).getTime();
        var minutes = ((maxTime - minTime) / 1000 / 60).toFixed(0);
        data = [];
        var lastIndex = 0;
        self.data[0] = toEvent(_data[0], minTime);
        /*REBUILD DATA*/
        for (var i = 1; i < minutes; i++) {
            var iTime = minTime + (i * 1000 * 60);
            //Choose the last one where eventTime<=iTime
            var found = false;
            for (var ii = lastIndex; ii < _data.length - 1; ii++) {
                var eventTime = new Date(_data[ii].when).getTime();
                if (eventTime > iTime) {
                    if (found) {

                    } else {
                        self.data[i] = toEventInterpolated(iTime, _data[ii - 1], _data[ii]);
                    }
                    break;
                } else {
                    self.data[i] = toEvent(_data[ii], iTime);
                    lastIndex = ii + 1;
                    found = true;
                }
            }
        }
        /*BUILD SPEED MAP*/
        //http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
        for (var x = 0; x < self.data.length - 1; x++) {
            /* WORKING*/
            var m = google.maps.geometry.spherical.computeDistanceBetween(self.data[x].latLng, self.data[x + 1].latLng);
            var speed = Number((m * 60) / 1000).toFixed(0);

            /* NOT WORKING
            var post = self.data[x];
            var pre = self.data[x+1];
            var m = google.maps.geometry.spherical.computeDistanceBetween(self.data[x].latLng, self.data[x + 1].latLng);
            var ms = Number(1000);
            if (post.isInterpolated && pre.isInterpolated){
                //Both interpolated, delta is 1000
                ms = Number(1000);
            }else if(post.isInterpolated || pre.isInterpolated){
                //only one of the two is interpolated, speed 0
                m = Number(0);
            }else{
                ms = Math.max(1, Number(post.time - pre.time) );
            }
            var speed = Number((m * 60) / ms).toFixed(0);
            */

            self.data[x].speed = speed;
            if (x > 1) {
                self.data[x].acc = self.data[x].speed - self.data[x - 1].speed;
            }
        }

        return self;
    };
    return self;
};


var Engine = function() {
    var self = this;
    var MAX_SPEED = 10; //10 minutes x second of playback
    var MIN_SPEED = 1; //1 minutes x second of playback
    var DEFAULT_SPEED = 3;
    self.speed = DEFAULT_SPEED;
    self.inxed = 0;
    self.running = false;
    self.data = [];
    self.dataHolder = {};
    self.pauseFor = function(ms) {
        if (self.running) {
            self.stop();
            setTimeout(self.start, ms);
        }
    };
    self.init = function(_data) {
        self.dataHolder = new DataHolder().init(_data);
        self.index = 0;
        self.data = self.dataHolder.data; //_data;
        $(document).keydown(function(e) {
            //console.info(e);
            switch (e.which) {
                case 37: // left
                    if (self.index > 0) self.index--;
                    self.stop();
                    self.refresh();
                    break;

                case 38: // up
                    if (!self.running)
                        self.start();
                    else
                        self.speed++;
                    break;

                case 39: // right
                    if (self.index < self.data.length - 1) self.index++;
                    self.stop();
                    self.refresh();
                    break;

                case 40: // down
                    if (self.running)
                        self.stop();
                    self.speed = DEFAULT_SPEED;
                    break;

                default:
                    return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        setTimeout(function() {
            self.running = true;
            self.start();
        }, 1000 / self.speed * 5);
    };
    self.setSpeedFactor = function(speed, acc) {

    };
    self.start = function() {
        self.running = true;
        self.run();
    };
    self.stop = function() {
        self.running = false;
    };
    self.run = function() {
        if (self.data.length > 0 && self.running) {
            //console.info(self.d(self.index));
            self.refresh();
            setTimeout(function() {
                self.index++;
                self.run();
            }, 1000 / self.speed);
        } else {
            self.running = false;
            return;
        }
    };
    self.refresh = function() {
        if (self.index < self.data.length) {
            var current = GLOBALS.current();
            /*UPDATE MAP*/
            var center = new google.maps.LatLng(current.where.lat, current.where.lng);
            GLOBALS.map.setCenter(center);

            /*UPDATE DRAGGER*/
            var perc = (self.index / self.data.length) * 100;
            GLOBALS.dragger.helper.p2d(perc); //move dragger according to percentage


            GLOBALS.controls.updateUI(current);


            /*DRAW ON MAP*/
            if (GLOBALS.engine.running) {
                GLOBALS.map.setSpeedFactor(current.speed, current.acc);
                GLOBALS.engine.setSpeedFactor(current.speed, current.acc);
            } else {

            }
        }
    };
    /*IMPLEMENTED - slow play pause fast*/
    var checkSpeed = function() {
        if (self.speed < MIN_SPEED) self.speed = MIN_SPEED;
        if (self.speed > MAX_SPEED) self.speed = MAX_SPEED;
    };
    self.getCommand = function(cmd) {
        if (cmd == 'slow') {
            return function() {
                self.speed--;
                checkSpeed();
            };
        }
        if (cmd == 'fast') {
            return function() {
                self.speed++;
                checkSpeed();
            };
        }
        if (cmd == 'play') {
            return function() {
                self.start();
            };
        }
        if (cmd == 'pause') {
            return function() {
                self.stop();
            };
        }
    };
    return self;
};

var GLOBALS = {};
init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    GLOBALS.usm.start(false)
        .login({ //redirect the user to this same page
            method: 'facebook'
        }, function success(user) {
            console.info("You are signed in to Facebook");
            console.info(user);
            $('#profilepic').css('background-image', 'url(' + user.picture + ')');
            

        }, function failure(err) {
            console.info(err);
        });
    GLOBALS.map = new FuzzyMap();
    GLOBALS.dragger = new Dragger();
    GLOBALS.engine = new Engine();
    GLOBALS.controls = new Binder();
    GLOBALS.controls.enableControls();
    GLOBALS.controls.bindVCR();
    GLOBALS.dropper = new Dropper(Dropzone);
    GLOBALS.current = function() {
        return GLOBALS.engine.data[GLOBALS.engine.index];
    };
    if (pre_load !== '') {
        console.info('Load ' + pre_load);
        $.get("/fuzzy/load/" + pre_load, function(data) {
            GLOBALS.controls.hideControls();
            GLOBALS.engine.running = false;
            GLOBALS.dragger.init();
            GLOBALS.engine.init(data);
            GLOBALS.pb.set(100);
        });
    }



    /*
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
        var out = new cc($('#console')).start();

    */


};
