import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className='border-b-1 border-zinc-500 flex justify-between items-center px-10 py-3'>
      <Link to='/blogs' className="text-lg font-bold">Medium</Link>
      <div className="flex items-center gap-2">
        <Link to="/published" className="bg-zinc-500 p-3  text-white rounded-full">Write a Blog</Link>
        <Avatar name="Akash patil" />
      </div>
    </div>
  )
}

export default Appbar
