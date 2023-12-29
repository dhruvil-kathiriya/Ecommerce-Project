
const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const brand = require("../models/brand");
const type = require("../models/type");
const product = require("../models/product");

module.exports.add_product = async (req, res) => {
    let catData = await category.find({});
    let subcatData = await subcategory.find({});
    let extracatData = await extracategory.find({});
    let brandData = await brand.find({});
    let typeData = await type.find({});

    return res.render("Admin_pages/Add_product", {
        catData: catData,
        subcatData: subcatData,
        extracatData: extracatData,
        brandData: brandData,
        typeData: typeData
    });
}

module.exports.view_product = async (req, res) => {
    let productData = await product.find({}).populate("typeId").populate("brandId").populate("extracategoryId").populate("subcategoryId").populate("categoryId").exec();
    return res.render("Admin_pages/View_product", {
        productData: productData
    });
}

module.exports.insert_product = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let productData = await product.create(req.body);
        if (productData) {
            console.log("product Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("product is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}