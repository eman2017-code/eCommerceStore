const mongoose = require("mongoose");

const couponSchema = {
  title: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
};

module.exports = Coupon;
