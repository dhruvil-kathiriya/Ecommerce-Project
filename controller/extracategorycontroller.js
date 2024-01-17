const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");

module.exports.add_extracategory = async (req, res) => {
  let catData = await category.find({});
  let subcatData = await subcategory.find({});
  return res.render("Admin_pages/Add_extracategory", {
    catData: catData,
    subcatData: subcatData,
  });
};

module.exports.insert_extracategory = async (req, res) => {
  try {
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let extracatData = await extracategory.create(req.body);
    if (extracatData) {
      console.log("Extracategory Added Successfully");
      return res.redirect("back");
    } else {
      console.log("Extracategory is Not Added");
      return res.redirect("back");
    }
  } catch (error) {
    if (error) {
      console.log(error, "Something went Wrong");
    }
  }
};

module.exports.view_extracategory = async (req, res) => {
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
    let extracategoryData = await extracategory
      .find({
        $or: [
          {
            extracategory_name: { $regex: ".*" + search + ".*", $options: "i" },
          },
        ],
      })
      .limit(perPage)
      .skip(perPage * page)
      .populate("subcategoryId")
      .populate("categoryId")
      .exec(); // To Join Multiple Tables
    let totalextracatData = await extracategory
      .find({
        $or: [
          {
            extracategory_name: { $regex: ".*" + search + ".*", $options: "i" },
          },
        ],
      })
      .countDocuments();
    // console.log(extracategoryData);
    return res.render("Admin_pages/View_extracategory", {
      extracatData: extracategoryData,
      searchValue: search,
      totalDocument: Math.ceil(totalextracatData / perPage),
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
      let active = await extracategory.findByIdAndUpdate(req.params.id, {
        isActive: false,
      });
      if (active) {
        console.log("Extracategory Deactived Successfully");
        return res.redirect("back");
      } else {
        console.log("Extracategory is not Deactived");
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
      let active = await extracategory.findByIdAndUpdate(req.params.id, {
        isActive: true,
      });
      if (active) {
        console.log("Extracategory actived Successfully");
        return res.redirect("back");
      } else {
        console.log("Extracategory is not Activated");
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

module.exports.deleteextracategory = async (req, res) => {
  try {
    let deletData = await extracategory.findByIdAndDelete(req.params.id);
    if (deletData) {
      console.log("Extracategory Deleted Successfully");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.updateextracategory = async (req, res) => {
  try {
    let extracatData = await extracategory.findById(req.params.id);
    return res.render("Admin_pages/Update_extracategory", {
      extracatData: extracatData,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

module.exports.editextracategory = async (req, res) => {
  try {
    if (req.params.id) {
      let updateData = await extracategory.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (updateData) {
        console.log("extracategory Updated Successfully");
        return res.redirect("/admin/extracategory/view_extracategory");
      } else {
        console.log("extracategory is not Updated");
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

module.exports.getsubcategoryData = async (req, res) => {
  try {
    // console.log(req.body);
    let subcatData = await subcategory.find({
      categoryId: req.body.categoryId,
    });
    // console.log(subcatData);
    let optionData = "<option value=''>-- Select Subcategory --</option>";
    subcatData.map((v, i) => {
      optionData += `<option value='${v.id}'>${v.subcategory_name}</option>`;
    });
    return res.json(optionData);
  } catch (err) {
    console.log(err);
  }
};
