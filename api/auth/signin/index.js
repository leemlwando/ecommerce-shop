const jwt = require("jsonwebtoken");

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub: user._id, iat: timestamp }, process.env.JWT_SECRET);
  }

module.exports = function(req, res, next) {
    // user has already had email and password auth'd
    // we just need to give them a token
    // passport gives us access to the user as req.user
    // passed into our done callback from localLogin = new LocalStrategy()
    // in passport.js
    // console.log("here")
    res.send({ token: tokenForUser(req.user) });
  };