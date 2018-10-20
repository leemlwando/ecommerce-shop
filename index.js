const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { mongoURI } = require('./config');

mongoose.connect(
  'mongodb://localhost:27017/shopping',
  { useNewUrlParser: true }
);

app.use(morgan('combined')); // logs request
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // parse any reqest type to json
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(
  session({
    secret: 'ellis',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 } // 180min = 3hrs
  })
);

router(app);

try {
  const port = process.env.PORT || 3090;
  const server = http.createServer(app);
  server.listen(port);
  console.log('server listening on: ', port);
} catch (err) {
  console.log(err);
}
