const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const Product = require('./models/product');
const Category = require('./models/category');
const Cart = require('./models/cart');

// by default passport wants to create a cookie based
// auth, session: false will keep that from happening
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/requireAuth', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });

  app.get('/product/:id', async (req, res) => {
    await Product.findById(req.params.id, (err, product) => {
      if (err) {
        return console.log(err);
      }
      res.send(product);
    });
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  });

  app.get('/addToCart/:id', async (req, res) => {
    console.log('++++++++++++++++++++++++++++++++++++++++start ');
    console.log(
      req.session,
      '==========================================req.session'
    );
    console.log(
      req.sessionID,
      '==========================================req.sessionID'
    );
    console.log(
      req.session.cart,
      '==========================================req.session.cart'
    );
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(
      req.session.cart,
      '==========================================req.session.cart'
    );
    console.log(cart.items, '-------------cart ITEMS');

    await Product.findById(req.params.id, (err, product) => {
      if (err) {
        // console.log('error------------------------');
        return res.send(err);
      }
      // console.log(product, 'product found ---------------');
      // console.log(product._id, 'product _id --------------');
      cart.add(product, product._id);
      console.log('!!!!!!!!!!!!!!!-----product just added to cart');
      req.session.cart = cart;
      console.log(req.session.cart, '---------------req.session.cart');

      res.send(req.session.cart);
    });
  });
};
