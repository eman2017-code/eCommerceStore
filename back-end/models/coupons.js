const mongoose = require("mongoose");

const couponSchema = {
  title: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
};

module.exports = Coupon;
