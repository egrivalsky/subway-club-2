  
require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION;
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

app.get('/profile', isLoggedIn, (req, res) => {
  console.log(isLoggedIn);
  res.render('profile');
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
      console.log(`redirecting to show/${thisStation}`)
    });
    //const myStation = await db.station.findOne({
    //   where: { id: req.params.id }
    // })
    // console.log(myStation.id)
    // res.redirect(`/show/${myStation.id}`);
    // console.log('********station found ' + myStation.name + ' *********');
    // //res.send("this is the station's page and it's name is " + myStation.name);
    // res.render('show', { myStation });

 app.get('/stations', async(req, res) => {
    console.log("at router get stations");
      try {
        const allStations = await db.station.findAll();
        console.log('all stations found');
        res.render('stations', { allStations });
      } catch(e) {
        console.log('* * * * * get stations * * * * * ');
        console.log(e);
        console.log(e.message);
      }
  });

   app.get('/all-comments', (req, res) => {
     res.render('all-comments');
   })

   app.get('/add-comment', (req, res) => {
     res.render('add-comment');
      //res.send("This is where you add comments")
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
