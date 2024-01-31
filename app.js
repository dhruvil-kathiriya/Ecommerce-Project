const express = require("express");
const port = process.env.PORT || 9009;
const path = require("path");
// const db = require('./config/mongoose');
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(`${process.env.mongo_url}`)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

const passport = require("passport");
const GoogleStrategy = require("./config/google_oauth");
const passportlocal = require("./config/passport-local-strategy");

app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    name: "Ecom",
    secret: `${process.env.Session_secret}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "userassets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Frontend Route
app.use("/", require("./routes/user"));

// Backend Route
app.use("/admin", require("./routes/admin"));

app.listen(port, (error) => {
  error ? console.log(error) : `Server responded On Port : ${port}`;
});
