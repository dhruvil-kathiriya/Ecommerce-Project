const category = require("../models/category");
const subcategory = require("../models/subcategory");
const extracategory = require("../models/extracategory");
const brand = require("../models/brand");
const type = require("../models/type");
const product = require("../models/product");

module.exports.add_product = async (req, res) => {
    let catData = await category.find({});
    let subcatData = await subcategory.find({});
    let extracatData = await extracategory.find({});
    let brandData = await brand.find({});
    let typeData = await type.find({});
    return res.render("Admin_pages/Add_product", {
        catData: catData,
        subcatData: subcatData,
        extracatData: extracatData,
        brandData: brandData,
        typeData: typeData
    });
}


module.exports.insert_product = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.created_date = new Date().toLocaleString();
        req.body.updated_date = new Date().toLocaleString();
        let imagePath = ""
        if (req.file) {
            imagePath = product.imageAdminPath + "/" + req.file.filename;
        }
        req.body.product_image = imagePath;
        let addData = await product.create(req.body);
        if (productData) {
            console.log("Product Added Successfully");
            return res.redirect("back");
        }
        else {
            console.log("Product is Not Added");
            return res.redirect("back");
        }
    } catch (error) {
        if (error) {
            console.log(error, "Something went Wrong");
        }
    }
}

module.exports.view_product = async (req, res) => {
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
        let productData = await product.find({
            $or: [
                { "product_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(["subcategoryId", "categoryId", "extracategoryId", "brandId", "typeId"]).exec();
        let totalproductData = await product.find({
            $or: [
                { "product_name": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        console.log(productData);
        return res.render('Admin_pages/View_product', {
            productData: productData,
            searchValue: search,
            totalDocument: Math.ceil(totalproductData / perPage),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
}

module.exports.isActive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await product.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Product Deactived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Product is not Deactived");
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
            let active = await product.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Product actived Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Product is not Deactived");
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

module.exports.deleteproduct = async (req, res) => {
    try {
        let oldData = await product.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.admin_image;
            if (oldImage) {
                let fullPath = path.join(__dirname, '..', oldData.admin_image);
                await fs.unlinkSync(fullPath); // To Remove Image From Uploads Folder
                let deletData = await product.findByIdAndDelete(req.params.id);
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
                let deletData = await product.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Product Data Deleted Successfully");
                    return res.redirect('back');
                }
                else {
                    console.log("Product Record Delet");
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

module.exports.getBrandType = async (req, res) => {
    try {
        // console.log(req.body);
        let brandData = await brand.find({
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            extracategoryId: req.body.extracategoryId,
        });
        let typeData = await type.find({
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            extracategoryId: req.body.extracategoryId,
        });
        return res.render("Admin_pages/ajaxBrandType", {
            brandData: brandData,
            typeData: typeData,
        });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};