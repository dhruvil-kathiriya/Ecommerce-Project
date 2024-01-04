const category = require("../models/category");

module.exports.add_category = async (req, res) => {
    return res.render("Admin_pages/Add_category");
}

module.exports.view_category = async (req, res) => {
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
        const perPage = 4;
        let catdata = await category.find({
            $or: [
                { "category_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page)
        let totalcatData = await category.find({
            $or: [
                { "category_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('Admin_pages/View_category', {
            catdata: catdata,
            searchValue: search,
            totalDocument: Math.ceil(totalcatData / perPage),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
}

module.exports.insert_category = async (req, res) => {
    try {
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
    } catch (error) {
        if (error) {
            console.log(error);
            return res.status(400).json({ msg: "Something Went Wrong", status: 0 });
        }
    }
}

module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await category.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Category Deactived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Category is not Deactived");
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
            let active = await category.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Category actived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Category is not Activated");
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

module.exports.deletecategory = async (req, res) => {
    try {
        let deletData = await category.findByIdAndDelete(req.params.id);
        if (deletData) {
            console.log("Category Deleted Successfully");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
