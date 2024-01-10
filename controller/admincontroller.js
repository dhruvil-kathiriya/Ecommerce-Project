const path = require("path");
const fs = require("fs");
const Admin = require("../models/admin");
const nodemailer = require("nodemailer");
const { error } = require("console");

module.exports.dashboard = async (req, res) => {
  let adminData = await Admin.find({});
  return res.render("Admin_pages/Admin_Dashboard", {
    adminData: adminData,
  });
};

module.exports.add_admin = async (req, res) => {
  return res.render("Admin_pages/Add_admin");
};

module.exports.insert_admin = async (req, res) => {
  try {
    let imagePath = "";
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
    } else {
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

// VIEW PAGE WITH SEARCHING & PAGINATION
module.exports.view_admin = async (req, res) => {
  try {
    var search = "";
    var page;
    if (req.query.search) {
      search = req.query.search;
    }
    if (req.query.pages) {
      page = req.query.pages;
    } else {
      page = 0;
    }
    const perPage = 2; // How Many Records Per Page to Show
    let adminData = await Admin.find({
      $or: [
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
        { gender: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    })
      .limit(perPage)
      .skip(perPage * page);
    let totalAdmindata = await Admin.find({
      $or: [
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
        { email: { $regex: ".*" + search + ".*", $options: "i" } },
        { gender: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    }).countDocuments();
    return res.render("Admin_pages/View_admin", {
      adminData: adminData,
      searchValue: search,
      totalDocument: Math.ceil(totalAdmindata / perPage),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.updateAdmin = async (req, res) => {
  try {
    let oldData = await Admin.findById(req.params.id);
    // console.log(oldData);
    return res.render("Admin_pages/Update_admin", {
      oldData: oldData,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.editAdmin = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    let oldadmin = await Admin.findById(req.body.EditId);
    console.log(oldadmin);
    console.log(req.body);
    if (req.file) {
      if (oldadmin.admin_image) {
        let fullpath = path.join(__dirname, "..", oldadmin.admin_image);
        await fs.unlinkSync(fullpath);
      }
      var imagePath = "";
      imagePath = Admin.imgModel + "/" + req.file.filename;
      req.body.admin_image = imagePath;
    } else {
      req.body.admin_image = oldadmin.admin_image;
    }
    await Admin.findByIdAndUpdate(req.body.EditId, req.body);
    return res.redirect("/admin/logout");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.view_profile = async (req, res) => {
  var adminRecord = req.user;
  return res.render("Admin_pages/View_profile", {
    adminData: adminRecord,
  });
};

module.exports.verifyotp = async (req, res) => {
  try {
    if (req.cookie.OTP == req.body.otp) {
      return res.render("Admin_pages/Setnewpassword");
    } else {
      console.log("otp Does not Match! Enter Again");
      return res.redirect("back");
    }
  } catch (error) {
    if (error) console.log(error);
  }
};

// Check Main Login
module.exports.checklogin = async (req, res) => {
  return res.redirect("/admin/dashboard");
};

module.exports.updatepassword = async (req, res) => {
  try {
    if (req.body.npassword == req.body.cpassword) {
      let email = req.cookies.email;
      let checkEmail = await Admin.findOne({ email: email });
      if (checkEmail) {
        let resetPassword = await Admin.findByIdAndUpdate(checkEmail.id, {
          password: req.body.npassword,
        });
        if (resetPassword) {
          res.clearCookie("otp");
          res.clearCookie("email");
          return res.redirect("/admin/");
        } else {
          console.log("Password Not Changed");
          return res.redirect("back");
        }
      } else {
        console.log("Email Not Found");
        return res.redirect("back");
      }
    } else {
      console.log("Password Not Matched");
      return res.redirect("back");
    }
  } catch (error) {
    if (error) console.log(error);
    return res.redirect("back");
  }
};

module.exports.Checkotp = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body) {
      let OTP = Math.floor(Math.random() * 90000) + 10000;
      let checkMail = await Admin.findOne({ email: req.body.email });
      if (checkMail) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: `${process.env.SMTP_user}`,
            pass: `${process.env.SMTP_pass}`,
          },
        });
        const info = await transporter.sendMail({
          from: `${process.env.SMTP_user}`,
          to: req.body.email,
          subject: "OTP",
          text: "Your OTP is here!",
          html: `<b>${OTP}</b>`,
        });
        res.cookie("otp", OTP);
        res.cookie("email", checkMail.email);
        if (info) {
          console.log("Check your mail");
          return res.render("Admin_pages/Verifyotp");
        } else {
          console.log("Something went wrong");
          return res.redirect("back");
        }
      } else {
        console.log("Invalid email");
        return res.redirect("back");
      }
    } else {
      console.log("Enter your email");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.update_password = async (req, res) => {
  return res.render("Admin_pages/Update_password");
};

module.exports.updatenewpassword = async (req, res) => {
  try {
    // console.log(req.body);
    let oldData = req.user;
    if (oldData) {
      if (oldData.password == req.body.oldpass) {
        if (req.body.oldpass != req.body.newpass) {
          if (req.body.newpass == req.body.conpass) {
            let oldAdmin = await Admin.findById(oldData._id);
            if (oldAdmin) {
              let editPassword = await Admin.findByIdAndUpdate(oldAdmin._id, {
                password: req.body.newpass,
              });
              if (editPassword) {
                return res.redirect("/admin/logout");
              } else {
                console.log("Password is Not Changed");
              }
            } else {
              console.log("Data Not Found");
            }
          } else {
            console.log("New & Confirm Password Does Not Match");
          }
        } else {
          console.log("Current & New Passwords Are Same");
          return res.redirect("back");
        }
      } else {
        console.log("Current Password Not Matched");
      }
    } else {
      console.log("Data Not Found");
    }
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.isActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await Admin.findByIdAndUpdate(req.params.id, {
        isActive: false,
      });
      if (active) {
        console.log("Admin Deactived Successfully");
        return res.redirect("back");
      } else {
        console.log("Admin is not Deactived");
        return res.redirect("back");
      }
    } else {
      console.log("Id is not Available");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.deActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await Admin.findByIdAndUpdate(req.params.id, {
        isActive: true,
      });
      if (active) {
        console.log("Data actived Successfully");
        return res.redirect("back");
      } else {
        console.log("Record is not Deactived");
        return res.redirect("back");
      }
    } else {
      console.log("Id not Found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    let oldData = await Admin.findById(req.params.id);
    if (oldData) {
      var oldImage = oldData.admin_image;
      if (oldImage) {
        let fullPath = path.join(__dirname, "..", oldData.admin_image);
        await fs.unlinkSync(fullPath); // To Remove Image From Uploads Folder
        let deletData = await Admin.findByIdAndDelete(req.params.id);
        if (deletData) {
          console.log("Record & Image Deleted Succesfully");
          return res.redirect("back");
        } else {
          console.log("Record Deleted Succesfully");
          return res.redirect("back");
        }
      } else {
        let deletData = await Admin.findByIdAndDelete(req.params.id);
        if (deletData) {
          console.log("Admin Data Deleted Successfully");
          return res.redirect("back");
        } else {
          console.log("Admin Record Delet");
          return res.redirect("back");
        }
      }
    } else {
      console.log("No Record Found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};
