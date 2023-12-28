const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Ecom_DB");

const db = mongoose.connection;

db.once("open", function (err) {
    if (err) { console.log(err); }
    console.log("db Connectd");
})

module.exports = db;
