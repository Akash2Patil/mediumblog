import { Link } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
    return (
        <div className='w-full px-[5em] py-5 border-b-1 flex justify-between items-center'>
            <div>
                <Link className='font-bold text-2xl' to={'/'}>Draftly</Link>
            </div>
            <div>
                <div className='flex gap-2 items-center'>        
                    <Button text={"Signin"} to={`/signin`}/>
                    <Button text={"Signup"} to={`/signup`}/>
                    
                </div>
            </div>
        </div>
    )
}
export default Navbar
