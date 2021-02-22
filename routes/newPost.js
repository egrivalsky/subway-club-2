require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require('multer');
const uploads = multer({ dest: './uploads'});
const router = express.Router();

// isLoggedIn middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');

router.get('/:id', async(req, res) => {
    try{
      const newPost = await db.post.findByPk(req.params.id);
      const thisStation = await db.station.findByPk(newPost.stationId); // --??-- I can access newPost.station here
      console.log("newPost StationId: " + thisStation.get().id);
      console.log(newPost); 
      console.log(thisStation.get().name);
      res.render('newPost', {post: newPost.get(), station: thisStation.get() }); //***
    } catch(e) {
      console.log("WE HIT THE CATCH. ERROR BELOW:")
      console.log(e.message);
      res.redirect("/somethingbroke")
    }
  });

  module.exports = router;