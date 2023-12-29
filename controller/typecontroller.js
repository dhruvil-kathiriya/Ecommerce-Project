const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const brand = require("../models/brand");
const type = require("../models/type");

module.exports.add_type = async (req, res) => {
    let catData = await category.find({});
    let subcatData = await subcategory.find({});
    let extracatData = await extracategory.find({});
    let brandData = await brand.find({});
    return res.render("Admin_pages/Add_type", {
        catData: catData,
        subcatData: subcatData,
        extracatData: extracatData,
        brandData: brandData,
    });
}

module.exports.view_type = async (req, res) => {

    let typeData = await type.find({}).populate("brandId").populate("extracategoryId").populate("subcategoryId").populate("categoryId").exec();
    return res.render("Admin_pages/View_type", {
        typeData: typeData
    });
}

module.exports.insert_type = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let typeData = await type.create(req.body);
        if (typeData) {
            console.log("type Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("type is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}