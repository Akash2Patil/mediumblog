import Button from '../components/Button'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='w-full h-[90vh] flex justify-between items-center'>
      <div className='flex flex-col gap-5 pl-[5em]'>
        <h2 className='text-8xl font-bold'>Human stories & ideas</h2>
        <p className='text-xl font-normal'>A place to read, write, and deepen your understanding</p>
        <Button text={"Start Reading"} to={`/signup`}/>
      </div>
      <div className='p-3 h-full'>
        <img className='w-full h-full' src="/images/homebanner.webp" alt="" />
      </div>
      </div>
    </>
  )
}

export default Home
