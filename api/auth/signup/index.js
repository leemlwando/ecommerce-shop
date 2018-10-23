const {User} = require('../../../lib/db');
const jwt = require("jsonwebtoken");

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
  }

module.exports = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body)
  
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
}