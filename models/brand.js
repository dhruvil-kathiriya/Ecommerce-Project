const mongoose = require('mongoose');

const brandschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategory"
    },
    brand_name: {
        type: String,
        required: true
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