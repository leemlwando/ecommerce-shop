const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const { mongoURI } = require('./config');
const {initialize,PassportSession,localStrategy,serializeUser,deserializeUser} = require('./config/passport');

mongoose.connect(
  'mongodb://localhost:27017/shopping',
  { useNewUrlParser: true }
);

app.use(morgan('dev')); // logs request
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // parse any reqest type to json


app.use(function(req, res, next) {
  // console.log("session",req.session);
  res.locals.session = req.session;
  next();
});
app.use(
  session({
    name:"ellis",
    secret: 'ellis',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      uri:'mongodb://localhost:27017/shopping',
      collection:"sessions"
    }),
    cookie: { maxAge: 180 * 60 * 1000, secure:false } // 180min = 3hrs
  })
);

initialize();
PassportSession();
localStrategy();
serializeUser();
deserializeUser();
router(app);

try {
  const port = process.env.PORT || 3090;
  const server = http.createServer(app);
  server.listen(port);
  console.log('server listening on: ', port);
} catch (err) {
  console.log(err);
}
