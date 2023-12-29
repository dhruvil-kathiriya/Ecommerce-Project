const mongoose = require('mongoose');

const brandschema = mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    },
    extracategoryId: {
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

const brand = mongoose.model("brand", brandschema);
module.exports = brand;