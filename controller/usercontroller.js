const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const product = require("../models/product");

module.exports.home = async (req, res) => {
  let catData = await category.find();
  let subcatData = await subcategory.find();
  let extracatData = await extracategory.find();
  let productData = await product.find();
  // console.log(catData);
  console.log(extracatData);
  return res.render("User_pages/dashboard", {
    catData: catData,
    subcatData: subcatData,
    extracatData: extracatData,
    productData: productData,
  });
};
