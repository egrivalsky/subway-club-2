  
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
const methodOverride = require('method-override');

// isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

app.use(methodOverride('_method'));
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

//PROFILE
app.get('/profile', isLoggedIn, async(req, res) => {
    const { id, name, email, userName, avi, aboutMe, stationId, createdAt} = req.user.get();
    try {
      const userPosts = await db.post.findAll({
      where: { userId: id },
      include: [db.station],
      order: [['createdAt', 'desc']]
      })
      console.log("HERE IS  USERPOSTS: ")
      console.log(userPosts)
      console.log("here is our id, name, email, stationIdand userPosts");
      res.render('profile', { createdAt, id, name, email, userPosts, userName, avi, stationId, aboutMe });
    } catch(e) {
      console.log("we are hitting the catch. Here is our error: >>>>>>>>>>>")
      console.log(e.message)
    }

});

//EDIT PROFILE

app.get('/edit/:id', async(req, res) => {
  try {
    const thisUser = await db.user.findByPk(req.params.id);
    const stationInfo = await db.station.findAll({
      order: [['name', 'asc']]
    })
    //console.log(thisUser.get());
    console.log("*********************************-STATION-INFO-TOP-******************")
    console.log(stationInfo[0].get());
    console.log("*********************************-STATION-INFO-BOTTOM-******************")
    res.render('edit', { thisUser, stationInfo });
  } catch {
    console.log(e.message);
  }
})

app.put('/profile/:id', async(req, res) => {
  try {
    console.log(req.params.id);
  const profile = await db.user.update({
    userName: req.body.userName, 
    avi: req.body.avi, 
    aboutMe: req.body.aboutMe, 
    stationId: req.body.stationId
  }, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  }) 
    res.redirect('/profile')
  } catch(e) {
    console.log(e.message);
  } 

 app.get('/test', async(req, res) => {
  const testData = await db.test.findAll();
  res.send(testData);
  console.log('test successful');
 })
});

//STATIONS
app.get('/show/:id', async(req, res) => {
  try {
  const thisStation = await db.station.findByPk(req.params.id);
  const existAlready = await db.post.count({ where: {stationId: thisStation.id} });
  if (existAlready > 0) {
      const thesePosts = await db.post.findAll({
          where: { stationId: thisStation.id },
          order: [['createdAt', 'desc']]
          });

        console.log("thesePosts[2].get() below:")  
        console.log(thesePosts[2].get())

        res.render('show', { thisStation, thesePosts });
        console.log("thisStation.get() below: " );
        console.log(thisStation.get())
  } else { 
    res.redirect('/stations'); // --??-- how do I make a flash error instead?
    }
  } catch(e) {
    console.log("WE HIT THE CATCH. ERROR BELOW:")
    console.log(message);
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
  app.get('/post/:id', isLoggedIn, async(req, res) => {
    try {
    const thisStation = await db.station.findByPk(req.params.id)
      res.render('post.ejs', { thisStation });
    } catch(e) {
      console.log(e)
    }
    });

 

app.get('/newPost/:id', async(req, res) => {
  try{
    const newPost = await db.post.findByPk(req.params.id);
    const thisStation = await db.station.findByPk(newPost.stationId); // --??-- I can access newPost.station here
    console.log("newPost StationId: " + thisStation.get().id);
    console.log(newPost); // --??-- but I can't log the whole object here
    console.log(thisStation.get().name);
    res.render('newPost', {post: newPost.get(), station: thisStation.get() }); //***
  } catch(e) {
    console.log(e.message);
  }
});

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
