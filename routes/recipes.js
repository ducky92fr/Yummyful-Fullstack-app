const express = require("express");
const router = express.Router();
const apiFetchRecipes = require("../controllers/api-fetch-recipes");

router.get("/recipes/search", apiFetchRecipes.searchRecipes);

module.exports = router;
