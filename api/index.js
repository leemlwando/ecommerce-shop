const express = require('express');
const router = express.Router();
const home = require('./home');
const auth = require('./auth');
const user = require('./users');
const products = require('./products');
const passport = require('passport');



/**
 * GET HOME
 */

router.get("/",home.get);

 /**
  *  POST signin
 */
router.post("/signin",passport.authenticate("local"),auth.signin.post);


 /**
  *  POST signup
 */
router.post("/signup",auth.signup.post);


/**
 *  GET all products
*/

router.get("/products",products.all.get);


/**
 * GET one product
*/

router.get("/products/:id",products.id.get);

/**
 * GET profile
*/

router.get("/profile",passport.authenticate("jwt",{session:false}),user.profile.get);




/**
 * @{TODO-[bring all other routes here and delete router.js]}
*/



module.exports = router;