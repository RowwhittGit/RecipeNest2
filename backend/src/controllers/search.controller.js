const Recipe = require("../models/recipe.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");
const { successResponse } = require("../utils/apiResponse");

const SEARCH_LIMIT = 10;

const search = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return successResponse(res, 200, { recipes: [], users: [] }, null, "Search results");
    }

    const [recipes, users] = await Promise.all([
      Recipe.find(
        { status: "published", $text: { $search: q } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(SEARCH_LIMIT)
        .select("title slug description mainImage cuisineType difficulty cookTime likeCount authorId")
        .populate("authorId", "firstName lastName username")
        .lean(),

      User.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(SEARCH_LIMIT)
        .select("firstName lastName username isProfessional profileImage followerCount")
        .lean(),
    ]);

    return successResponse(res, 200, { recipes, users }, null, "Search results");
  } catch (error) {
    next(error);
  }
};

const listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat, children: [] };
    });

    const tree = [];
    categories.forEach((cat) => {
      if (cat.parentId && categoryMap[cat.parentId]) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        tree.push(categoryMap[cat._id]);
      }
    });

    return successResponse(res, 200, tree, null, "Category tree");
  } catch (error) {
    next(error);
  }
};

module.exports = { search, listCategories };
