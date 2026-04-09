import express from "express";
import { fetchAndSavePosts, getAllPosts, getSinglePost } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/fetch", fetchAndSavePosts)
router.get("/", getAllPosts)
router.get("/:id", getSinglePost)

export default router