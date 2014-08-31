
/**
* Each point has time (seconds), distance (m)
*/
var Effort = function(data, name){
  this.points = data;
  this.name = name;
}

var normalizePace = function(pace, units){
  var factor = units['units'] || units.minkm;

  // pace in seconds per meter
  return pace * factor;
}

var units = {minkm: 60/1000};

var fromPace = function(pace, units, distance, timeStep){
  var npace = normalizePace(pace, units),
      distStep = timeStep/npace,
      data = [],
      cDist = 0, cTime=0;

  data.push({time: cTime, dist: cDist});
  while(cDist < distance){
    cDist += distStep;
    cTime += timeStep;
    data.push({time: cTime, dist: cDist});
  }

  return new Effort(data, "pacemaker_" + pace + units);
}

module.exports = Effort;
module.exports.fromPace = fromPace;