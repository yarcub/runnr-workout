var geoutil = require('geolib');

var Route = function(data){
  var route = {};
  var points = withDistance(data);

  route.geoAt = function(dist) {
    if(dist <= 0){
      return points[0];
    }

    for(var i=0; i<points.length; i++){
      if(points[i].distance >= dist){
        return points[i];
      }
    }

    return points[points.length-1];
  };

  route.distance = function(){
    return points[points.length-1].distance;
  };

  route.start = function(){
    return points[0];
  };

  route.end = function(){
    return points[points.length-1];
  };

  return route;
};

var withDistance = function(geo){
  var cumulative = 0,
      from = geo[0];

  geo.forEach(function(to){
    cumulative += geoutil.getDistance(from, to);
    to.distance = cumulative;
    from = to;
  });

  return geo;
};

var fromGeoJSON = function(geojson){
  var geoPoints = [];
  var geoCoordinates = geojson.features[0].geometry.coordinates;

  geoCoordinates.forEach(function(entry){
    var geoEntry = {lat: entry[1], lng: entry[0]};
    geoPoints.push(geoEntry);
  });

  return new Route(geoPoints);
};

module.exports = Route;
module.exports.fromGeoJSON = fromGeoJSON;