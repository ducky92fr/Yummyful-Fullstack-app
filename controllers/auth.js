const User = require('../models/user');
const Favorite = require("../models/favorite.js");
const bcrypt = require("bcrypt")
exports.getLogin = (req, res, next) => {
  res.render("auth/login.hbs",{
    errorMessage: req.flash('error'),
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup.hbs", {
    errorMessage: req.flash("error")
  });
};


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      req.flash("error", "Invalid Email");
      return req.session.save(err => {
        res.redirect("/login");
      });
    }
    bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          Favorite.find({userId:user._id})
          .then(favorite => {
            favorite.length >0 ? req.session.liked = [...favorite[0].recipes]:req.session.liked =["13431423423"]
            console.log(req.session.liked)
            console.log(favorite.length)
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log("login done")
              console.log(err);
              return res.redirect("/user");
            });
          })
        }else{
        req.flash("error", "Invalid password");
        res.redirect("/login");}
      })

      .catch(err => {
        console.log(err);
        res.redirect("/login");
      });
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.username;
  User.findOne({ email: email })
    .then(result => {
      if (result) {
        req.flash("error", "You already have an account"); 
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            username: userName
          });
          return user.save();
        })
        .then(result => {
          return res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  return req.session.destroy(err => {
    console.log(err);
    console.log("logout done")
    res.redirect("/");
  });
};