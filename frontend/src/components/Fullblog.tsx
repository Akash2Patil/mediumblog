import type { Blog } from "../hooks"

const Fullblog = ({blog}:{blog: Blog}) => {
  return (
    <div className="mt-5 px-10 max-w-300 mx-auto">
      <h1 className="text-5xl font-bold capitalize">{blog.title}</h1>
      <h2 className="text-zinc-700 text-sm my-3">posted on date 22/sept/2024</h2>
      <p className="">{blog.content}</p>
    </div>
  )
}

export default Fullblog
