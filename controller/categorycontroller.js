const category = require("../models/category");


module.exports.add_category = async (req, res) => {
    if (req.user == undefined) {
        return res.redirect("/admin/");
    } else {
        return res.render("Admin_pages/Add_category");
    }
}

module.exports.view_category = async (req, res) => {
    if (req.user == undefined) {
        return res.redirect("/admin/");
    } else {
        let catdata = await category.find({});
        return res.render("Admin_pages/View_category", {
            catdata: catdata
        });
    }
}

module.exports.insert_category = async (req, res) => {
    try {
        if (req.user == undefined) {
            return res.redirect("/admin/");
        } else {
            req.body.isActive = true;
            req.body.created_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let catData = await category.create(req.body);
            if (catData) {
                console.log("category Added Successfully");
                return res.redirect("back");
            }
            else {
                console.log("category is Not Added");
                return res.redirect("back");
            }
        }
    } catch (error) {
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: "Something Went Wrong", status: 0 });
        }
    }
}