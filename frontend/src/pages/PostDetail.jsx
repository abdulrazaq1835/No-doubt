import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiUser, FiHash, FiFileText, FiLoader } from "react-icons/fi"
import { getSinglePost } from "../services/api"

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getSinglePost(id)
        setPost(data)
      } catch (error) {
        console.error("Error loading post:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FiLoader className="w-6 h-6 text-blue-400 animate-spin" />
        <span className="ml-2 text-sm text-gray-400">Loading post...</span>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Post not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Post Detail</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-500 px-3 py-1 rounded-full">
              <FiUser className="w-3 h-3" />
              User {post.userId}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <FiHash className="w-3 h-3" />
              {post.postId}
            </span>
          </div>

          <h2 className="flex items-start gap-2 text-xl font-semibold text-gray-800 capitalize mb-4">
            <FiFileText className="w-5 h-5 mt-1 text-gray-400 shrink-0" />
            {post.title}
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed pl-7">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostDetail