const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // user has already had email and password auth'd
  // we just need to give them a token
  // passport gives us access to the user as req.user
  // passed into our done callback from localLogin = new LocalStrategy()
  // in passport.js
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Provide email and password' });
  }

  // see if user exists
  User.findOne({ email: email }, (err, exisitingUser) => {
    if (err) {
      return next(err);
    }

    // if user return err
    if (exisitingUser) {
      return res.status(422).send({ error: 'Email already in use' });
    }

    // if !user create and save
    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }

      // respond to request user created
      res.json({ token: tokenForUser(user) });
    });
  });
};
