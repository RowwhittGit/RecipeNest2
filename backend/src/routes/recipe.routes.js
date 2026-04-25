const express = require("express");
const controller = require("../controllers/recipe.controller");
const verifyToken = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");
const { recipeImageUpload } = require("../middleware/upload");

const router = express.Router();

// Public (anyone can see the teaser feed)
router.get("/", optionalAuth, controller.listRecipes);
router.get("/feed", optionalAuth, controller.getPersonalizedFeed);
router.get("/user/:userId", optionalAuth, controller.getRecipesByUser);

// Authenticated — Must be logged in to view full details or share
router.get("/:recipeId", verifyToken, controller.getRecipeById);
router.post("/:recipeId/share", verifyToken, controller.shareRecipe);

// Authenticated — any user can post
router.get("/my/all", verifyToken, controller.myRecipes);
router.get("/my/:recipeId", verifyToken, controller.getMyRecipeById);
router.post("/", verifyToken, controller.createRecipe);
router.put("/:recipeId", verifyToken, controller.updateRecipe);
router.delete("/:recipeId", verifyToken, controller.deleteRecipe);

// Image upload — returns URL to use in create/update recipe body
router.post("/images/upload", verifyToken, recipeImageUpload, controller.uploadRecipeImage);

module.exports = router;
