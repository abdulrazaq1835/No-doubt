import axios from "axios";
import Post from "../models/Post.js";

const fetchAndSavePosts = async (req, res) => {
  try {
    const existing = await Post.countDocuments();
    if (existing > 0) {
      return res.json({ message: "Posts already exist in DB", count: existing });
    }
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = data.map((post) => ({
      userId: post.userId,
      postId: post.id,
      title: post.title,
      body: post.body
    }));
    await Post.insertMany(posts);
    res.status(201).json({ message: "Posts fetched and saved", count: posts.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ postId: 1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.id });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const autoSeedPosts = async () => {
  try {
    const existing = await Post.countDocuments();
    if (existing > 0) {
      console.log(`Posts already in DB: ${existing}`);
      return;
    }
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = data.map((post) => ({
      userId: post.userId,
      postId: post.id,
      title: post.title,
      body: post.body
    }));
    await Post.insertMany(posts);
    console.log(`Saved ${posts.length} posts to MongoDB`);
  } catch (error) {
    console.error("Auto seed failed:", error.message);
  }
};

export { fetchAndSavePosts, getAllPosts, getSinglePost, autoSeedPosts };