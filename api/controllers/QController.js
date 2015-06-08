/**
 * QController
 *
 * @description :: Server-side logic for managing qs
 * @author		 :: Preston Stosur-Bassett (www.stosur.info)
 * @date 		 :: June 6, 2015
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

   removeByIndex: function(req, res) {
      var post = req.body;
      Q.findOne({ location: post.storeLocation }).exec(function(err, loc) {
         if(err || loc == undefined) {
            console.log("There was an error looking up the location: "+post.storeLocation);
            console.log("Error = "+err);
            res.serverError();
         }
         else {
            for(var i = 0; i < loc.line.length; i++) {
               if(loc.line[i].ticketNumber == post.ticketNumber) {
                  loc.line.splice(i, 1);
                  break;
               }
            }

            loc.save(function(err) {
               if(err) {
                  console.log("There was an error saving location after removing an element from the line.");
                  console.log("Error = "+err);
                  res.serverError();
               }
               else {
                  res.send({ success: true });
               }
            })
         }
      });
   },

   startRepair: function(req, res) {
      var post = req.body;
      Q.findOne({ location: post.storeLocation }).exec(function(err, loc) {
         if(err || loc == undefined) {
            console.log("There was an error looking up the location: "+post.storeLocation);
            console.log("Error = "+err);
            res.serverError();
         }
         else {
            for(var i = 0; i < loc.line.length; i++) {
               if(loc.line[i].ticketNumber == post.ticketNumber) {
                  loc.line[i].started = post.startedBy;
                  break;
               }
            }

            loc.save(function(err) {
               if(err) {
                  console.log("There was an error saving the location after assigning technician.");
                  console.log("Error = "+err);
                  res.serverError();
               }
               else {
                  res.send({ success: true });
               }
            });
         }
      });
   },

   update: function(req, res) {
      var post = req.body;
      Q.findOne({ location: post.storeLocation }).exec(function(err, loc) {
         if(err || loc == undefined) {
            console.log("There was an error when looking up the location provided.");
            res.serverError();
         }
         else {
            function insertionSort(arr) {
               var element;
               var j;
               var compVal;

               for(var i = 1; i < arr.length; i++) {
                  element = arr[i];
                  compVal = arr[i].promiseTime;
                  j = i;

                  while(j > 0 && arr[j-1].promiseTime > compVal) {
                     arr[j] = arr[j-1]
                     j--;
                  }

                  arr[j] = element;
               }

               return arr;
            }

            var updatedLine = insertionSort(loc.line);

            var rightNow = new Date();
            var thisYear = rightNow.getFullYear();
            var thisMonth = rightNow.getMonth();
            var thisDay = rightNow.getDate();
            var thisHour = rightNow.getHours();
            var thisMinute = rightNow.getMinutes();

            for(var i = 0; i < updatedLine.length; i++) {
               var promisedDetail = updatedLine[i].promiseTime.split(" ");
               var promisedDateDetail = promisedDetail[0].split("/");
               var promisedTimeDetail = promisedDetail[1].split(":");
               promisedTimeDetail[1] = parseInt(promisedTimeDetail[1], 10);
               promisedTimeDetail[1] = promisedTimeDetail[1] + updatedLine[i].repairLength;
               var promisedYear = parseInt(promisedDateDetail[0]);
               var promisedMonth = parseInt(promisedDateDetail[1]);
               var promisedDay = parseInt(promisedDateDetail[2]);
               var promisedHour = parseInt(promisedTimeDetail[0]);
               var promisedMinute = parseInt(promisedTimeDetail[1]);
               if(thisYear > promisedYear) {
                  updatedLine[i].urgent = true;
               }
               else if(thisMonth > promisedMonth) {
                  updatedLine[i].urgent = true;
               }
               else if(thisDay > promisedDay) {
                  updatedLine[i].urgent = true;
               }
               else if(thisDay == promisedDay) {
                  if(thisHour > promisedHour) {
                     updatedLine[i].urgent = true;
                  }
                  else if(thisHour == promisedHour) {
                     if(thisMinute > promisedMinute) {
                        updatedLine[i].urgent = true;
                     }
                     else {
                        break;
                     }
                  }
                  else {
                     break;
                  }
               }
               else {
                  break;
               }

            }

            loc.line = updatedLine;
            loc.save(function(err) {
               if(err) {
                  console.log("There was an error saving the updated line to the database.");
                  res.serverError();
               }
               else {
                  res.send({ success: true });
               }
            });
         }
      });
   },

   /*
    * Add an item to the line of the queue
   */
   add: function(req, res) {
      var post = req.body;
      Q.findOne({ location: post.storeLocation }).exec(function(err, locD) {
         if(err || locD == undefined) {
            console.log("There was an error looking up the location provided.");
            res.serverError();
         }
         else {
            var lineItem = {
               deviceMake: post.deviceMake,
               deviceModel: post.deviceModel,
               repairType: post.repairType,
               repairLength: parseInt(post.repairLength),
               ticketNumber: post.ticketNumber,
               promiseTime: post.promiseTime,
               urgent: false,
               started: ""
            };

            var newItemIndex = locD.line.length;
            locD.line[newItemIndex] = lineItem;

            function insertionSort(arr) {
               var element;
               var j;
               var compVal;

               for(var i = 1; i < arr.length; i++) {
                  element = arr[i];
                  compVal = arr[i].promiseTime;
                  j = i;

                  while(j > 0 && arr[j-1].promiseTime > compVal) {
                     arr[j] = arr[j-1]
                     j--;
                  }

                  arr[j] = element;
               }

               return arr;
            }

            var updatedLine = insertionSort(locD.line);

            var rightNow = new Date();
            var thisYear = rightNow.getFullYear();
            var thisMonth = rightNow.getMonth();
            var thisDay = rightNow.getDate();
            var thisHour = rightNow.getHours();
            var thisMinute = rightNow.getMinutes();

            for(var i = 0; i < updatedLine.length; i++) {
               var promisedDetail = updatedLine[i].promiseTime.split(" ");
               var promisedDateDetail = promisedDetail[0].split("/");
               var promisedTimeDetail = promisedDetail[1].split(":");
               promisedTimeDetail[1] = parseInt(promisedTimeDetail[1], 10);
               promisedTimeDetail[1] = promisedTimeDetail[1] + updatedLine[i].repairLength;
               var promisedYear = parseInt(promisedDateDetail[0]);
               var promisedMonth = parseInt(promisedDateDetail[1]);
               var promisedDay = parseInt(promisedDateDetail[2]);
               var promisedHour = parseInt(promisedTimeDetail[0]);
               var promisedMinute = parseInt(promisedTimeDetail[1]);

               if(thisYear > promisedYear) {
                  updatedLine[i].urgent = true;
               }
               else if(thisMonth > promisedMonth) {
                  updatedLine[i].urgent = true;
               }
               else if(thisDay > promisedDay) {
                  updatedLine[i].urgent = true;
               }
               else if(thisDay == promisedDay) {
                  if(thisHour > promisedHour) {
                     updatedLine[i].urgent = true;
                  }
                  else if(thisHour == promisedHour) {
                     if(thisMinute > promisedMinute) {
                        updatedLine[i].urgent = true;
                     }
                     else {
                        break;
                     }
                  }
                  else {
                     break;
                  }
               }
               else {
                  break;
               }

            }

            locD.line = updatedLine;

            locD.save(function(err) {
               if(err) {
                  console.log("There was an error saving the line item data.");
                  res.serverError();
               }
               else {
                  res.send({ success: true });
               }
            });
         }
      });
   },

   /*
    * Create a new database entry for a store location queue
   */
   create: function(req, res) {
      var storeLocation = req.body.storeLocation;
      if(storeLocation == "" || storeLocation == " " || storeLocation == undefined) {
         res.serverError();
         console.log("There was an error with the chosen store Location.");
      }
      else {
         Q.create({ location: storeLocation, line: [] }).exec(function(err, location) {
            if(err || location == undefined) {
               console.log("There was an error using the superuser function.");
               res.serverError();
            }
            else {
               console.log("Successfully created the store location using superuser function.");
               res.send({ success: true });
            }
         });
      }
   }

};
