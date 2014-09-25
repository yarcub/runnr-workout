var Race = function(route, name){
  var race = {};
  var efforts = [];
  var _name = name;

  race.name = function(){
    return _name;
  }

  race.addEffort = function(effort){
    return efforts.push(effort);
  }

  race.effortCount = function(){
    return race.allEfforts().length;
  }

  race.allEfforts = function(){
    return efforts;
  }

  race.duration = function(){
    var time = 0;

    efforts.forEach(function(e){
      if(e.end().time > time){
        time = e.end().time;
      }
    });

    return time;
  }

  race.distance = function(){
    return race.route().distance();
  }

  race.route = function(){
    return route;
  }

  /*ASC, we want the efforts with less time first*/
  race.orderAtDistance = function(distance){
    return efforts.sort(function(a,b){
      return a.atDistance(distance).time - b.atDistance(distance).time;
    });
  }

  /*DESC, we want the efforts with more distance first*/
  race.orderAtTime = function(time){
    return efforts.sort(function(a,b){
      return b.atTime(time).distance - a.atTime(time).distance;
    });
  }

  race.toJson = function(){
    return {
        data: allEfforts(),
        name: race.name()
    };
  };

  return race;
}

module.exports = Race;