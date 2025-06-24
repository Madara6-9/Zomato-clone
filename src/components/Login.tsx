import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import search from "../images/search.png"
import email from "../images/email.png"
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'
import {Link, useNavigate} from "react-router-dom"
import {toast,ToastContainer} from "react-toastify"

const Login = () => {

    const navigate = useNavigate()

    const [phone, setPhone] = useState("")
    const [user,setUser] = useState<any>(null)
    const [otp,setOtp] = useState("")

    const sendOtp = async() =>{
        try{
            const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{})
            const confirmation = await signInWithPhoneNumber(auth,phone,recaptcha)
            setUser(confirmation)
        }catch(err){
            console.error(err)
        }
    }

    const verifyOtp = async() =>{
        try{
            await user.confirm(otp)
            auth.currentUser?.phoneNumber && toast.success("LoggedIn successfully")
            auth.currentUser?.phoneNumber && navigate("/main")
        }catch(err){
            console.error(err)
            toast.error("Something went wrong")
        }
    }

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
                            <Link to="/"><h1 className='ml-60'>X</h1></Link>
                            </div>        
                                    <div className='mt-12'>
                                        <PhoneInput
                                            country={'us'}
                                            value={phone}
                                            onChange={(phone) => setPhone("+" + phone)}
                                            inputStyle={{width:"335px",height:"50px"}}
                                            placeholder='Phone'
                                            buttonStyle={{backgroundColor:"white"}}
                                        />
                                    </div>
                                    <button onClick={sendOtp} className="mt-5 bg-rose-500 w-full h-12 text-white py-2 px-4 rounded">
                                        Send One Time Password
                                    </button>
                                    <div className='mt-2' id='recaptcha'></div>
                                    {phone && <input onChange={(e)=> setOtp(e.target.value)}  className="mt-3 outline-none border border-gray-300 text-gray-900 text-sm rounded-sm   block w-full p-2.5" placeholder="Enter OTP" required/>}
                                    {otp && <button onClick={verifyOtp} className="mt-5 bg-rose-500 w-80 h-12 text-white py-2 px-4 rounded">
                                        Verify One Time Password
                                    </button>}
                                    {!phone &&<div>
                                    <h1 className='text-center'>or</h1>
                                <Link to="/emailLogin"><div className='flex items-center text-center border border-spacing-1 rounded-lg p-3'>
                                    <img src={email} className='w-7 h-7 ml-12'/>
                                    <button className='ml-5'>Continue with Mail</button>
                                 </div>
                                 </Link>
                                 <div onClick={googleSignin} className='cursor-pointer mt-5 flex items-center text-center border border-spacing-1 rounded-lg p-3'>
                                    <img src={search} className='w-7 h-7 ml-12'/>
                                    <button className='ml-5'>Continue with Google</button>
                                 </div>
                                    </div>  }  
                                 <hr className='mt-4'/>
                                 <h1 className='text-base mt-5'>New to Zomato-clone? <Link to="/signup"><span className='text-red-500'>Create account</span></Link></h1>
                                </div>
                    
                    </div>
                </div>
            </div>
        </div>
        </>
       
    )
}

export default Login
