const mongoose = require('mongoose');


mongoose.connect(
    'mongodb://localhost:27017/shopping',
    { useNewUrlParser: true }
  );
  

const db = mongoose.connection;

db.on("error",(err)=>process.exit(1));

db.once("open",()=>console.log(`DATABASE CONNECTED`));


module.exports = db;