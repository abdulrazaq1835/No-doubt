import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PostDetail from "./pages/PostDetail.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App