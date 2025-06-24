import React, { useState } from 'react'
import search from "../images/search.png"
import food from "../images/food.jpg"
import { signInWithPopup,createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const googleSignin = async() =>{
        try{
            await signInWithPopup(auth,googleProvider)
            auth.currentUser?.email && toast.success("LoggedIn successfully")
            setTimeout(()=>{
                auth.currentUser?.email && navigate("/main")
            },1000)
        }catch(err){
            console.error(err)
            toast.error("Something went wrong")
        }
    }
    
    const emailSignup = async() =>{
        try{
            await createUserWithEmailAndPassword(auth,email,password)
            onAuthStateChanged(auth,async(user:any)=>{
                await sendEmailVerification(user)
                toast.success("A link has been send to your email. Please verify the email ID by clicking the link")
            })
        }catch(err){
            console.error(err)
            toast.error("Something went wrong")
        }
    }



    return (
        <>
        <ToastContainer/>
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,7)),url(${food})`}}></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className='flex'>
                            <h3 className="text-3xl font-semibold leading-6 text-gray-600" id="modal-title">Sign up</h3>
                            <Link to="/"><h1 className='ml-52'>X</h1></Link>
                            </div>
                            <input onChange={(e)=> setEmail(e.target.value)} className="mt-12 outline-none border border-gray-300 text-gray-900 text-lg rounded-lg   block w-full p-2.5" placeholder="Email" required />
                            <input type='password' onChange={(e)=> setPassword(e.target.value)} className="mt-7 outline-none border border-gray-300 text-gray-900 text-lg rounded-lg   block w-full p-2.5" placeholder="Password" required />
                            <button onClick={emailSignup} className="mt-5 bg-rose-500 w-full h-12 tetx-2xl text-white py-2 px-4 rounded">
                                Create account
                            </button>
                            <h1 className='text-center'>or</h1>
                            <div onClick={googleSignin} className='cursor-pointer mt-5 flex items-center text-center border border-spacing-2 border-gray-300 rounded-lg p-3'>
                                    <img src={search} className='w-7 h-7 ml-12'/>
                                    <button  className='ml-5 text-gray-500 text-lg'>Continue with Google</button>
                                 </div>
                                 <h1 className='mt-4 text-lg text-gray-500'>Already have an account?<Link to="/login"><span className='text-rose-500 cursor-pointer'> Log in</span> </Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      
    )
}

export default Signup
