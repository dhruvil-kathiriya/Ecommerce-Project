const mongoose = require('mongoose');

const extracategoryschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    extracategory_name: {
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

const extracategory = mongoose.model("extracategory", extracategoryschema);
module.exports = extracategory;