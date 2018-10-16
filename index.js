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

mongoose.connect(
  'mongodb://localhost:27017/shopping',
  {
    useNewUrlParser: true
  }
);
app.use(morgan('combined')); // logs request
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // parse any reqest type to json
app.use(
  session({
    secret: 'ellis',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  console.log(
    req.session,
    '=========================================REQ.SESSION'
  );
  console.log(
    res.locals.session,
    '++++++++++++++++++++++++++++++++++RES.LOCALS.SESSION'
  );
  next();
});
router(app);

try {
  const port = process.env.PORT || 3090;
  const server = http.createServer(app);
  server.listen(port);
  console.log('server listening on: ', port);
} catch (err) {
  console.log(err);
}
