import axios from 'axios'
import { useState } from 'react'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import Appbar from '../components/Appbar'

const Published = () => {
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const navigate = useNavigate()

    return (
    <>
    <Appbar/>
    <div className='flex flex-col gap-3 max-w-[800px] mx-auto mt-10'>
      <input className='border-2' type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='Enter the Title' />
      <textarea className='border-2' onChange={(e)=>setDescription(e.target.value)}  placeholder="Write an article..." />
        <button onClick={async()=>{
            const response =  await axios.post(`${BACKEND_URL}/api/v1/blog/create`,{
                    title: title,
                    content: description
                },
                {headers :{
                    Authorization : localStorage.getItem("token")
                }}
            )
            navigate(`/blog/${response.data.id}`)
        }} className='bg-green-500 p-3 rounded-full' type="submit">
            Published post
        </button>
    </div>
      </>
  )
}

export default Published
