const express = require("express");
const router = express.Router();
const apiFetchRecipes = require("../controllers/api-fetch-recipes");

router.get("/search", apiFetchRecipes.searchRecipes);
router.get("/get", apiFetchRecipes.getRecipe);

module.exports = router;
