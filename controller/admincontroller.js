const path = require('path');
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

    let adminData = await Admin.find({});
    return res.render("Admin_pages/View_admin", {
        "adminData": adminData,
    });
};

module.exports.view_profile = async (req, res) => {

    var adminRecord = req.user;
    // var sname = adminRecord.name.split(" ");
    return res.render("Admin_pages/View_profile", {
        adminData: adminRecord,
    });
}

module.exports.checklogin = async (req, res) => {
    return res.redirect("/admin/dashboard")
};

module.exports.updatepassword = async (req, res) => {
    return res.redirect("/admin/")
};

module.exports.editProfile = async (req, res) => {

    let adminData = await Admin.find({});
    return res.render("Admin_pages/EditProfile", {
        adminData: adminData
    })
}
//Profile Page
// module.exports.profile = (req, res) => {
//     if (req.user == undefined) {
//       return res.redirect("/admin/");
//     } else {
//       var adminRecord = req.user;
//       var sname = adminRecord.name.split(" ");
//       return res.render("view_profile", {
//         adminData: adminRecord,
//         sname: sname,
//       });
//     }
//   };
