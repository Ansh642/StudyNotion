import React from 'react'
import Footer from '../components/Footer'
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import countryCode from '../data/countrycode.json'
import { IoIosCall } from "react-icons/io";
import { FaGlobeAfrica } from "react-icons/fa";


export default function ContactUs() {
  return (
    <div className='bg-richblack-900 w-full text-white'>

     <div className='w-[90%] flex flex-row  mt-7 justify-evenly items-center'>

        <div className='flex flex-col justify-around bg-richblack-800 w-[25%] h-[350px] mb-48 rounded-2xl ml-20'>

            <div className='flex flex-row gap-1 text-white  ml-6'>
            <HiOutlineChatBubbleLeftEllipsis className='mt-1 mr-1'/>

                <div className='flex flex-col gap-[0.5px]'>
                <p className='text-white font-inter'> Chat on Us</p>
                <p className='text-richblack-500 text-sm'>Our friendly team is here to help</p>
                <p className='text-richblack-500 text-sm'>@email-address</p>
                </div>

            </div>

            <div className='flex flex-row gap-1 text-white mt-6 ml-6'>
            <FaGlobeAfrica className='mt-1 mr-1'/> 

                <div className='flex flex-col gap-[0.5px]'>
                <p className='text-white font-inter'>Visit Us</p>
                <p className='text-richblack-500 text-sm'>Come and say hello at our office</p>
                <p className='text-richblack-500 text-sm'>Sector 32,Gurgaon</p>
                </div>

            </div>

            <div className='flex flex-row gap-1 text-white mt-6 ml-6'>
            <IoIosCall className='mt-1 mr-1' />

                <div className='flex flex-col gap-[0.5px]'>
                <p className='text-white font-inter'>Call Us</p>
                <p className='text-richblack-500 text-sm'>Mon-Fri 8am to 5pm.</p>
                <p className='text-richblack-500 text-sm'>+91-8171579897</p>
                </div>

            </div>
            
        </div>


        <div className=' bg-richblack-900 w-[45%] h-[580px] rounded-2xl border-[1px] border-richblack-400'>
            {/* Contact Us form */}
            <div className='w-[90%] h-[90%] mx-auto flex flex-col py-2 px-5 mt-5'>

              <p className='text-3xl font-semibold w-full'>Got an Idea? We've got the skills. Let's Team Up.</p>
              <p className='text-sm mt-2 text-richblack-500'>Tell us more about yourself and what have you got in mind</p>

              
            <div className='flex flex-row gap-3 mt-8'>
                <input type="text" name="firstName"  placeholder='Enter First Name' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
                <input type="text" name="lastName"  placeholder='Enter Last Name' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
            </div>

            <div className='flex flex-row gap-3 mt-5'>
               <input type="email" name="email" placeholder='Enter Your Email' className='pl-2 px-1 py-2 bg-richblack-800 w-full rounded-md border-none'/>
            </div>


            <div className='flex flex-row gap-3 mt-5 w-full'>
            
            <select className=' w-[25%] pl-2 px-1 py-2 bg-richblack-800 rounded-md text-richblack-50 cursor-pointer'>
            {
            countryCode.map( (ele,index) => {
            return (
                <option key={index} selected={ele.code=='+91'}>
                <p>{ele.code} - {ele.country}</p>
                </option>
            )}
            )}
            </select>

            <div>
            <input type="text" name="phoneNo"  placeholder='Enter Your Number' className='pl-2 px-1 py-2 bg-richblack-800 w-[380px] rounded-md border-none'/>
            </div>

            </div>


           <textarea name="" id="" cols="22" rows="4"  className='bg-richblack-800 mt-7 rounded-xl py-2 px-2' placeholder='Enter Your Message..'/>


           <button className='bg-yellow-50 px-2 mt-8 py-2 text-richblack-900 rounded-md'>
            Send Message
          </button>
          

          </div>

        </div>

     </div>

     <Footer/>
    </div>
  )
}



