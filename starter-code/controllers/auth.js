const User = require('../models/user');
const bcrypt = require("bcrypt")
exports.getLogin = (req, res, next) => {
  res.render("auth/login.hbs",{
    errorMessage: req.flash('error'),
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup.hbs');
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email})
  .then(user =>{
    if(!user){
      req.flash('error','Invalid email or password.')
      return req.session.save(err =>{
        res.redirect('/login')
      })
    }
    bcrypt
    .compare(password,user.password)
    .then(doMatch =>{
      if(doMatch){
        req.session.isLoggedIn=true;
        req.session.user=user;
         return req.session.save(err =>{
          console.log(err)
          return res.redirect('/user')
      })
      }
      res.redirect('/login')
    })

  .catch(err =>{
      console.log(err);
      res.redirect('/login')
    })
    
  })  
}
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.username;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password,12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            username:userName
        });
         return user.save()
        })
        .then(result => {
          return res.redirect('/login');
      })
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  return req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
