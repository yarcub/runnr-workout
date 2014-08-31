
/**
* Each point has time (seconds), distance (m)
*/
var Effort = function(data, name){
  var effort = {};
  var points = data;
  var name = name;

  effort.atTime = function(time){
    if(time < points[0].time){
      return points[0];
    }

    for(var i = 0; i<points.length; i++){
      if(points[i].time >= time){
        return points[i];
      }
    }

    return points[points.length - 1];
  }

  effort.atDistance = function(distance){
    if(distance < points[0].distance){
      return points[0];
    }

    for(var i = 0; i<points.length; i++){
      if(points[i].distance >= distance){
        return points[i];
      }
    }

    return points[points.length - 1]
  }

  return effort;
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