require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require('multer');
const uploads = multer({ dest: './uploads'});
const router = express.Router();

// isLoggedIn middleware
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');
    
    //go to the comments page
    router.get('/:id', isLoggedIn, async(req, res) => {
        try {
        const thisStation = await db.station.findByPk(req.params.id)
          res.render('post', { thisStation });
        } catch(e) {
          console.log(e)
        }
        });
    //Woke up this morning 2/19 to find this next app.post route. copy/pasted it from
    //old github browser tab
     //leave a comment
    router.post('/', uploads.single('inputFile'), (req, res) => {
      const image = req.file.path;
      const data = req.body;
      const thisUser = req.user.get();
      console.log(data);
      console.log(thisUser);
    
      cloudinary.uploader.upload(image, (result) => {
        console.log(result); // object
        photo = result.url; // string
        const newPost = db.post.create({
            userId: thisUser.id,
            stationId: data.station,
            user_photo: photo,
            title: data.title,
            rating: data.rating,
            comment: data.comment,
          })
          .then(newPost => { //this is the first time I realized I needed this on my own
            res.redirect(`/newPost/${newPost.id}`) 
          });
          });
    });
    
    router.delete('/:id', async(req, res) => {
      console.log("hello");
      try {
        await db.post.destroy({
          where: { id: req.params.id }
        })
        res.redirect('/profile')
      } catch(e) {
        console.log(e.message);
      }
    });

    module.exports = router;