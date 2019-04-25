exports.getHomePage = (req,res,next) =>{
  res.render('home.hbs',{
    isAuthenticated:req.session.isLoggedIn
  })
}