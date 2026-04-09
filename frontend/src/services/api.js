import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001"

const api = axios.create({
  baseURL: BASE_URL
})

export const fetchAndSavePosts = async () => {
  const res = await api.post("/api/posts/fetch")
  return res.data
}

export const getAllPosts = async () => {
  const res = await api.get("/api/posts")
  return res.data
}

export const getSinglePost = async (id) => {
  const res = await api.get(`/api/posts/${id}`)
  return res.data
}