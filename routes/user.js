const express = require("express");
const router = express.Router();
const userPageController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

router.get("/user", isAuth, userPageController.getUserPage);

module.exports = router;
