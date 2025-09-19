import type { SignupInput } from "@akashnpm/medium-common"
import axios from "axios"
import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

const Auth = ({type}: {type:"signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState <SignupInput>({
        email:"",
        password:""
    })
    const navigate = useNavigate();
     async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blog")
        }
        catch{
            alert("something worng with inputs")
        }
    }
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <h1 className="text-4xl font-bold">{type === "signup" ? "Create an account" : "Please Signin"}</h1>
            <h2 className="text-slate-400 text-lg mt-2">{type === "signup" ? "Already Signup? " : "Don't have an Account "} 
            <Link to={type === "signup" ?'/signin' : '/signup'} className="underline">{type === "signup" ? "Signin" : "Signup"}</Link></h2>

            <div className="w-[45%]">
            <LableInput lable="email" placeholder="email@gmail.com" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    email: e.target.value,
                }))
            }}/>
            <LableInput lable="Password" type={"password"} placeholder="Password" onChange={(e)=>{
                setPostInputs(c=>({
                    ...c,
                    password: e.target.value,
                }))
            }}/>
            <button onClick={sendRequest} type="button" className="text-white my-4 w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">{type === "signup" ? "Sign up" : "Sign In"}</button>

            </div>
        </div>
    )
}
interface LabledInputType{
    lable : string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LableInput({ lable, placeholder, onChange, type }:LabledInputType) {
    return (
        <div className="mt-2">

            <label className="block mb-2 text-sm font-medium text-zinc-900 capitalize w-full">{lable}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className=" border border-zinc-500 p-2 rounded-lg w-full" placeholder={placeholder} required />

        </div>
    )
}

export default Auth
