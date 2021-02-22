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
  console.log("at edit page")
    try {
      const thisUser = await db.user.findByPk(req.params.id);
      const stationInfo = await db.station.findAll({
        order: [['name', 'asc']]
      })
      res.render('edit', { thisUser, stationInfo });
    } catch(e) {
      console.log("WE HIT THE CATCH. ERROR BELOW:")
      console.log(e.message);
      res.redirect("/somethingbroke")
    }
  })
  


   module.exports = router;