var GLOBALS = {};
var ticker = require('ticker'),
    Boids = require('./traffic'),
    fps = require('fps'),
    world = require('./world');


init = function(_GLOBALS) {
    GLOBALS = _GLOBALS;
    GLOBALS.pb.set(0);
    console.info('Flock application started');

    var attractors = [
        [
            Infinity // x
            , Infinity // y
            , 150 // dist
            , 0.25 // spd
        ]
    ];
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    var boids = new Boids({
        boids: 100,
        speedLimit: 2,
        accelerationLimit: 0.5,
        attractors: attractors,
        cohesionForce : 0.1,
        alignmentForce :140.25
    });
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.appendChild(canvas)
    window.onresize = debounce(function() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }, 100);
    window.onresize();
    document.body.onmousemove = function(e) {
        var halfHeight = canvas.height / 2,
            halfWidth = canvas.width / 2;

        attractors[0][0] = e.x - halfWidth;
        attractors[0][1] = e.y - halfHeight;
    }

    var frames = fps({
        every: 10,
        decay: 0.04
    }).on('data', function(rate) {
        //console.info(rate);


    })

    ticker(window, 60).on('tick', function() {
        frames.tick();
        boids.tick();
    }).on('draw', function() {
        //console.info('draw');
        var boidData = boids.traffic,
            halfHeight = canvas.height / 2,
            halfWidth = canvas.width / 2

        ctx.fillStyle = 'rgba(255,241,235,0.25)' // '#FFF1EB'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00FF00'
        for (var i = 0, l = boidData.length, x, y; i < l; i += 1) {
            x = boidData[i][0];
            y = boidData[i][1]
                // wrap around the screen
            boidData[i][0] = x > halfWidth ? -halfWidth : -x > halfWidth ? halfWidth : x
            boidData[i][1] = y > halfHeight ? -halfHeight : -y > halfHeight ? halfHeight : y
            ctx.fillRect(x + halfWidth, y + halfHeight, 2, 2)
        }


    })


    GLOBALS.pb.set(100);
};


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
