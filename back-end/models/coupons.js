const mongoose = require("mongoose");

const couponSchema = {
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    required: true
  },
  freeShipping: {
    type: Boolean,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
};

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
