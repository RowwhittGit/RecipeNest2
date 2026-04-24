const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const IngredientSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true },
    ingredient: { type: String, required: true },
  },
  { _id: false }
);

const StepSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true },
    instruction: { type: String, required: true },
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "RNUser", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    description: { type: String, default: "" },
    cuisineType: { type: String, default: "" },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    prepTime: { type: Number, default: 0 },
    cookTime: { type: Number, default: 0 },
    ingredients: [IngredientSchema],
    steps: [StepSchema],
    mainImage: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    saveCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    isFlagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

RecipeSchema.index({ authorId: 1 });
RecipeSchema.index({ status: 1 });
RecipeSchema.index({ difficulty: 1 });
RecipeSchema.index({ cuisineType: 1 });
RecipeSchema.index({ cookTime: 1 });
RecipeSchema.index({
  title: "text",
  description: "text",
  "ingredients.ingredient": "text",
});

RecipeSchema.pre("save", function preSave() {
  if (this.isModified("title")) {
    this.slug = `${slugify(this.title)}-${Date.now().toString(36)}`;
  }
});

module.exports = mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
