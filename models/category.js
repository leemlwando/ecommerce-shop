const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String },
  name: { type: String },
});

module.exports = mongoose.model('Category', schema);