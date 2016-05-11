var express = require('express'),
    router = express.Router(),
    fs      = require('fs'),
    Neighborhood = require('../models/neighborhoods.js');

    require.extensions['.txt'] = function (module, filename) {
        module.exports = fs.readFileSync(filename, 'utf8');
    };



    var manhattan = require('../text/manhattan.txt');
    var brooklyn = require('../text/brooklyn.txt');
    var bronx = require('../text/bronx.txt');
    var queens = require('../text/queens.txt');
    var statenIsland = require('../text/statenisland.txt');

    router.get('/', function(req, res){
      // console.log(manhattan.split('\n')[manhattan.split('\n').length - 1]);
      //
      // manhattan.split('\n').forEach(function(i){
      //   if(i !== ""){
      //     var newNeighborhood = new Neighborhood({
      //                                             title: i,
      //                                             borough: "Manhattan"
      //                                           });
      //     newNeighborhood.save(function(err, data){});
      //   }
      // });
      // console.log(brooklyn.split('\n').length);
      // brooklyn.split('\n').forEach(function(i){
      // if (i !== '') {
      //   var newNeighborhood = new Neighborhood({
      //                                             title: i,
      //                                             borough: "Brooklyn"
      //                                           });
      //     newNeighborhood.save(function(err, data){});
      // }
      // });
      // console.log(queens.split('\n').length);
      // queens.split('\n').forEach(function(i){
      //   if(i !== '')  {
      //     var newNeighborhood = new Neighborhood({
      //                                           title: i,
      //                                           borough: "Queens"
      //                                         });
      //     newNeighborhood.save(function(err, data){});
      //   }
      // });
      // console.log(bronx.split('\n').length);
      // bronx.split('\n').forEach(function(i){
      //   if(i !== ''){
      //     var newNeighborhood = new Neighborhood({
      //                                             title: i,
      //                                             borough: "Bronx"
      //                                           });
      //     newNeighborhood.save(function(err, data){});
      //   }
      // });
      // console.log(statenIsland.split('\n').length);
      // statenIsland.split('\n').forEach(function(i){
      //   if(i !== ''){
      //     var newNeighborhood = new Neighborhood({
      //                                             title: i,
      //                                             borough: "Staten Island"
      //                                           });
      //     newNeighborhood.save(function(err, data){});
      //
      //   }
      // });

      res.redirect('/');
    });



    module.exports = router;
