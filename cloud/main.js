// require 'mongo';

var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

  var dbUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});



Parse.Cloud.define('findUsers', function(req, res) {
	// var usersCur = db.inventory.find();
	var respStr = "";
	// while(usersCur.hasNext()) {
	// 	respStr += usersCur.next();
	// }

	MongoClient.connect(dbUri, function(err, db) {
	  if(err) {
	    console.log("failed to connect to the database");
	  } else {
	    console.log("connected to database");
	  }
	  var collection = db.collection('_User');
	  var usersCur = collection.find({});
	  // .toArray(function(err, docs) {
	  //       if (err) {
	  //         return console.error(err)
	  //       }
	  //       docs.forEach(function(doc) {
	  //       	respStr += doc;
	  //     });
	  //   });

	  	while(usersCur.hasNext()) {
			respStr += usersCur.next();
		}

	  res.success(respStr);
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
