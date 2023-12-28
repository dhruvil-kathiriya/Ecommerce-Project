const subcategorys = require("../models/subcategory")
const category = require("../models/category");

module.exports.add_subcategory = async (req, res) => {
    let catData = await category.find({});
    return res.render("Admin_pages/Add_subcategory", { catData: catData });
}


module.exports.insert_subcategory = async (req, res) => {
    try {
        console.log(req.body);
        req.body.isActive = true;

        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let subcatData11 = await subcategorys.create(req.body);
        if (subcatData11) {
            console.log("Subcategory Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("Subcategory is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}

module.exports.view_subcategory = async (req, res) => {
    let subcatData = await subcategorys.find({}).populate("categoryId").exec();
    console.log(subcatData);
    return res.render("Admin_pages/View_subcategory", { subcatData: subcatData });
}