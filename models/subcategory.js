const mongoose = require('mongoose');
const category = require("../models/category");

const subcategoryschema = mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true
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

const subcategory = mongoose.model("subcategory", subcategoryschema);
module.exports = subcategory;