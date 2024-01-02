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

    let typeData = await type.find({}).populate(['categoryId', 'subcategoryId', 'extracategoryId', 'brandId']).exec();
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
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}
module.exports.getBrand = async (req, res) => {
    var BrandData = await brand.find({ extracategoryId: req.body.extraid });
    var options = `<option value="">--Select--</option>`;
    BrandData.map((v, i) => {
        options += `<option value='${v.id}'>${v.brandname}</option>`;
    });
    return res.json(options);
}