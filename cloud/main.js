// require 'mongo';

var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

  var dbUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI  || 'mongodb://localhost:27017/dev';

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});



Parse.Cloud.define('getDrivers', function(req, res) {
	  var query = new Parse.Query("Driver");
	  var myLocation = req.params;
	  console.log(myLocation);
	  // query.equalTo("objectId", "CBN6n9Paw5");
	  query.find({
	    success: function(results) {
	      res.success(results);
	    },
	    error: function(err) {
	    	console.log(err);
	      res.error("Driver lookup failed");
	    }
	  });
	
});


Parse.Cloud.define('getDriversNearMe', function(req, res) {
	// Parse.Cloud.define("averageStars", function(request, response) {
	var myLocation = req.params.location;

	  var query = new Parse.Query("Driver");
	  // query.equalTo("objectId", "CBN6n9Paw5");
	  query.find({
	    success: function(results) {
	      res.success(results);
	    },
	    error: function(err) {
	    	console.log(err);
	      res.error("Driver lookup failed");
	    }
	  });
	
});


getBoundingBox = function (centerPoint, distance) {
  var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
  if (distance < 0) {
    return 'Illegal arguments';
  }
  // helper functions (degrees<–>radians)
  Number.prototype.degToRad = function () {
    return this * (Math.PI / 180);
  };
  Number.prototype.radToDeg = function () {
    return (180 * this) / Math.PI;
  };
  // coordinate limits
  MIN_LAT = (-90).degToRad();
  MAX_LAT = (90).degToRad();
  MIN_LON = (-180).degToRad();
  MAX_LON = (180).degToRad();
  // Earth's radius (km)
  R = 6378.1;
  // angular distance in radians on a great circle
  radDist = distance / R;
  // center point coordinates (deg)
  degLat = centerPoint[0];
  degLon = centerPoint[1];
  // center point coordinates (rad)
  radLat = degLat.degToRad();
  radLon = degLon.degToRad();
  // minimum and maximum latitudes for given distance
  minLat = radLat - radDist;
  maxLat = radLat + radDist;
  // minimum and maximum longitudes for given distance
  minLon = void 0;
  maxLon = void 0;
  // define deltaLon to help determine min and max longitudes
  deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI;
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI;
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  return [
    minLon.radToDeg(),
    minLat.radToDeg(),
    maxLon.radToDeg(),
    maxLat.radToDeg()
  ];
};
