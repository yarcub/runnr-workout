var reader = require('jsonfile');
var gpxParse = require("gpx-parse");
var expect = require('chai').expect;
var Race = require('../index').Race;
var Route = require('../index').Route;
var Effort = require('../index').Effort;

describe('Race', function(){

  var race, route;

  before(function(done){
    var geojson = reader.readFileSync('test/resource/dummy-course.geojson');
    var src = geojson.features[0].geometry.coordinates;
    route = Route.fromGeoJSON(geojson);
    race = new Race(route);

    var pacemaker = Effort.fromPace(5, 'minkm', route.distance(), 1);
    race.addEffort(pacemaker);

    gpxParse.parseGpxFromFile("test/resource/dummy-effort.gpx", function(error, data) {
      var segments = data.tracks[0].segments[0];
      var gpsData = [];
      segments.forEach(function(entry){
        gpsData.push({timestamp: entry.time, lat: entry.lat, lng: entry.lon});
      });

      var dummy = Effort.fromGPS(gpsData, "dummy");
      race.addEffort(dummy);
      done();
    });
  });

  describe('effortCount',function(){
    it('should have 2 efforts', function(){
      expect(race.effortCount()).to.equal(2);
    });
  });

  describe('duration', function(){
    it('should be the bounded by the longer effort duration (6303 sec.)', function(){
      expect(race.duration()).to.equal(6303);
    });
  });

  describe('distance', function(){
    it('should be the same as route', function(){
      expect(race.distance()).to.equal(route.distance());
    });
  });

});