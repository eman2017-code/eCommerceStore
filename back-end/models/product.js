const mongoose = require("mongoose");
const Category = require("./category.js");

// this schema represents a Products
const productSchema = new mongoose.Schema({
  sku: Number,
  upc: String,
  manufacturer: String,
  model: String,
  type: String,
  image: {
    // stores the path to the image
    type: String,
    default: null
  },
  name: String,
  description: String,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: undefined
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  price: Number,
  salePrice: Number,
  shipping: Number,
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// add category ids to a product document. if there are no categories it is left empty
productSchema.methods.addCategories = function(productData) {
  if (productData.category) {
    productData.category.forEach(async categoryId => {
      const foundCategory = await Category.findById(categoryId);
      foundCategory.products.push(id);
      await foundCategory.save();
    });
  }
};

// returns either the price or sale price of the product depending on if its on sale
productSchema.methods.getProductPrice = function() {
  let price = this.price + this.shipping;
  if (this.isOnSale) {
    price = this.salePrice + this.shipping;
  }
  return price;
};

// updates the products fields except for image and category
productSchema.methods.updateFields = async function(productData) {
  this.name = productData.name;
  this.description = productData.description;
  this.upc = productData.upc;
  this.sku = productData.sku;
  this.price = productData.price;
  this.model = productData.model;
  this.manufacturer = productData.manufacturer;

  await this.save();
};

// parses the products image url to get just the name of the image
productSchema.methods.getImageName = function() {
  const urlArray = this.image.split("/");
  const imageName = urlArray[urlArray.length - 1];
  return imageName;
};

// uploads a product image
productSchema.statics.uploadProductImage = function(imageFile) {
  imageFile.mv(
    `${__dirname}/../public/images/products/${imageFile.name}`,
    function(error) {
      if (error) {
        return res.status(500).send(error);
      }
    }
  );
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
