require('dotenv').config();
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const session = require('./config/session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const ApiRoutes = require('./api');
const {initialize,PassportSession,localStrategy,serializeUser,deserializeUser,PassportStrategy} = require('./config/passport');


app.use(morgan('dev')); // logs request
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // parse any reqest type to json


app.use(function(req, res, next) {
  // console.log("session",req.session);
  res.locals.session = req.session;
  next();
});

//express sesion
app.use(session);

//passport
initialize();
PassportSession();
localStrategy();
PassportStrategy();
serializeUser();
deserializeUser();

//Api routes
app.use("/api/v1/",ApiRoutes);

//ctach 404
app.use(function(req,res,next){
    next(createError(404));
})

//handler error responses
app.use(function(err,req,res,next){
  if(!err){return next()};
    res.status(err.code || err.status || 500);
    res.json({
      success:!err.success ? false : true,
      message:!err.message ? "Ooops! an error occuored!" : err.message,
      reason:!err.reason ? null : err.reason
    })
})


try {
  const port = process.env.PORT || 3090;
  const server = http.createServer(app);
  server.listen(port);
  console.log('server listening on: ', port);
} catch (err) {
  console.log(err);
  process.exit(1)
}
