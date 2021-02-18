  
require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;
const multer = require('multer');
const cloudinary = require('cloudinary');
const uploads = multer({ dest: './uploads'});
const app = express();

// isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionObject));

// Initialize passport and run through middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
// Using flash throughout app to send temp messages to user
app.use(flash());

// Messages that will be accessible to every view
app.use((req, res, next) => {
  // Before every route, we will attach a user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', async(req, res) => {
  console.log(res.locals.alerts);
  res.render('index', { alerts: res.locals.alerts });
    
});

app.get('/profile', isLoggedIn, async(req, res) => {
const { id, name, email } = req.user.get();
try {
  const userPosts = await db.post.findAll({
  where: {
    userId: id
  }
}, console.log("HERE IS  USERPOSTS: "))
console.log(userPosts)
  res.render('profile', { id, name, email, userPosts });
  console.log("here is our id, name, email, and userPosts")
  console.log(id);
  console.log(name);
  console.log(email);
  console.log(userPosts)
  console.log("WE ARE LOOKING AT THIS")
} catch(e) {
  console.log("we are hitting the catch. Here is our error: >>>>>>>>>>>")
  console.log(e.message)
}
});

 app.get('/test', async(req, res) => {
  const testData = await db.test.findAll();
  res.send(testData);
  console.log('test successful');
 })

//STATIONS
app.get('/show/:id', async(req, res) => {
  try {
  const thisStation = await db.station.findByPk(req.params.id)
    res.render('show.ejs', { thisStation });
  } catch(e) {
    console.log(e)
  }
  });

app.get('/stations/:id', (req, res) => {
      const thisStation = req.params.id;
      res.redirect(`/show/${thisStation}`);
    });


 app.get('/stations', async(req, res) => {
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

//COMMENTS
    //go to the comments page
  app.get('/post/:id', async(req, res) => {
    try {
    const thisStation = await db.station.findByPk(req.params.id)
      res.render('post.ejs', { thisStation });
    } catch(e) {
      console.log(e)
    }
    });

//leave a comment
app.post('/post', uploads.single('inputFile'), (req, res) => {
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

app.get('/newPost/:id', async(req, res) => {
  try{
    const newPost = await db.post.findByPk(req.params.id);
    const thisStation = await db.station.findByPk(newPost.stationId);
    console.log(newPost.get());
    console.log(thisStation.name);
    res.render('newPost', {post: newPost.get(), station: thisStation }); //***
  } catch(e) {
    console.log(e.message);
  }
})
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
  
  
});

module.exports = server;

// router.get('/profile', (req, res) => {
//   res.send("This is your user profile")
// })


// });
