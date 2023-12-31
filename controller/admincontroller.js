const path = require('path');
const fs = require("fs")
const Admin = require("../models/admin");

//Admin Panel Render 
module.exports.dashboard = async (req, res) => {
    let adminData = await Admin.find({});
    return res.render("Admin_pages/Admin_Dashboard", {
        "adminData": adminData,
    });

};

//Add Admin Page Render
module.exports.add_admin = async (req, res) => {
    return res.render("Admin_pages/Add_admin");
};

//Insert Admin Data
module.exports.insert_admin = async (req, res) => {
    try {
        let imagePath = ""
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        if (req.file) {
            imagePath = Admin.imageAdminPath + "/" + req.file.filename;
        }
        req.body.admin_image = imagePath;
        let addData = await Admin.create(req.body);
        if (addData) {
            console.log("Data Insert successfuly");
            return res.redirect("/admin/Add_admin");
        }
        else {
            console.log("Data Not Inserted");
            return res.redirect("/admin/Add_admin");
        }
    } catch (error) {
        if (error) {
            console.log(error);
            return res.redirect("back");
        }
    }
};

//View admin Page Render
module.exports.view_admin = async (req, res) => {
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
        let adminData = await Admin.find({
            $or: [
                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page);
        let totalAdmindata = await Admin.find({
            $or: [
                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('Admin_pages/View_admin', {
            adminData: adminData,
            searchValue: search,
            totalDocument: Math.ceil(totalAdmindata / perPage),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
};

//View Profile Page Render
module.exports.view_profile = async (req, res) => {
    var adminRecord = req.user;
    return res.render("Admin_pages/View_profile", {
        adminData: adminRecord,
    });
};

module.exports.checklogin = async (req, res) => {
    return res.redirect("/admin/dashboard");
};

module.exports.updatepassword = async (req, res) => {
    return res.redirect("/admin/");
};

//IsActive Button 
module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Admin.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Data Deactived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record is not Deactived");
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

//Deactiovate Button
module.exports.deActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Admin.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data actived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record is not Deactived");
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

//Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {
        let oldData = await Admin.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.admin_image;
            if (oldImage) {
                let fullPath = path.join(__dirname, '..', oldData.admin_image);
                await fs.unlinkSync(fullPath);
                let deletData = await Admin.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Record & Image Deleted Succesfully");
                    return res.redirect('back');
                }
                else {
                    console.log("Record Deleted Succesfully");
                    return res.redirect('back');
                }
            }
            else {
                let deletData = await Admin.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Admin Data Deleted Successfully");
                    return res.redirect('back');
                }
                else {
                    console.log("Admin Record Delet");
                    return res.redirect('back');
                }
            }
        }
        else {
            console.log("Record Not Found");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}