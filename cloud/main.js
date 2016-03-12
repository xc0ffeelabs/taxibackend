// require 'mongo';

var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

  var dbUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI  || 'mongodb://localhost:27017/dev';

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});



// Parse.Cloud.define('getDrivers', function(req, res) {
// 	  var query = new Parse.Query("Driver");
// 	  var myLocation = req.params.location;
//     var currentLocation = myLocation ? [myLocation.latitude, myLocation.longitude] : null;
//     if (currentLocation) {
//       var box = getBoundingBox(currentLocation, 20);
//     }  else {
//       res.error("Driver lookup failed");
//     }
//     var minLong = box[0], minLat = box[1], maxLong = box[2], maxLat = box[3];
//     // query.lessThan('location.longitude', maxLong);
//     // query.greaterThan('location.longitude', minLong);
//     // query.lessThan('location.latitude', maxLat);
//     // query.greaterThan('location.latitude', minLat);
//     query.withinMiles("location", myLocation, 10);
// 	  query.find({
// 	    success: function(results) {
// 	      res.success(results);
// 	    },
// 	    error: function(err) {
// 	    	console.log(err);
// 	      res.error("Driver lookup failed");
// 	    }
// 	  });
	
// });

/**
Trip States:
'user-initiated-trip-request'
'user-canceled-trip-request'
'trip-request-sent-to-driver'
'driver-accepted-trip-request'
'driver-denied-trip-request'
'driver-on-wayto-pickup-customer'
'driver-reached-user'
'driver-pickedup-user'
'driver-on-wayto-destination'
'driver-reached-destination'
'driver-canceled-trip-request'
**/


// Parse.Cloud.define('initiateTrip', function(req, res) {
//   var userId = req.params.userId;
//   var driverId = req.params.driverId;
//   var promises = [];

//   var ProjectNumner = "956242433297".
//       key = "AIzaSyDS4GAwSpVgPOQpDiTwNxeSSpMotTP-9WQ";

//   var tripStates = {
//     0 : 'user-initiated-trip-request',
//     1 : 'user-canceled-trip-request',
//     2 : 'trip-request-sent-to-driver',
//     3 : 'driver-accepted-trip-request',
//     4 : 'driver-denied-trip-request',
//     5 : 'driver-on-wayto-pickup-customer',
//     6 : 'driver-reached-user',
//     7 : 'driver-pickedup-user',
//     8 : 'driver-on-wayto-destination',
//     9 : 'driver-reached-destination',
//     10: 'driver-canceled-trip-request'
//   };
//   var q1 = new Parse.Query("Driver");
//   var user, driver;
//   var promise1 = q1.get(userId, {
//     success: function (obj) {
//       console.log("user");
//       console.log(obj);
//       user = obj;
//       // promise1.resolve(obj);
//     },
//     error: function (obj, error) {
//       console.log("error user");
//       console.log(error);
//       // promise1.reject(error);
//     }
//   });
//   // promise1.then(function(val){console.log("value"); console.log(val);});

//   promises.push(promise1);

//   var q2 = new Parse.Query("Driver");
//   var promise2 = q2.get(driverId, {
//     success: function (obj) {
//       console.log("drive");
//       console.log(obj);
//       driver = obj;
//       // promise2.resolve(obj);
//     },
//     error: function (obj, error) {
//       console.log(error);
//       // promise2.reject(error);
//     }
//   });

//   promises.push(promise2);


//   var initiateTrip = function () {
//     //validate if driver and user not null
//       console.log(user);
//       console.log(driver);
//     if (user && driver) {
      
//       if (driver.get('state') == 'active') {
//         //ceate new trip object

//         var trip = new Parse.Object("Trip");
//         trip.add("user", user); 
//         trip.add("driver", driver);
//         trip.add("state", tripStates[0]);

//         trip.save().then(function (savedTrip) {
//           //trip saved
//           user.add("currentTripId", savedTrip.get("objectId"));
//           driver.add("currentTripId", savedTrip.get("objectId"));
//           user.save();
//           driver.save();
//           res.success(savedTrip);
//         }, function (error) {
//           res.error(error);
//         });
//       } else {
//         res.error("Requested driver not available. Please select another driver");
//       }
      
//     } else {
//       res.error("Error while initiating the request");
//     }
//   };

//   Parse.Promise.when(promises).then(initiateTrip);

  
// });

