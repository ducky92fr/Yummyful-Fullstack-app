const express = require("express");
const router = express.Router();
const homePageControllers = require("../controllers/homepage");

router.get(["/", "/home"], homePageControllers.getHomePage);

module.exports = router;
