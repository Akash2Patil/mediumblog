import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className='border-b-1 border-zinc-500 flex justify-between items-center px-10 py-3'>
        <div className="text-lg font-bold">Medium</div>
        <div>
            <Avatar name="Akash patil"/>
        </div>
    </div>
  )
}

export default Appbar
