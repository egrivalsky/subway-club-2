require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require('multer');
const uploads = multer({ dest: './uploads'});
const router = express.Router();


// isLoggedIn middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');


router.get('/', isLoggedIn, async(req, res) => {
    console.log('we hit the profile get route');
    const user = req.user.get();
    console.log(user);
    try {
      const userPosts = await db.post.findAll({
      where: { userId: user.id },
      include: [db.station],
      order: [['createdAt', 'desc']]
      })
      const favStation = await db.station.findByPk(user.stationId);
      if (favStation) {
      res.render('profile', { user, userPosts, favStation });
      } else {
        res.render('profile', {user});
      }
    } catch(e) {
      console.log("we are hitting the catch. Here is our error: >>>>>>>>>>>")
      console.log(e.message)
    }

});

router.put('/:id', uploads.single('inputFile'), async(req, res) => {
    console.log("req.params.id: ");
    console.log(req.params.id);
    const image = req.file.path;
    const data = req.body;
    const thisUser = req.user.get();
    //uploads image and returns url
    try {
      await cloudinary.uploader.upload(image, (result) => {
        console.log(result);
        photo = result.url;
        });
      //updates user table, including new photo url
      const profile = await db.user.update({
      userName: data.userName, 
      avi: photo, 
      aboutMe: data.aboutMe, 
      stationId: data.stationId
    }, {
      where: { id: req.params.id },
      returning: true, //don't know what this does
      plain: true,  //or this -- stack overflow
    }) //shows new profile
      res.redirect('/profile')
    } catch(e) {
      console.log(e.message);
    } 
});

module.exports = router;