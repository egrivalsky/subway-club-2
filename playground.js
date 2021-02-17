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

// First, get a reference to a pet.
db.user.findOrCreate({
    where: {
      id: 1
    }
  }).then(function([user, created]) {
    // Second, get a reference to a toy.
    db.post.findOrCreate({
      where: {id: 2}
    }).then(function([post, created]) {
      // Finally, use the "addModel" method to attach one model to another model.
      user.addLine(post).then(function(relationInfo) {
        console.log(post.name, "added to", user.id);
      });
    });
  });