const Favorite = require("../models/favorite.js");
exports.getUserPage = (req,res,next) =>{
  // Favorite
  // .find({userId:req.session.user._id})
  // .populate('recipes')
  // .exec((err,foundobject)=>{
  //   console.log(foundobject)})}
  // .then(result=>{
  //     console.log(result)
      res.render('user.hbs',{
        isAuthenticated:req.session.isLoggedIn,
        scripts :["search-recipes-isloggedin.js"]
      })
  }
    // .catch(err =>console.log(err))