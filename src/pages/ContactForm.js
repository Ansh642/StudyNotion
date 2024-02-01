import React, { useEffect } from 'react'
import countryCode from '../data/countrycode.json'
import { useForm } from 'react-hook-form'

export default function ContactForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    // useEffect ( ()=>{
    //     if(isSubmitSuccessful()){
    //         reset({
    //             email:"",
    //             firstName:"",
    //             lastName:"",
    //             phoneNo :"",
    //             message:"",
    //         });
    //     }
    // },[reset,isSubmitSuccessful]);


    const  handler= async(data)=>{
        console.log(data);
    }


  return (
    <form onSubmit={handleSubmit(handler)}>
    <div className='flex flex-col w-[50%] mx-auto mt-10'>

    <p className='text-3xl mx-auto font-semibold'>Get in Touch</p>
    <p className='mx-auto text-richblack-100 mt-2'>We'll love to hear from you. Please fill out this form.</p>

    <div className='flex flex-col mx-auto mt-8 mb-8 gap-6 w-[70%]'>
    
    <div className='flex flex-row gap-3 '>
        <input type="text" name="firstName" {...register("firstName",{required:true})}  placeholder='Enter First Name' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
        {
            errors.firstName && (
                <span className=' text-sm text-richblack-400 '>Please enter Your First Name</span>
            )
        }

        <input type="text" name="lastName"  placeholder='Enter Last Name' {...register("lastName",{required:true})} className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
        {
            errors.firstName && (
                <span className=' text-sm text-richblack-400 '>Please enter Your Last Name</span>
            )
        }

    </div>

    <div className='flex flex-row gap-3'>
        <input type="email" name="email"   placeholder='Enter Your Email' {...register("email",{required:true})} className='pl-2 px-1 py-2 bg-richblack-800 w-full rounded-md border-none'/>
        {
            errors.email && (
                <span className=' text-sm text-richblack-400 '>Please enter Your Email</span>
            )
        }
    </div>

    <div className='flex flex-row gap-3'>
    
    <select className=' w-[15%] pl-2 px-1 py-2 bg-richblack-800 rounded-md text-richblack-50 cursor-pointer'>
    {
    countryCode.map( (ele,index) => {
        return (
        <option key={index} selected={ele.code==='+91'}>
            <p>{ele.code} -  {ele.country}</p>
        </option>
        )}
        )
    }
    </select>

    <div>
        <input type="text" name="phoneNo"  placeholder='Enter Your Number' {...register("phoneNo",{required:true,minLength:{value:10 , message : "Please Enter Complete Phone no"}},)} className='pl-2 px-1 py-2 bg-richblack-800 w-[215%] rounded-md border-none'/>
        {
            errors.phoneNo && (
                <span className=' text-sm text-richblack-400 '>Please enter Your phoneNo</span>
            )
        }
    </div>

    </div>
    
    <textarea name="" id="" cols="22" rows="5" {...register("message",{required:true})} className='bg-richblack-800 rounded-xl py-2 px-2' placeholder='Enter Your Message..'/>
    {
        errors.message && (
            <span className=' text-sm text-richblack-400 '>Please enter Your message</span>
        )
    }
    

    <button type='submit' className='bg-yellow-50 px-2 py-2 text-richblack-900 rounded-md'>
        Send Message
    </button>
    
    </div>

    </div>
    </form>
  )
}
