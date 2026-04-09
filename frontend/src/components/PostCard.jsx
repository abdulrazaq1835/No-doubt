import { useNavigate } from "react-router-dom"
import { FiUser, FiHash, FiFileText } from "react-icons/fi"

const PostCard = ({ post }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/post/${post.postId}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-500 px-3 py-1 rounded-full">
          <FiUser className="w-3 h-3" />
          User {post.userId}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <FiHash className="w-3 h-3" />
          {post.postId}
        </span>
      </div>
      <h3 className="flex items-start gap-2 text-sm font-semibold text-gray-800 capitalize mb-2 line-clamp-2">
        <FiFileText className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
        {post.title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 pl-6">
        {post.body}
      </p>
    </div>
  )
}

export default PostCard