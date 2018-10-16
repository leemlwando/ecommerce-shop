const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String },
  categoryId: { type: String },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  cpu: { type: String },
  camera: { type: String },
  size: { type: String },
  weight: { type: String },
  display: { type: String },
  battery: { type: String },
  memory: { type: String }
});

module.exports = mongoose.model('Product', schema);
