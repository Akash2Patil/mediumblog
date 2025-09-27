import { Link } from "react-router-dom"
interface Buttonprops {
    text:string,
    to:string
}

const Button = ({text , to}: Buttonprops) => {
  return (
    <Link to={to} className="duration-300 w-fit ease-in bg-black font-semibold text-white rounded-full py-2 px-5 cursor-pointer hover:bg-transparent hover:text-black border-1">
      {text}
    </Link>
  )
}

export default Button
