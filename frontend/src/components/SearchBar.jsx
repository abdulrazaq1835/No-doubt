import { useState } from "react"
import { FiSearch, FiWifi, FiWifiOff } from "react-icons/fi"

const SearchBar = ({ onSearch, connected }) => {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    onSearch(val)
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <FiSearch className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search posts..."
          className="w-full pl-11 pr-24 py-3 rounded-xl border border-gray-200 shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm"
        />
        <span className="absolute right-4 top-3 flex items-center gap-1 text-xs">
          {connected
            ? <><FiWifi className="w-3 h-3 text-green-500" /><span className="text-green-500">Live</span></>
            : <><FiWifiOff className="w-3 h-3 text-red-400" /><span className="text-red-400">Offline</span></>
          }
        </span>
      </div>
    </div>
  )
}

export default SearchBar