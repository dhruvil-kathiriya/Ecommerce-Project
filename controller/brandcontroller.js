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
        let brandData = await brand.find({
            $or: [
                { "brand_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(["subcategoryId", "categoryId", "extracategoryId"]).exec();
        let totalbrandData = await brand.find({
            $or: [
                { "brand_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('Admin_pages/View_brand', {
            brandData: brandData,
            searchValue: search,
            totalDocument: Math.ceil(totalbrandData / perPage),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
}

module.exports.insert_brand = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let brandData = await brand.create(req.body);
        if (brandData) {
            console.log("Brand Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("Brand is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}


//IsActive Button 
module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await brand.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Brand Deactived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Brand is not Deactived");
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
            let active = await brand.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Brand actived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Brand is not Activated");
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

module.exports.deletebrand = async (req, res) => {
    try {
        let deletData = await brand.findByIdAndDelete(req.params.id);
        if (deletData) {
            console.log("Brand Deleted Successfully");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.getextracategoryData = async (req, res) => {
    try {
        // console.log(req.body);
        let extraCatData = await extracategory.find({
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
        });
        // console.log(extraCatData);
        let optionData =
            "<option value=''>-- Select Extra Category --</option>";
        extraCatData.map((v, i) => {
            optionData += `<option value='${v.id}'>${v.extracategory_name}</option>`;
        });
        return res.json(optionData);
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}
