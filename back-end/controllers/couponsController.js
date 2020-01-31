const express = require("express");
const Coupons = require("../models/coupons.js");
const loginRequired = require("../middleware/users/loginRequired.js");
const router = express.Router();

module.exports = router;
