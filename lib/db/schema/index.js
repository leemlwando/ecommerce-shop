const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);


const UserSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String }
});

const ProductSchema = new Schema({
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

  const ProductCartSchema = new Schema({
    cart: {
      product: { type: String },
      quantity: { type: Number },
      price: { type: Number }
    },
    totalPrice: { type: Number },
    totalQty: { type: Number }
  });


  const ProductCategorySchema = new Schema({
    id: { type: String },
    name: { type: String },
  });

module.exports = {UserSchema,ProductSchema,ProductCartSchema,ProductCategorySchema};