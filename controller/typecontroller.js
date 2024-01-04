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
    try {
        var search = "";
        var page;
        if (req.query.search) {
            search = req.query.search;
        }
        if (req.query.pages) {
            page = req.query.pages;
        }
        else {
            page = 0;
        }
        const perPage = 2;
        let typeData = await type.find({
            $or: [
                { "type_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(['categoryId', 'subcategoryId', 'extracategoryId', 'brandId']).exec();
        let totaltypeData = await type.find({
            $or: [
                { "type": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('Admin_pages/View_type', {
            typeData: typeData,
            searchValue: search,
            totalDocument: Math.ceil(totaltypeData / perPage),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
}

module.exports.insert_type = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let typeData = await type.create(req.body);
        return res.redirect("back")
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}

module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await type.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Type Deactived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Type is not Deactived");
                return res.redirect('back');
            }
        }
        else {
            console.log("Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.deActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await type.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Type actived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Type is not Deactived");
                return res.redirect('back');
            }
        }
        else {
            console.log("Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deletetype = async (req, res) => {
    try {
        let deletData = await type.findByIdAndDelete(req.params.id);
        if (deletData) {
            console.log("Type Deleted Successfully");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.getBrand = async (req, res) => {
    var BrandData = await brand.find({ extracategoryId: req.body.extraid });
    var options = `<option value="">--Select--</option>`;
    BrandData.map((v, i) => {
        options += `<option value='${v.id}'>${v.brand_name}</option>`;
    });
    return res.json(options);
}