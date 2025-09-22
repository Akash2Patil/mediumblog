import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"

const Blogs = () => {
  const {loading,blogs} = useBlogs()

  if(loading){
    return(
      <>
      <div>
        <Appbar/>
      </div>
      <div className="w-full h-[90vh] flex flex-col items-center mt-3 text-5xl">
        loading...
      </div>
      </>
    )
  }
  return <>
    <Appbar/>
    <div className="w-full flex flex-col items-center mt-3">
      {
        blogs.map(blog =>
          <BlogCard key={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} id={blog.id} publishedDate="20/sep/2025"/>)
        } 
    </div>
    </>
  
}

export default Blogs
