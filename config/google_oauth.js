const passport = require('pasport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_ID,
    callbackURL: "http://localhost:9009/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log(profile.emails[0].value7);
            return cb(err, user);
        });
    }
));

module.exports = passport;
