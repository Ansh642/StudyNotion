import React, { useContext } from 'react'
import LoginImg from '../assets/Images/signup.webp'
import { useState } from 'react';
import countryCode from '../data/countrycode.json'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Profile';

export default function Signup() {
  
  const [accountType, setaccountType] = useState("student");
  const navigate=  useNavigate();
  const {auth,setauth} = useContext(AppContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo:"",
    password: "",
    confirmPassword: "",
  })
       
  const { firstName, lastName, email, phoneNo, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{
    
      const {data} = await axios.post("/api/v1/auth/sendotp",{
        email,
      });

      if(data.success)
      {
        setauth({
          ...auth,
          signup: formData,
          account : accountType,
        });
        toast.success("Otp has been sent successfully to your email");
        navigate("/verify-email");
      }
      else{
        toast.error("Error sending otp");
      }

    }
    catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }
   

  return (

    <form onSubmit={handleOnSubmit}  className='flex flex-row gap-5 mt-24 items-center w-11/12 justify-center bg-richblack-900 text-white mb-28'>

      <div className='flex flex-col gap-7 w-[50%] ml-24'>

        <div className='flex flex-col gap-3'>
        <p className='text-3xl font-semibold'>Welcome Back</p>
        <p className='text-richblack-400 w-[25%]'>Discover Your passions, <span className='text-blue-200'>Be unstoppable</span></p>
        </div>

        <div className='flex flex-row px-1 py-1 gap-2 items-center justify-evenly w-[27%] rounded-3xl cursor-pointer bg-richblack-800'>

           <p className={`font-normal cursor-pointer ${accountType === 'student' ? "bg-richblack-900 text-richblack-5" : 
          "text-richblack-100" } hover:bg-richblack-700 text-richblack-5 px-3 py-1 rounded-2xl`} onClick={ () => setaccountType('student')}>Student</p>
           <p className={`font-normal cursor-pointer ${accountType === 'instructor' ? "bg-richblack-900 text-richblack-5" : 
          "text-richblack-100" } hover:bg-richblack-700 text-richblack-5 px-3 py-1 rounded-2xl`} onClick={ () => setaccountType('instructor')}>Instructor</p>
        </div>

        <div  className='flex flex-col gap-6 w-[70%]'>
          
          <div className='flex flex-row gap-3 '>
            <input type="text" name="firstName" value={firstName} onChange={handleOnChange} placeholder='Enter First Name' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
            <input type="text" name="lastName" value={lastName} onChange={handleOnChange} placeholder='Enter Last Name' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
          </div>

          <div className='flex flex-row gap-3'>
            <input type="email" name="email"  value={email} onChange={handleOnChange} placeholder='Enter Your Email' className='pl-2 px-1 py-2 bg-richblack-800 w-full rounded-md border-none'/>
          </div>

          <div className='flex flex-row gap-3'>
         
          <select className=' w-[25%] pl-2 px-1 py-2 bg-richblack-800 rounded-md text-richblack-50 cursor-pointer'>
          {
          countryCode.map( (ele,index) => {
            return (
              <option key={index} selected={ele.code==='+91'}>
                <p>{ele.code} - {ele.country}</p>
              </option>
            )}
            )}
          </select>

          <div>
            <input type="text" name="phoneNo" value={phoneNo} onChange={handleOnChange} placeholder='Enter Your Number' className='pl-2 px-1 py-2 bg-richblack-800 w-[355px] rounded-md border-none'/>
          </div>

          </div>
          

          <div className='flex flex-row gap-3'>
          <input type="password" name="password" value={password} onChange={handleOnChange} placeholder='Enter Your Password' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleOnChange} placeholder='Confirm Your Password' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/>
          </div>

          <button className='bg-yellow-50 px-2 py-2 text-richblack-900 rounded-md'>
            Create Account
          </button>
          
        </div>
 
      </div>

      <div className=' border-r-8 border-b-8 w-[35%] border-white '>
        <img src={LoginImg} alt="" />
      </div>

    </form>

  )
}



