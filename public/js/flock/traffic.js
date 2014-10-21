module.exports = Traffic;
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var sqrt = Math.sqrt
  , POSITIONX = 0
  , POSITIONY = 1
  , SPEEDX = 2
  , SPEEDY = 3
  , ACCELERATIONX = 4
  , ACCELERATIONY = 5;

function Traffic(opts, callback) {
    if (!(this instanceof Traffic)) return new Traffic(opts, callback);
    EventEmitter.call(this);

    opts = opts || {};
    callback = callback || function() {};

    this.speedLimitRoot = opts.speedLimit || 0;
    this.accelerationLimitRoot = opts.accelerationLimit || 1;
    this.speedLimit = Math.pow(this.speedLimitRoot, 2);
    this.accelerationLimit = Math.pow(this.accelerationLimitRoot, 2);
    this.separationDistance = Math.pow(opts.separationDistance || 60, 2);
    this.alignmentDistance = Math.pow(opts.alignmentDistance || 180, 2);
    this.cohesionDistance = Math.pow(opts.cohesionDistance || 180, 2);
    this.separationForce = opts.separationForce || 0.15;
    this.cohesionForce = opts.cohesionForce || 0.1;
    this.alignmentForce = opts.alignmentForce || opts.alignment || 0.25;
    this.attractors = opts.attractors || [];

    var traffic = this.traffic = [];
    for (var i = 0, l = opts.traffic === undefined ? 50 : opts.traffic; i < l; i += 1) {
        traffic[i] = [
            Math.random() * 25, Math.random() * 25 // position
            , 0, 0 // speed
            , 0, 0 // acceleration
        ];
    }

    this.on('tick', function() {
        callback(traffic);
    });
}

inherits(Traffic, EventEmitter);


Traffic.prototype.tick = function() {
    var traffic = this.traffic,
        sepDist = this.separationDistance,
        sepForce = this.separationForce,
        cohDist = this.cohesionDistance,
        cohForce = this.cohesionForce,
        aliDist = this.alignmentDistance,
        aliForce = this.alignmentForce,
        speedLimit = this.speedLimit,
        accelerationLimit = this.accelerationLimit,
        accelerationLimitRoot = this.accelerationLimitRoot,
        speedLimitRoot = this.speedLimitRoot,
        size = traffic.length,
        current = size,
        sforceX, sforceY, cforceX, cforceY, aforceX, aforceY, spareX, spareY, attractors = this.attractors,
        attractorCount = attractors.length,
        distSquared, currPos, targPos, length, target;

    while (current--) {
        sforceX = 0;
        sforceY = 0;
        cforceX = 0;
        cforceY = 0;
        aforceX = 0;
        aforceY = 0;
        currPos = traffic[current];

        // Attractors
        target = attractorCount
        while (target--) {
            attractor = attractors[target];
            spareX = currPos[0] - attractor[0];
            spareY = currPos[1] - attractor[1];
            distSquared = spareX * spareX + spareY * spareY;

            if (distSquared < attractor[2] * attractor[2]) {
                length = sqrt(spareX * spareX + spareY * spareY);
                traffic[current][SPEEDX] -= (attractor[3] * spareX / length) || 0;
                traffic[current][SPEEDY] -= (attractor[3] * spareY / length) || 0;
            }
        }

        target = size
        while (target--) {
            if (target === current) continue;
            spareX = currPos[0] - traffic[target][0];
            spareY = currPos[1] - traffic[target][1];
            distSquared = spareX * spareX + spareY * spareY;

            if (distSquared < sepDist) {
                sforceX += spareX;
                sforceY += spareY;
            } else {
                if (distSquared < cohDist) {
                    cforceX += spareX;
                    cforceY += spareY;
                }
                if (distSquared < aliDist) {
                    aforceX += traffic[target][SPEEDX];
                    aforceY += traffic[target][SPEEDY];
                }
            }
        }

        // Separation
        length = sqrt(sforceX * sforceX + sforceY * sforceY);
        traffic[current][ACCELERATIONX] += (sepForce * sforceX / length) || 0;
        traffic[current][ACCELERATIONY] += (sepForce * sforceY / length) || 0;
            // Cohesion
        length = sqrt(cforceX * cforceX + cforceY * cforceY);
        traffic[current][ACCELERATIONX] -= (cohForce * cforceX / length) || 0;
        traffic[current][ACCELERATIONY] -= (cohForce * cforceY / length) || 0;
            // Alignment
        length = sqrt(aforceX * aforceX + aforceY * aforceY);
        traffic[current][ACCELERATIONX] -= (aliForce * aforceX / length) || 0;
        traffic[current][ACCELERATIONY] -= (aliForce * aforceY / length) || 0;
    }
    current = size;

    // Apply speed/acceleration for
    // this tick
    while (current--) {
        if (accelerationLimit) {
            distSquared = traffic[current][ACCELERATIONX] * traffic[current][ACCELERATIONX] + traffic[current][ACCELERATIONY] * traffic[current][ACCELERATIONY];
            if (distSquared > accelerationLimit) {
                ratio = accelerationLimitRoot / sqrt(distSquared);
                traffic[current][ACCELERATIONX] *= ratio;
                traffic[current][ACCELERATIONY] *= ratio;
            }
        }

        traffic[current][SPEEDX] += traffic[current][ACCELERATIONX];
        traffic[current][SPEEDY] += traffic[current][ACCELERATIONY];

        if (speedLimit) {
            distSquared = traffic[current][SPEEDX] * traffic[current][SPEEDX] + traffic[current][SPEEDY] * traffic[current][SPEEDY];
            if (distSquared > speedLimit) {
                ratio = speedLimitRoot / sqrt(distSquared);
                traffic[current][SPEEDX] *= ratio;
                traffic[current][SPEEDY] *= ratio;
            }
        }

        traffic[current][POSITIONX] += traffic[current][SPEEDX];
        traffic[current][POSITIONY] += traffic[current][SPEEDY];
    }

    this.emit('tick', traffic);
}
