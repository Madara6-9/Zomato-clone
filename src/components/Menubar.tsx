import React,{useEffect} from 'react'
import biriyani from "../images/biriyani.jpg"
import sandwich from "../images/sandwich.jpg"
import cake from "../images/cake.jpg"
import burger from "../images/burger.jpg"
import pizza from "../images/pizza.jpg"
import chicken from "../images/chicken.jpg"

const Menubar = () => {

  return (
    <div className='bg-zinc-100 p-10'>
      <h1 className='text-3xl'>Inspiration for your first order</h1>
      <div className='flex mt-5'>
        <img src={pizza} className='rounded-full w-40 h-40'/>
        <img src={burger} className='rounded-full w-40 h-40 ml-11'/>
        <img src={cake} className='rounded-full w-40 h-40 ml-11'/>
        <img src={biriyani} className='rounded-full w-40 h-40 ml-11'/>
        <img src={sandwich} className='rounded-full w-40 h-40 ml-11'/>
        <img src={chicken} className='rounded-full w-40 h-40 ml-11'/>
      </div>
    </div>
  )
}

export default Menubar
