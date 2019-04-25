const express = require("express");
const router = express.Router();
const apiFetchRecipes = require("../controllers/api-fetch-recipes");


router.get("/searchapi", apiFetchRecipes.searchRecipes);
router.get("/getapi", apiFetchRecipes.getRecipe);

module.exports = router;
