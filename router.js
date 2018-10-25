const Authentication = require('./controllers/authentication');
const passport = require('passport');
const Product = require('./models/product');
const Category = require('./models/category');
const Cart = require('./models/cart');

// by default passport wants to create a cookie based
// auth, session: false will keep that from happening
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.get('/categories', async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  });

  app.get('/addToCart/:id', async (req, res) => {
    console.log('++++++++++++++++++++++++++++++++++++++++start ');
    console.log(req.session, '==========================req.session');
    console.log(req.sessionID, '===================req.sessionID');
    console.log(req.session.cart, '==================req.session.cart');
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(req.session.cart, '=========================req.session.cart');
    console.log(cart.items, '-------------cart ITEMS');

    await Product.findById(req.params.id, (err, product) => {
      if (err) {
        console.log('error------------------------');
        return res.send(err);
      }

      cart.add(product, product._id);
      console.log('!!!!!!!!!!!!!!!-----product just added to cart');
      req.session.cart = cart;  
      console.log(req.session, '~~~~~ req.session after add to cart ~~~~');
      res.send(cart);
    });
  });
};
