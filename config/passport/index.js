const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

module.exports = {
    initialize : ()=>passport.initialize(),
    PassportSession: ()=>passport.session(),
    localStrategy: ()=>{
        return passport.use(new localStrategy({
            username:"email",
            password:"password"
        },function(username,password,done){
            console.log("username", username,"password",password)
                User.findOne({email:username})
                    .then(user=>{
                        if(!user){
                            return done(null,false);
                        }

                        if(!user.comparePassword(password)){
                            return done(null,false);
                        }

                        done(null,user);
                    })
                        .catch(err=>{
                            console.log(err)
                            done(err)
                        })
        }));
    },

    serializeUser:  ()=> passport.serializeUser(function(user, done){
        console.log('serialize user');
        done(null, user.id);
    }),
    
    deserializeUser:()=>passport.deserializeUser(function(id, done) {
        console.log('deserialize user')
         User.findById(id, function(err, user) { done(err, user);
        });
    })
      
}