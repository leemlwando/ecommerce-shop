const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const  JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const config  = require('../index');

const {User} = require('../../lib/db');

module.exports = {
    initialize : ()=>passport.initialize(),
    PassportSession: ()=>passport.session(),
    localStrategy: ()=>{
        return passport.use(new localStrategy({
            usernameField:"email",
            passwordField:"password"
        },function(username,password,done){
            // console.log("username", username,"password",password)
                User.findOne({email:username})
                    .then(user=>{
                        if(!user){
                            // Console.log("user not found")
                            return done(null,false);
                        }

                        user.comparePassword(password,function(err,isMatch){
                            if(err){return done(err)};
                            if(!isMatch){return done(null,false)};
                            return done(null,user);
                        })
                    })
                        .catch(err=>{
                            console.log(err)
                            done(err)
                        })
        }));
    },

    PassportStrategy:()=>{
        return passport.use("jwt",new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.secret

        },function(jwt_payload, done){
            console.log("here..")
            User.findOne({_id:jwt_payload.id})
                .then(user=>{
                    if(!user){
                        return done(null, false);
                    }

                    return done(null, {email:user.email,firstName:user.firstName, lastName:user.firstName});
                }).catch(err=>done(err));
        }));
    },

    serializeUser:  ()=> passport.serializeUser(function(user, done){
        // console.log('serialize user');
        done(null, user.id);
    }),
    
    deserializeUser:()=>passport.deserializeUser(function(id, done) {
        // console.log('deserialize user')
         User.findById(id, function(err, user) { done(err, user);
        });
    })
      
}

/**
 *@{TODO} - PASSPORT-JWT
*/