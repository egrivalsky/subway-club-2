require('dotenv').config();
const express = require('express');
const router = express.Router();

// isLoggedIn middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');


// ADD LINES TO STATIONS

router.get('/', (req, res) => {
    res.render('playground');
})
router.post('/', (req, res) => {

db.station.findOrCreate({
    where: { id: req.body.station}
  }).then(function([station, created]) {
    // Second, get a reference to a line.
    db.line.findOrCreate({
      where: {name: req.body.line}
    }).then(function([line, created]) {
      // Finally, use the "addModel" method to attach one model to another model.
      station.addLine(line).then(function(relationInfo) {
        console.log(line.name, "added to", station.id);
        res.redirect('/playground');
      });
    });
  });
})

  module.exports = router;
