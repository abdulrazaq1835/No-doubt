import { FiLoader, FiInbox } from "react-icons/fi"
import PostCard from "./PostCard"

const PostList = ({ posts, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="w-6 h-6 text-blue-400 animate-spin" />
        <span className="ml-2 text-sm text-gray-400">Loading posts...</span>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FiInbox className="w-10 h-10 mb-3" />
        <span className="text-sm">No posts found</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </div>
  )
}

export default PostList