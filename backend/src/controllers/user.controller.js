const Recipe = require("../models/recipe.model");
const Follow = require("../models/follow.model");
const mongoose = require("mongoose");
const { successResponse } = require("../utils/apiResponse");

const listChefs = async (req, res, next) => {
  try {
    // Aggregate: group published recipes by author, count them, sort descending
    const chefAggregation = await Recipe.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$authorId", recipeCount: { $sum: 1 } } },
      { $sort: { recipeCount: -1 } },
      {
        $lookup: {
          from: "rnusers",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          username: "$user.username",
          biography: "$user.biography",
          profileImage: "$user.profileImage",
          followerCount: "$user.followerCount",
          isProfessional: "$user.isProfessional",
          recipeCount: 1,
        },
      },
    ]);

    // Attach isFollowing for authenticated users
    let followingSet = new Set();
    if (req.user) {
      const following = await Follow.find({
        followerId: req.user.userId,
        status: "accepted",
      }).select("followingId").lean();
      followingSet = new Set(following.map((f) => f.followingId.toString()));
    }

    const chefs = chefAggregation.map((chef) => ({
      ...chef,
      isFollowing: followingSet.has(chef._id.toString()),
    }));

    return successResponse(res, 200, chefs, null, "Chefs list");
  } catch (error) {
    next(error);
  }
};

module.exports = { listChefs };
