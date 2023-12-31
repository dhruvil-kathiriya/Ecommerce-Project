const passport = require("passport");
const passportlocal = require("passport-local").Strategy;
const Admin = require("../models/admin");

// CHECK AUTHENTICATION
passport.use(
  new passportlocal(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // console.log(email, password);
      var adminData = await Admin.findOne({ email: email });
      if (adminData) {
        if (adminData.password == password) {
          return done(null, adminData);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
);

// SERIALIZE USER
passport.serializeUser(async (user, done) => {
  return done(null, user.id);
});

// DESERIALIZE USER
passport.deserializeUser(async (id, done) => {
  let adminRecord = await Admin.findById(id);
  if (adminRecord) {
    return done(null, adminRecord);
  } else {
    return done(null, false);
  }
});

// SET AUTHEMNTICATION
passport.setAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

// CHECK AUTHENTICATION
passport.checkAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/admin/");
  }
};
module.exports = passport;
