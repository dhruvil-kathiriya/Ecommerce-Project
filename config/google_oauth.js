const passport = require("passport");
const user = require("../models/user");
const bcrypt = require("bcrypt");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "871472100139-v56kqgq31cn1pkap93pksv67m25229va.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://e-commerce-i4o1.onrender.com/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      //   console.log(profile);
      let checkemail = await user.findOne({ email: profile.emails[0].value });
      if (checkemail) {
        cb(null, checkemail);
      } else {
        var pass = `${profile.emails[0].value}@123`;
        let userdetails = {
          username: profile.displayName,
          email: profile.emails[0].value,
          password: await bcrypt.hash(pass, 10),
          role: "user",
        };
        let newuserData = await user.create(userdetails);
        if (newuserData) {
          return cb(null, newuserData);
        } else {
          return cb(null, false);
        }
      }
    }
  )
);

module.exports = GoogleStrategy;
