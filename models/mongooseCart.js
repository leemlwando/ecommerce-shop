const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  cart: {
    product: { type: string },
    quantity: { type: number },
    price: { type: number }
  },
  totalPrice: { type: number },
  totalQty: { type: number }
});

module.exports = mongoose.model('Cart', schema);
