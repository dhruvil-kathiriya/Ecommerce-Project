const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");

module.exports.add_extracategory = async (req, res) => {
    let catData = await category.find({});
    let subcatData = await subcategory.find({});
    return res.render("Admin_pages/Add_extracategory", {
        catData: catData,
        subcatData: subcatData,
    });
}

module.exports.view_extracategory = async (req, res) => {
    let extracatData = await extracategory.find({}).populate("subcategoryId").populate("categoryId").exec();
    return res.render("Admin_pages/View_extracategory", {
        extracatData: extracatData
    });
}

module.exports.insert_extracategory = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let extracatData = await extracategory.create(req.body);
        if (extracatData) {
            console.log("extracategory Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("extracategory is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}