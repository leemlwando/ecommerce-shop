const signin = require("./signin");
const signup = require("./signup");

module.exports = {
    signup:{
        get:(req,res,next)=>res.json({success:true, message:"welcome to signup api"}),
        post:(req,res,next)=>signup(req,res,next)
    },
    signin:{
        get:(req,res,next)=>res.json({success:true, message:"welcome to signin api"}),
        post: (req,res,next)=>signin(req,res,next)
    }
}