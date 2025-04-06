import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
