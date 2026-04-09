import { useEffect, useState } from "react"
import { FiDatabase, FiRefreshCw } from "react-icons/fi"
import { getAllPosts, fetchAndSavePosts } from "../services/api"
import useWebSocket from "../hooks/useWebSocket"
import SearchBar from "../components/SearchBar"
import PostList from "../components/PostList"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const { results, search, connected } = useWebSocket()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await fetchAndSavePosts()
        const data = await getAllPosts()
        setPosts(data)
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setSearching(false)
    } else {
      setSearching(true)
      search(query)
    }
  }

  const displayedPosts = searching ? results : posts

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiDatabase className="w-5 h-5 text-blue-500" />
            <h1 className="text-lg font-semibold text-gray-800">NoDoubt</h1>
          </div>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <FiRefreshCw className="w-3 h-3" />
            {posts.length} posts loaded
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} connected={connected} />
        <PostList posts={displayedPosts} loading={loading} />
      </div>
    </div>
  )
}

export default Home