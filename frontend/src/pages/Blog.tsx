import { useParams } from "react-router-dom"
import Appbar from "../components/Appbar"
import Fullblog from "../components/Fullblog"
import { useBlog } from "../hooks"


const Blog = () => {
  const {id} = useParams()
  const { loading, blog } = useBlog({
    id: id || ""
  })
  if (loading || !blog) {
    return (
      <div className = "w-full h-full">
      <Appbar />
      <h1>Loading...</h1>
    </div >
    )
  }
return (
  <div className="w-full h-full">
    <Appbar />
    <Fullblog blog = {blog} />
  </div>
)
}

export default Blog
