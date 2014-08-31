var reader = require('jsonfile');
var expect = require('chai').expect;
var Route = require('../index').Route;

describe('Route', function(){

	var geojson = reader.readFileSync('test/resource/dummy-course.geojson');
  var src = geojson.features[0].geometry.coordinates;
	var route = Route.fromGeoJSON(geojson);

  var first = {lat: src[0][1], lng: src[0][0], distance: 0};
  var last = {lat: src[src.length - 1][1], lng: src[src.length - 1][0], distance: 21009};


  describe('distance', function(){
    it('should return the route distance in meters', function(){
      expect(route.distance()).to.equal(21009);
    });  
  });
	
  describe('start', function(){
    it('should return the route first geo point', function(){
      expect(route.start()).to.deep.equal(first);
    });
  });

  describe('end', function(){
    it('should return the last geo point', function(){
      expect(route.end()).to.deep.equal(last);
    });
  });

  describe('geoAt', function(){
    it('should return the last geo point for distance after the route end', function(){
      expect(route.geoAt(30000)).to.deep.equal(last);
    });

    it('should return the first geo point for a distance before the route start (negative)', function(){
      expect(route.geoAt(-20)).to.deep.equal(first);
    });

    it('should return the geo point xx for the point at 10km from the start', function(){
      expect(route.geoAt(10000)).to.deep.equal({lat:39.350705, lng:-8.54197, distance:10008});
    });
  });
});