  
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

 app.get('/test', async(req, res) => {
  const testData = await db.test.findAll();
  res.send(testData);
  console.log('test successful');
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
        res.render('show', { thisStation, thesePosts });

  } else { 
    res.redirect('/stations'); // --??-- how do I make a flash error instead?
    }
  } catch(e) {
    console.log("WE HIT THE CATCH. ERROR BELOW:")
    console.log(e.message);
  }
  });

app.get('/newPost/:id', async(req, res) => {
  try{
    const newPost = await db.post.findByPk(req.params.id);
    const thisStation = await db.station.findByPk(newPost.stationId); // --??-- I can access newPost.station here
    console.log("newPost StationId: " + thisStation.get().id);
    console.log(newPost); 
    console.log(thisStation.get().name);
    res.render('newPost', {post: newPost.get(), station: thisStation.get() }); //***
  } catch(e) {
    console.log(e.message);
  }
});

// app.get('/somethingbroke', (req, res) => {
//   res.render('404');
// })
// .catch(e => {
//  console.log('SNAG. Your app is broke. Fix it. :)');
//  console.log('Error below ...v');
//  console.log(e);
// });

app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/edit', require('./routes/editProfile'));
app.use('/stations', require('./routes/stations'));
app.use('/post', require('./routes/post'));



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);

module.exports = server;
