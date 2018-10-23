const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const config = {
    name:"ellis",
    secret: 'ellis',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        uri:'mongodb://localhost:27017/shopping',
        collection:"sessions"
      }),
      cookie: { maxAge: 180 * 60 * 1000, secure:false } // 180min = 3hrs
}

module.exports = session(config);