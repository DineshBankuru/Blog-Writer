import dbConnect from "@/utils/dbConnect";
import Post from "@/models/post";

export default async function handler(req, res) {
  await dbConnect(); // Connect to database

  if (req.method === "POST") {
    try {
      const { title, post } = req.body;
      const newPost = new Post({ title: title, content: post });
      await newPost.save();
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
