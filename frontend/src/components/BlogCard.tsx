import { Link } from "react-router-dom";

interface BlogcardProps {
  id:string,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;

}
const BlogCard = ({ authorName, title, content, publishedDate,id }: BlogcardProps) => {
  return (
    <div className="mb-4 w-[60%] p-5 border-b-1 border-zinc-500">
      <Link to={`/blog/${id}`}>
      <div className="flex items-center gap-2">
        <Avatar name={authorName}/>
        <h3 className="text-md font-bold text-black">{authorName}</h3>
      </div>
      <div>
        <h1 className="text-xl font-bold text-black capitalize">{title}</h1>
        <p className="font-regular text-zinc-700">{content.slice(0, 150) + "..."}</p>
      </div>
      <div>
        <h3 className="font-thin text-sm mt-1 text-zinc-700">{publishedDate}</h3>
      </div>
    </Link>
    </div>
  )
}
export function Avatar({name}:{name:string}) {
  return (
  <div className="avatar flex justify-center items-center text-white font-bold text-sm rounded-full overflow-hidden bg-zinc-700 w-[30px] h-[30px]">
          {name[0]}
        </div>
  )
}
export default BlogCard
