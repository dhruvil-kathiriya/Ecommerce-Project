const mongoose = require('mongoose');
const category = require("../models/category");
const subcategory = require("../models/subcategory");

const extracategoryschema = mongoose.Schema({
    extracategory_name: {
        type: String,
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    isActive: {
        type: Boolean,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    },
});

const extracategory = mongoose.model("extracategory", extracategoryschema);
module.exports = extracategory;