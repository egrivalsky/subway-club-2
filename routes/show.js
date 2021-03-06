require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require('multer');
const uploads = multer({ dest: './uploads'});
const router = express.Router();


// isLoggedIn middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');

router.get('/:id', isLoggedIn, async(req, res) => {
    console.log("made it to routes/show");
    try {
    const thisStation = await db.station.findByPk(req.params.id);
    //checks if station has any posts. If so it sends them up.
    const existAlready = await db.post.count({ where: {stationId: thisStation.id} });
    if (existAlready > 0) {
        const thesePosts = await db.post.findAll({
          where: { stationId: thisStation.id },
          order: [['createdAt', 'desc']]
          });
          res.render('show', { thisStation, thesePosts });
  
    } else { 
      console.log(thisStation.get());
      res.render('post', { thisStation } );
      }
    } catch(e) {
      console.log("WE HIT THE CATCH. ERROR BELOW:")
      console.log(e.message);
      res.redirect("/somethingbroke")
    }
    });

    module.exports = router;