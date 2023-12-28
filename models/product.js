const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    type_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "type"
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

const product = mongoose.model("product", productschema);
module.exports = product;