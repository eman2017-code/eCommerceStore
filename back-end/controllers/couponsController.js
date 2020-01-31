const express = require("express");
const Coupons = require("../models/coupons.js");
const loginRequired = require("../middleware/users/loginRequired.js");
const router = express.Router();

// index route
router.get("/", async (req, res, next) => {
  try {
    const allCoupons = await Coupons.find({});
    res.json({
      data: allCoupons,
      status: {
        code: 200,
        message: "successfully listed all coupons"
      }
    });
  } catch (err) {}
});

// create coupons
router.post("/", loginRequired, async (req, res, next) => {
  // get the data from the form user is filling out
  const couponData = req.body;
  // get the user that is creating the coupon
  const foundUser = req.session;
  try {
  } catch (err) {}
});

module.exports = router;
