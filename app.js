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
const passportlocal = require("./config/passport-local-strategy");
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.urlencoded());

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

app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/user"));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server responded On Port : ${port}`);
});
