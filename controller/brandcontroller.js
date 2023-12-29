const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const brand = require("../models/brand");

module.exports.add_brand = async (req, res) => {
    try {
        let catData = await category.find({});
        let subcatData = await subcategory.find({});
        let extracatData = await extracategory.find({});
        return res.render("Admin_pages/Add_brand", {
            catData: catData,
            subcatData: subcatData,
            extracatData: extracatData,
        });
    } catch (error) {
        if (error) {
            console.log(error);
            return res.redirect("back");
        }
    }
}

module.exports.view_brand = async (req, res) => {
    let brandData = await brand.find({}).populate("extracategoryId").populate("subcategoryId").populate("categoryId").exec();
    return res.render("Admin_pages/View_brand", {
        brandData: brandData
    });
}

module.exports.insert_brand = async (req, res) => {
    try {

        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let brandData = await brand.create(req.body);
        if (brandData) {
            console.log("brand Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("brand is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}