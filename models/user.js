const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String }
});

userSchema.pre('save', function(next) {
  // we are accessing the user model
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // this.password is what is stored in our database
  let res;
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      // return callback(err);
      res = false
      return res;
    }

    // callback(null, isMatch);
    if(!isMatch){
      res = false
      return res;
    }

    res=true
    return true;
  });
};

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;
