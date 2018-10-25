const mongoose = require('mongoose');
const {UserSchema,ProductCartSchema,ProductCategorySchema,ProductSchema} = require('../methods');

const User = mongoose.model('Users', UserSchema);
const Cart = mongoose.model('Carts', ProductCartSchema);
const Category = mongoose.model('Categories', ProductCategorySchema);
const Product = mongoose.model('Products',ProductSchema);


module.exports = {User,Cart,Category,Product};