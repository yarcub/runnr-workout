var expect = require('chai').expect;
var Effort = require('../index').Effort;

describe('Effort', function(){
  var params = {value: 5, units:'minkm', distance: 10000, sample_period: 1000};


  var pacemaker = new Effort.fromPace(params.value,
                                      params.units,
                                      params.distance,
                                      params.sample_period);
  var fifty_minutes = 50*60;
  var one_hour = 3600;

  describe('atTime', function(){
    it('should have 0m at 0 minutes', function(){
      expect(pacemaker.atTime(0).distance).to.equal(0);
    });

    it('should have 10000m at 50 minutes', function(){
      expect(pacemaker.atTime(fifty_minutes).distance).to.equal(10000);
    });

    it('should have 10000m at 1 hour (already finished)', function(){
      expect(pacemaker.atTime(one_hour).distance).to.equal(10000);
    });
  });

  describe('atDistance', function(){
    it('should have 50 minutes at 10000m', function(){
      expect(pacemaker.atDistance(10000).time).to.equal(fifty_minutes);
    });
  });

});