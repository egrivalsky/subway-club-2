//require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;
//const app = express();

// isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');
const { format } = require('sequelize/types/lib/utils');

// ADD LINES TO STATIONS

// db.station.findOrCreate({
//     where: {
//       id: req.body.station
//     }
//   }).then(function([station, created]) {
//     // Second, get a reference to a line.
//     db.line.findOrCreate({
//       where: {name: req.body.line}
//     }).then(function([line, created]) {
//       // Finally, use the "addModel" method to attach one model to another model.
//       station.addLine(line).then(function(relationInfo) {
//         console.log(line.name, "added to", station.id);
//         res.redirect('/playground');
//       });
//     });
//   });

db.station.findOrCreate({
  where: {
    id: 0
  }
}).then(function([station, created]) {
  // Second, get a reference to a line.
  db.line.findOrCreate({
    where: {name: "Edit profile to update"}
  }).then(function([line, created]) {
    // Finally, use the "addModel" method to attach one model to another model.
    station.addLine(line).then(function(relationInfo) {
      console.log(line.name, "added to", station.name);
      res.redirect('/playground');
    });
  });
});


  