const express = require('express');
const router = express.Router();
const home = require('./home');
const auth = require('./auth');



/**
 * GET HOME
 */

router.get("/",home.get);

 /**
  *  POST signin
 */
router.post("/signin",auth.signup.post);


 /**
  *  POST signup
 */
router.post("/signup",auth.signup.post);





/**
 * @{TODO-[bring all other routes here and delete router.js]}
*/



module.exports = router;