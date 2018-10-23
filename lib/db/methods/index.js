const {UserSchema,ProductCartSchema,ProductCategorySchema,ProductSchema} = require('../schema');
const bcrypt = require('bcrypt-nodejs');



UserSchema.pre('save', function(next) {
    // we are accessing the user model
    let self = this;
    
    let password = self.password;
    let salt = 10;
    bcrypt.genSalt(salt, function(err, genSalt) {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(password, genSalt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
  
        self.password = hash;
        next();
      });
    });
  });


  UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    // this.password is what is stored in our database
    let self = this;
    let password = self.password
    bcrypt.compare(candidatePassword, password, function(err, isMatch) {
      if (err) {
        return callback(err);
      }
  
      callback(null, isMatch);
    });
  };



  


  module.exports = {UserSchema,ProductCartSchema,ProductCategorySchema,ProductSchema};