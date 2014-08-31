var expect = require('chai').expect;
var Effort = require('../index').Effort;

describe('Effort', function(){
  var params = {value: 5, units:'minkm', distance: 10000, sample_period: 1};


  var pacemaker = new Effort.fromPace(params.value,
                                      params.units,
                                      params.distance,
                                      params.sample_period);

  var pacemakerB = new Effort.fromPace(6,
                                      params.units,
                                      params.distance,
                                      params.sample_period);

  var ten_minutes = 10*60;
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

  describe('distanceTo', function(){
    it('should be 333 meters apart at 10 minutes', function(){
      var distanceToB = pacemaker.distanceTo(pacemakerB, ten_minutes);
      var distanceToA = pacemakerB.distanceTo(pacemaker, ten_minutes);

      expect(distanceToB).to.equal(333);
      expect(distanceToA).to.equal(333);
      expect(pacemaker.distanceTo(pacemaker, ten_minutes)).to.equal(0);
      expect(pacemakerB.distanceTo(pacemakerB, ten_minutes)).to.equal(0);
    })
  });

  describe('timeTo', function(){
    it('should be 36 seconds apart at 10 minutes', function(){
      var timeToB = pacemaker.timeTo(pacemakerB, ten_minutes);
      var timeToA = pacemakerB.timeTo(pacemaker, ten_minutes);

      expect(timeToB).to.equal(36);
      expect(timeToA).to.equal(36);
      expect(pacemaker.timeTo(pacemaker, ten_minutes)).to.equal(0);
      expect(pacemakerB.timeTo(pacemakerB, ten_minutes)).to.equal(0);
    })
  });

  describe('aheadOf', function(){
    it('should be ahead at 10 minutes', function(){
      expect(pacemaker.aheadOf(pacemakerB, ten_minutes)).to.be.true;
      expect(pacemakerB.aheadOf(pacemaker, ten_minutes)).to.be.false;
      expect(pacemaker.aheadOf(pacemaker, ten_minutes)).to.be.false;
      expect(pacemakerB.aheadOf(pacemakerB, ten_minutes)).to.be.false;
    });
  });

  describe('pace', function(){
    it('should have average pace min/km', function(){
      expect(pacemaker.pace('minkm')).to.equal(5);
      expect(pacemakerB.pace('minkm')).to.equal(6);
    });
  });

  describe('paceAt', function(){
    it('should have instant pace min/km with 10 sec delta',function(){
        expect(pacemaker.paceAt(ten_minutes)).to.equal(5.05);
        expect(pacemakerB.paceAt(ten_minutes)).to.equal(5.95);
    });

    it('should have zero instance pace on start and after finish', function(){
      expect(pacemaker.paceAt(0)).to.equal(0);
      expect(pacemaker.paceAt(one_hour)).to.equal(0);
    })
  });
})