require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;
const app = express();

// isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

// // First, get a reference to a pet.
// db.station.findOrCreate({
//     where: {
//       id: 9
//     }
//   }).then(function([station, created]) {
//     // Second, get a reference to a toy.
//     db.line.findOrCreate({
//       where: {name: "R"}
//     }).then(function([line, created]) {
//       // Finally, use the "addModel" method to attach one model to another model.
//       station.addLine(line).then(function(relationInfo) {
//         console.log(line.name, "added to", station.id);
//       });
//     });
//   });