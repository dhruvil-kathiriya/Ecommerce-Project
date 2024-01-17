const subcategorys = require("../models/subcategory");
const category = require("../models/category");
const subcategory = require("../models/subcategory");

module.exports.add_subcategory = async (req, res) => {
  let catData = await category.find({});
  return res.render("Admin_pages/Add_subcategory", { catData: catData });
};

module.exports.insert_subcategory = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let subcatData11 = await subcategorys.create(req.body);
    if (subcatData11) {
      console.log("Subcategory Added Successfully");
      return res.redirect("back");
    } else {
      console.log("Subcategory is Not Added");
      return res.redirect("back");
    }
  } catch (error) {
    if (error) {
      console.log(error, "Something went Wrong");
    }
  }
};

module.exports.view_subcategory = async (req, res) => {
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
    const perPage = 4;
    let subcatData = await subcategory
      .find({
        $or: [
          { subcategory_name: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      })
      .limit(perPage)
      .skip(perPage * page)
      .populate("categoryId")
      .exec(); // Join Tables
    let totalsubcatData = await subcategory
      .find({
        $or: [
          { subcategory_name: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      })
      .countDocuments();
    // console.log(subcatData);
    return res.render("Admin_pages/View_subcategory", {
      subcatData: subcatData,
      searchValue: search,
      totalDocument: Math.ceil(totalsubcatData / perPage),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.isActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await subcategory.findByIdAndUpdate(req.params.id, {
        isActive: false,
      });
      if (active) {
        console.log("Subcategory Deactived Successfully");
        return res.redirect("back");
      } else {
        console.log("Subcategory is not Deactived");
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

module.exports.deActive = async (req, res) => {
  try {
    if (req.params.id) {
      let active = await subcategory.findByIdAndUpdate(req.params.id, {
        isActive: true,
      });
      if (active) {
        console.log("Subcategory actived Successfully");
        return res.redirect("back");
      } else {
        console.log("Subcategory is not Activated");
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

module.exports.deletesubcategory = async (req, res) => {
  try {
    let deletData = await subcategory.findByIdAndDelete(req.params.id);
    if (deletData) {
      console.log("Subcategory Deleted Successfully");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.updatesubcategory = async (req, res) => {
  try {
    let catData = await category.find({});
    let subcatData = await subcategory.findById(req.params.id);
    return res.render("Admin_pages/Update_subcategory", {
      catData: catData,
      subcatData: subcatData,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.editsubcategory = async (req, res) => {
  try {
    if (req.params.id) {
      let updateData = await subcategory.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (updateData) {
        console.log("Subcategory Updated Successfully");
        return res.redirect("/admin/subcategory/view_subcategory");
      } else {
        console.log("Subcategory is not Updated");
        return res.redirect("back");
      }
    } else {
      console.log("Id not Found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};
