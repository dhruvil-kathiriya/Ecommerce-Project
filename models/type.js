const mongoose = require('mongoose');

const typeschema = mongoose.Schema({
    type_name: {
        type: String,
        required: true
    },
    brand_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    },
    extracategory_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategory"
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

const type = mongoose.model("type", typeschema);
module.exports = type;