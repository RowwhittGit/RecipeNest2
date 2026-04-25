const mongoose = require("mongoose");

const MAX_DEPTH = 3;

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "RNUser", required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    depth: { type: Number, default: 0, min: 0, max: MAX_DEPTH },
    text: { type: String, required: true, trim: true, maxlength: 500 },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Fetch all comments for a recipe sorted by time
CommentSchema.index({ recipeId: 1, createdAt: -1 });
// Fast lookup of replies by parent
CommentSchema.index({ parentComment: 1 });

CommentSchema.statics.MAX_DEPTH = MAX_DEPTH;

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
