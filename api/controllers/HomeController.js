/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @author		 :: Preston Stosur-Bassett (www.stosur.info)
 * @date 		 :: June 6, 2015
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /*
   * This function handles the page view request for `/settings`, which is the settings page that allows you to clear defaults
   */
  minorSettings: function(req, res) {
    res.view('home/settings');
  },

  /*
   * This function handles the page view request for `/about`, which is the about page
   */
  about: function(req, res) {
    res.view();
  },

  /*
   * This function handles the page view request for `/add`, `/`, `/add/device`, which is the add ticket page, and the home page
   */
  index: function(req, res) {
    Q.find().exec(function(err, qs) {
      if (err || qs == undefined) {
        console.log("There was an issue looking up the Q's.");
        res.serverError();
      } else {
        res.view({
          locations: qs
        });
      }
    });
  },

  /*
   * This function handles the page view request for '/add/alert', which is the add alert page
   */
  addAlert: function(req, res) {
    Q.find().exec(function(err, qs) {
      if (err || qs == undefined) {
        console.log("There was an issue looking up the Q's.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        res.view('home/addAlert', {
          locations: qs
        });
      }
    })
  },

  /*
   * This function handles the page view request for `/q`, which is the view line/view Queue page
   */
  line: function(req, res) {
    //Pass in some values here from the Q model
    Q.find().exec(function(err, locs) {
      if (err || locs == undefined) {
        console.log("There was an issue looking up the locations.");
        res.serverError();
      } else {
        for (var c = 0; c < locs.length; c++) {
          var loc = locs[c];

          if (loc.alerts == undefined) {
            loc.alerts = [];
          }

          function insertionSort(arr) {
            var element;
            var j;
            var compVal;

            for (var i = 1; i < arr.length; i++) {
              element = arr[i];
              compVal = arr[i].promiseTime;
              j = i;

              while (j > 0 && arr[j - 1].promiseTime > compVal) {
                arr[j] = arr[j - 1]
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

          for (var i = 0; i < updatedLine.length; i++) {
            var promisedDetail = updatedLine[i].promiseTime.split(" ");
            var promisedDateDetail = promisedDetail[0].split("/");
            var promisedTimeDetail = promisedDetail[1].split(":");
            promisedTimeDetail[0] = parseInt(promisedTimeDetail[0], 10);
            promisedTimeDetail[0] = promisedTimeDetail[0] - updatedLine[i].repairLength;
            var promisedYear = parseInt(promisedDateDetail[0]);
            var promisedMonth = parseInt(promisedDateDetail[1]);
            var promisedDay = parseInt(promisedDateDetail[2]);
            var promisedHour = parseInt(promisedTimeDetail[0]);
            var promisedMinute = parseInt(promisedTimeDetail[1]);

            if (thisYear > promisedYear) {
              updatedLine[i].urgent = true;
            } else if (thisMonth > promisedMonth) {
              updatedLine[i].urgent = true;
            } else if (thisDay > promisedDay) {
              updatedLine[i].urgent = true;
            } else if (thisDay == promisedDay) {
              if (thisHour >= promisedHour) {
                updatedLine[i].urgent = true;
              } else {
                break;
              }
            } else {
              break;
            }

          }

          loc.line = updatedLine;

          loc.save(function(err) {
            if (err) {
              console.log("There was an error saving the updated line to the database.");
              res.serverError();
            }
          });
        }
        console.log(locs);
        res.view({
          locations: locs
        });
      }
    });
  },

  /**
   * This function handles the page request for '/analyze', which is the page to dispay anaylsis of repairs completed
   */
  analyze: function(req, res) {
    res.view();
  },

  /*
   * This functions handles the page view request for `/updates`, which is the page to display the upcoming scheduled updates to the system
   */
  updates: function(req, res) {
    res.view();
  },


  closes: function(req, res) {
    Q.find().exec(function(err, locs) {
      if (err || locs == undefined) {
        console.log("There was an error looking up the locations in the database.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        for (var c = 0; c < locs.length; c++) {
          var loc = locs[c];

          if (loc.closeRates == undefined) {
            loc.closeRates = [];

            loc.save(function(err) {
              if (err) {
                console.log("There was an error saving the location " + loc.location + ", after trying to initialize the close rates.");
                console.log("Error = " + err);
                res.serverError();
              }
            })
          }
        }

        res.view('home/close_rates', {
          locations: locs
        });
      }
    });
  },

  login: function(req, res) {
    res.view('home/login');
  },

  signup: function(req, res) {
    //Pass in some values here from the Q model
    Q.find().exec(function(err, locs) {
      if (err || locs == undefined) {
        console.log("There was an issue looking up the locations.");
        res.serverError();
      } else {
        for (var c = 0; c < locs.length; c++) {
          var loc = locs[c];

        }
        console.log(locs);
        res.view({
          locations: locs
        });
      }
    });
  },

  dashboard: function(req, res) {
    res.view('home/dashboard');
  },

  landing: function(req, res) {
    res.view('home/landing');
  }

};