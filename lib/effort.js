
/**
* Each point has time (seconds), distance (m)
*/
var Effort = function(data, name){
  var effort = {};
  var points = data;
  var name = name;

  effort.start = function(){
    return points[0];
  }

  effort.end = function(){
    return points[points.length - 1];
  }

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
  }

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
  }

  effort.distanceTo = function(to, time){
    return Math.abs(_distanceTo(effort, to, time));
  }

  effort.timeTo = function(to, distance){
    return Math.abs(_timeTo(effort, to, distance));
  }

  effort.aheadOf = function(other, time){
    return _distanceTo(effort, other, time) < 0;
  }

  return effort;
}

var _distanceTo = function(from, to, time){
  var fromDist = from.atTime(time);
  var toDist = to.atTime(time);

  return toDist.distance - fromDist.distance;
}

var _timeTo = function(from, to, distance){
  var fromDist = from.atDistance(distance);
  var toDist = to.atDistance(distance);

  return toDist.time - fromDist.time;
}

var normalizePace = function(pace, unitKey){
  var factor = units[unitKey] || units.minkm;

  // pace in seconds per meter
  return pace * factor;
}

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
}

module.exports = Effort;
module.exports.fromPace = fromPace;