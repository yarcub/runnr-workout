var geoutil = require('geolib');

/**
* Each point has time (seconds), distance (m)
*/
var Effort = function(data, name){
  var effort = {};
  var points = data;
  var effort_name = name;

  effort.name = function(){
    return effort.effort_name;
  };

  effort.start = function(){
    return points[0];
  };

  effort.end = function(){
    return points[points.length - 1];
  };

  effort.atTime = function(time){
    if(time < effort.start().time){
      return effort.start();
    }

    for(var i = 0; i<points.length; i++){
      if(points[i].time >= time){
        return points[i];
      }
    }

    return effort.end();
  };

  effort.atDistance = function(distance){
    if(distance < effort.start().distance){
      return effort.start();
    }

    for(var i = 0; i<points.length; i++){
      if(points[i].distance >= distance){
        return points[i];
      }
    }

    return effort.end();
  };

  effort.distanceTo = function(to, time){
    return Math.abs(_distanceTo(effort, to, time));
  };

  effort.timeTo = function(to, distance){
    return Math.abs(_timeTo(effort, to, distance));
  };

  effort.aheadOf = function(other, time){
    return _distanceTo(effort, other, time) < 0;
  };

  effort.pace = function(unitKey){
    var factor = units[unitKey] || units.minkm;
    /* seconds/meter*/
    var pace = effort.end().time/effort.end().distance;
    
    return Math.round((pace/factor) * 100) / 100;
  };

  /*pace in the last 10 seconds*/
  effort.paceAt = function(time, unitKey, interval){
    var factor = units[unitKey] || units.minkm;
    var pace_interval = interval || 10;
    if(time <= effort.start().time || time > effort.end().time){
      return 0;
    }

    var a = effort.atTime(time).distance;
    var b = effort.atTime(time - pace_interval).distance;
    var pace = pace_interval/(a - b);

    return Math.round((pace/factor) * 100) / 100;
  };

  return effort;
};

var _distanceTo = function(from, to, time){
  var fromDist = from.atTime(time);
  var toDist = to.atTime(time);

  return toDist.distance - fromDist.distance;
};

var _timeTo = function(from, to, distance){
  var fromDist = from.atDistance(distance);
  var toDist = to.atDistance(distance);

  return toDist.time - fromDist.time;
};

var normalizePace = function(pace, unitKey){
  var factor = units[unitKey] || units.minkm;

  // pace in seconds per meter
  return pace * factor;
};

var units = {minkm: 60/1000};

var fromPace = function(pace, units, distance, timeStep){
  var npace = normalizePace(pace, units),
      distStep = timeStep/npace,
      data = [],
      cDist = 0, cTime=0;

  data.push({time: cTime, distance: cDist});
  while(cDist < distance){
    cDist += distStep;
    cTime += timeStep;
    data.push({time: cTime, distance: Math.round(cDist)});
  }

  return new Effort(data, "pacemaker_" + pace + units);
};

var fromGPS = function(gpsData, name){
  var startTime = gpsData[0].timestamp,
      cDist = 0,
      from = gpsData[0];

  gpsData.forEach(function(to){
    cDist += geoutil.getDistance(from, to);
    to.distance = cDist;
    to.time = Math.abs(new Date(to.timestamp) - startTime)/1000; //in seconds
    from = to;
  });

  return new Effort(gpsData, name);
};

module.exports = Effort;
module.exports.fromPace = fromPace;
module.exports.fromGPS = fromGPS;