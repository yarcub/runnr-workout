var Race = function(route){
  var race = {};
  var efforts = [];


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
  
  return race;
}

module.exports = Race;