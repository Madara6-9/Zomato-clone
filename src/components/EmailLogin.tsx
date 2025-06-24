import { signInWithEmailAndPassword } from 'firebase/auth'
import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { auth } from '../firebase/setup'
import mail from "../images/mail.png"
import {toast,ToastContainer} from "react-toastify"

const EmailLogin = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const emailLogin = async() =>{
        try{
           const data = await signInWithEmailAndPassword(auth,email,password)
           auth.currentUser?.emailVerified && toast.success("LoggedIn successfully")
           setTimeout(()=>{
            auth.currentUser?.emailVerified && navigate("/main")
           },1000)
        }catch(err){
            console.error(err)
            toast.error("Something went wrong")
        }
    }
    
  return (
    <>
    <ToastContainer/>
     <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-black bg-opacity-85 transition-opacity"></div>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className='flex'>
                    <h3 className="text-3xl font-semibold leading-6 text-gray-600" id="modal-title">Login</h3>
                    <Link to="/"><h1 className='ml-52'>X</h1></Link>
                    </div>
                    <img src={mail} className='w-24 h-24 mt-5 ml-28'/>
                    <input onChange={(e)=> setEmail(e.target.value)} className="mt-4 outline-none border border-gray-300 text-gray-900 text-lg rounded-lg   block w-full p-2.5" placeholder="Email" required />
                    <input type='password' onChange={(e)=> setPassword(e.target.value)} className="mt-7 outline-none border border-gray-300 text-gray-900 text-lg rounded-lg   block w-full p-2.5" placeholder="Password" required />
                    <button onClick={emailLogin} className="mt-5 bg-rose-500 w-full h-12 tetx-2xl text-white py-2 px-4 rounded">
                        Login with email
                    </button>
                    <hr className='mt-3'/>
                         <h1 className='mt-4 text-lg text-gray-500'>Already have an account?<Link to="/login"><span className='text-rose-500 cursor-pointer'> Log in</span> </Link></h1>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
   
  )
}

export default EmailLogin
