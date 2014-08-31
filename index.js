var geoutil = require('geolib');

var Route = function(data){
  var route = {};
  var geoPoints = data;
  var distPoints = toDistancePoints(data);

  route.geoAt = function(dist) {

    for(var i = 0; i<distPoints.length; i++){
      if(distPoints[i] >= dist){
        return geoPoints[i];
      }
    }

    return geoPoints[distPoints.length-1];
  };

  route.distance = function(){
    return distPoints[distPoints.length-1];
  };

  route.start = function(){
    return route.geoAt(distPoints[0]);
  };

  route.end = function(){
    return route.geoAt(distPoints[distPoints.length-1]);
  };

  return route;
};

var toDistancePoints = function(geo){
  var points = [],
    cumulative = 0,
    from = geo[0];

  geo.forEach(function(entry){
    var to = {latitude: entry.lat, longitude: entry.lng};
    
    cumulative += geoutil.getDistance(from, to);
    points.push(Math.round(cumulative));
    from = entry;
  });

  return points;
};

var routeFromGeoJSON = function(geojson){
  var geoPoints = [];
  var geoCoordinates = geojson.features[0].geometry.coordinates;

  geoCoordinates.forEach(function(entry){
    var geoEntry = {lat: entry[1], lng: entry[0]};
    geoPoints.push(geoEntry);
  });

  return new Route(geoPoints);
};

module.exports.Route = Route;
module.exports.routeFromGeoJSON = routeFromGeoJSON;