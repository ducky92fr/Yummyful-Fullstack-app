exports.getUserPage = (req,res,next) =>{
  if(req.session.isLoggedIn){
   return res.render('user.hbs',{
      isAuthenticated:req.session.isLoggedIn,
      scripts :["search-recipes-isloggedin.js"]
    })
  }else{
    return res.render('user.hbs',{
      isAuthenticated:req.session.isLoggedIn,
      scripts:["search-recipes-notlog.js"]
    })
  }
}