const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/:id', (req, res) => {
  try{
    const thisStation = req.params.id;
    res.redirect(`../show/${thisStation}`);
  } catch(e) {
    console.log("WE HIT THE CATCH. ERROR BELOW:")
    console.log(e.message);
    res.redirect("/somethingbroke")
  }
});


router.get('/', async(req, res) => {
  console.log("at router get stations");
    try {
      const allStations = await db.station.findAll({
        include: [
            { model: db.line }
        ],
        order: [['name', 'asc']]
    });
      res.render('stations', { allStations });
    } catch(e) {
      console.log('* * * * * get stations * * * * * ');
      console.log(e);
      console.log(e.message);
    }
});

module.exports = router;