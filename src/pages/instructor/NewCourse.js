import {React,useEffect,useState} from 'react'
import { BsLightningFill } from "react-icons/bs";
import Steps from './Steps';


export default function NewCourse() {
    
  return (
    <div className='w-11/12 flex gap-4 justify-center '>

        {/* form div */}
        <div className='w-[60%]  h-72 flex flex-col gap-2 '>
            <p className='text-3xl text-white mt-4'>Add New Course</p>

            <Steps/>

            {/* Form div */}
            <div className=' bg-richblack-800 h-96 flex flex-col gap-3 mt-4'>

            </div>

        </div>


        {/* box div */}
        <div className='w-[24%] rounded-lg bg-richblack-800 py-4 px-2 mt-6 text-white'>

          <div className='text-xl font-inter flex gap-1'>
            <p className='flex items-center text-yellow-5'><BsLightningFill /></p>
            <p>Course Upload Tips</p>
          </div>

          <div className='text-richblack-100 gap-1'>
            <div className='mt-2'>• Set the Course Price option or make it free.</div>
            <div>• Standard size for the course thumbnail is 1024x576.</div>
            <div>• Video section controls the course overview video.</div>
            <div>• Course Builder is where you create & organize a course.</div>
            <div>• Set the Course Price option or make it free.</div>
            <div>• Standard size for the course thumbnail is 1024x576.</div>
          </div>

        </div>


    </div>
  )
}



