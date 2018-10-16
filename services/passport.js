const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

// --------------- localLogin ------------------------

// create local strategy
// passport-local default looks for usernameField
// tell it to look at email for the property of the request
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    // is `password` equal to user.password?
    // we created comparePassword in our user model
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
      // passport assigns this user to req.user for our
      // signin function() in authentication.js
    });
  });
});

// ------- jwtLogin ----------------------------------

// setup options for JWT strategy
// map where to find the JWT on the request
// jwt could be in url, headr or body of the request...
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JWT strategy
// payload is what is returned from tokenForUser() in authentication.js
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if user id in payload is in our database
  // if it does, call 'done' with that user
  // otherwise, call 'done' without user, cannot login
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    }

    done(null, false);
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
