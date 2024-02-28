import React, { useContext } from 'react'
import LoginImg from '../assets/Images/login.webp'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/Profile';
import {toast} from 'react-toastify'

export default function Login() {

  const [user, setuser] = useState('student');
  const navigate = useNavigate()
  const {auth,setauth} = useContext(AppContext);

  const [formData, setFormData] = useState({
    email : "",
    password : "",
  });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  
  async function handleOnSubmit(e){
    e.preventDefault();
    try{
      const { data } = await axios.post ('/api/v1/auth/login',{
        email,
        password
      });

      if(data.success)
      {
        setauth({
          ...auth,
          user : data.userDetails,
          token: data.token
        })
        toast.success("Welcome Back!");
        navigate('/');
        localStorage.setItem('auth', JSON.stringify(data));
      }
      else{
        toast.error("Failed to login");
      }
    }
    catch(err){
      toast.error(err.message);
      console.log(err.message);
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className='flex flex-row gap-5 mt-32 items-center w-11/12 justify-center bg-richblack-900 text-white mb-28'>

      <div className='flex flex-col gap-7 w-[50%] ml-24'>

        <div className='flex flex-col gap-4'>
        <p className='text-3xl font-semibold'>Welcome Back</p>
        <p className='text-richblack-400 w-[70%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <span className='text-blue-200'>Accusantium accusamus atque natus repudiandae.</span></p>
        </div>

        <div className='flex flex-row px-1 py-1 gap-2 items-center justify-evenly w-[27%] rounded-3xl cursor-pointer bg-richblack-800'>

           <p className={`font-normal cursor-pointer ${user === 'student' ? "bg-richblack-900 text-richblack-5" : 
          "text-richblack-100" } hover:bg-richblack-700 text-richblack-5 px-3 py-1 rounded-2xl`} onClick={ () => setuser('student')}>Student</p>
           <p className={`font-normal cursor-pointer ${user === 'instructor' ? "bg-richblack-900 text-richblack-5" : 
          "text-richblack-100" } hover:bg-richblack-700 text-richblack-5 px-3 py-1 rounded-2xl`} onClick={ () => setuser('instructor')}>Instructor</p>
        </div>


        <div className='flex flex-col '>
        
        <div className='flex flex-col gap-1'>
            <span className='text-sm text-richblack-50'>Email Adress</span>
            <input type="email" name="email" value={email} onChange={changeHandler}  placeholder='Enter Your E-mail' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md border-none'/> 
        </div>
            
        <div className='flex flex-col gap-1 mt-6'>
         <span className='text-sm text-richblack-50'>Password</span>
         <input type="password"  name="password" value={password} onChange={changeHandler}   placeholder='Enter Your Password' className='pl-2 px-1 py-2 bg-richblack-800 w-[65%] rounded-md'/>
        </div>
        
        <Link to="/reset-password">
        <p className='text-sm text-blue-200 flex justify-end w-[64%] mt-1 opacity-80 hover:text-blue-100'>Forgot Password?</p>
        </Link>

        <button className='bg-yellow-50 px-2 py-2 mt-7 w-[65%] text-richblack-900 rounded-md' type="submit">
            Log In
        </button>

        </div>
 
      </div>

      <div className=' border-r-8 border-b-8 w-[35%] border-white '>
        <img src={LoginImg} alt="" />
      </div>

    </form>
  )
}



