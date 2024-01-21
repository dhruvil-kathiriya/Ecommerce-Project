const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const Admin = require("../models/admin");
const User = require("../models/user");
const bcrypt = require("bcrypt");

passport.use(
  new passportLocal(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      let adminData = await Admin.findOne({ email: email });

      if (adminData) {
        if (password == adminData.password) {
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

passport.use(
  "user",
  new passportLocal(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      let userData = await User.findOne({ email: email });
      if (userData) {
        if (await bcrypt.compare(password, userData.password)) {
          return done(null, userData);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(async (adminData, done) => {
  return done(null, adminData.id);
});
passport.deserializeUser(async (id, done) => {
  let adminRecord = await Admin.findById(id);
  let userRecord = await User.findById(id);
  if (adminRecord) {
    return done(null, adminRecord);
  } else if (userRecord) {
    return done(null, userRecord);
  } else {
    return done(null, false);
  }
});

passport.setAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role == "admin") {
      res.locals.user = req.user;
    } else {
      res.locals.userdetails = req.user;
    }
  }
  return next();
};

passport.checkAthuntication = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role == "user") {
      console.log("you have no authorization");
      return res.redirect("/");
    }
    next();
  } else {
    return res.redirect("/admin/");
  }
};

passport.checkAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/");
  }
};
module.exports = passport;
