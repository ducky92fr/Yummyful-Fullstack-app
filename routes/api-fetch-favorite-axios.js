const express = require("express");
const router = express.Router();
const apiFetchFavorite = require("../controllers/api-favorite");


router.post("/favorite/addremove", apiFetchFavorite.createFavorite);

module.exports = router;
