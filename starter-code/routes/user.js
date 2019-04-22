const express = require("express");
const router = express.Router();
const userPageController = require("../controllers/user");

router.get("/user", userPageController.getUserPage);
router.get("/logout", userPageController.logoutPage);

module.exports = router;
