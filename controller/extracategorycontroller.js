const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const Brand = require("../models/brand");
const Type = require("../models/type")

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
    // console.log(extracatData);
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

module.exports.getsubcategoryData = async (req, res) => {
    try {
        // console.log(req.body);
        let subcatData = await subcategory.find({ categoryId: req.body.categoryId });
        // console.log(subcatData);
        let optionData = "<option value=''>-- Select Subcategory --</option>";
        subcatData.map((v, i) => {
            optionData += `<option value='${v.id}'>${v.subcategory_name}</option>`;
        });
        return res.json(optionData);
    }
    catch (err) {
        console.log(err);
    }
}




