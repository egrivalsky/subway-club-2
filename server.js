  
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
app.use('./show', require('./routes/show'));
app.use('/newPost', require('./routes/newPost'));



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`)
});
