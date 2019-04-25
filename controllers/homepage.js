renderHomePageConditionnal = (req,res,next) =>{
  if(req.session.isLoggedIn){
    res.render('home.hbs',{
    isAuthenticated:req.session.isLoggedIn,
    scripts :["search-recipes-isloggedin.js"]
  })
}else{
    res.render('home.hbs',{
    isAuthenticated:req.session.isLoggedIn,
    scripts:["search-recipes-notlog.js"]
  })
}}

getHomePage = (req,res,next) => {
  renderHomePageConditionnal(req,res,next)
  }

  module.exports={
    renderHomePageConditionnal,
    getHomePage
  }

