[![Build Status](https://travis-ci.org/yarcub/runnr-workout.svg?branch=master)](https://travis-ci.org/yarcub/runnr-workout) [![Coverage Status](https://img.shields.io/coveralls/yarcub/runnr-workout.svg)](https://coveralls.io/r/yarcub/runnr-workout) [![Dependencies Status](https://david-dm.org/yarcub/runnr-workout.png)](https://david-dm.org/yarcub/runnr-workout) [![Dev Dependencies Status](https://david-dm.org/yarcub/runnr-workout/dev-status.svg)](https://david-dm.org/yarcub/runnr-workout#info=devDependencies)


Javascript models for _running_ workouts (Route, Efforts and Races).
It can be used on browser via browserify.

#### Routes
Built from list of latitude and longitude points

```
var src = geojson.features[0].geometry.coordinates;
var route = Route.fromGeoJSON(geojson);
```

#### Effort
Built from a list of timestamp latitude and longitude points or by pace and distance

```
var pacemakerEffort = Effort.fromPace(5, 'minkm', route.distance(), 1);
var gpsEffort = Effort.fromGPS(gpsData, "dummy");
```

#### Race
Aggregate a route with efforts

```
var race = new Race(route);
race.addEffort(pacemakerEffort);
race.addEffort(gpsEffort);
```


For more examples on the available API, see the test specs.
