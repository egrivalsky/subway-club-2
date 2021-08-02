const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// Passport "serialize" your info and make it easier to login
// passport.serializeUser((user, cb) => {
//     cb(null, user.id)
// });

// // Passport "deserialize" is to take the id and look it up in DB
// passport.deserializeUser((id, done) => {
//     db.user.findByPk(id)
//     .then(user => {
//         if (user) {
//             done(null, user);
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     })
// });

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, (email, password, done) => {
//     db.user.findOne({
//         where: { email }
//     })
//     .then(user => {
//         if (!user || !user.validPassword(password)) {
//             done(null, false);
//         } else {
//             done(null, user);
//         }
//     })
//     .catch(done);
// }));

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        console.log('looking up user')
        db.user.findOne( { where: { email } }) 
        .then(user => {
        //if (err) { console.log('line 47'); return done(err); }
        if (!user) {
          console.log('line 49');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          console.log('line 53')
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .then(console.log('line 56'))
      .catch(err =>
        {console.log(err)});
    }
  ));

module.exports = passport;