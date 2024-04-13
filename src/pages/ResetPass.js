import {React ,useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';


export default function ResetPass() {

  const navigate= useNavigate();
  const [email, setemail] = useState("");

  const handler =async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post("https://studynotion-2-qsjg.onrender.com/api/v1/auth/reset-password-token",{
        email
      });

      if(data.success)
      {
        navigate("/");
        toast.success("An email has been sent to you for updating password");
      }
      else{
        toast.error("An error has occurred while sending reset password email.");
      }
    }
    catch(err){
      toast.error(err.message);
      console.log(err.message);
    }
  }

  return (
    <div className='flex flex-col justify-center h-screen items-center mx-auto '>
        <div className='flex flex-col gap-3 mb-16 mx-auto'>
            <p className='font-inter text-3xl text-white font-semibold'>Reset Your Password</p>
            <p className='text-base text-richblack-400 w-[80%]'>Enter Your email below to change or reset your password.</p>
            
            <div className='flex flex-col gap-1'>
            <p className='text-sm mt-3 text-richblack-100'>Email Address</p>
            <input type="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter Your Email' className='pl-2 px-2 text-white py-2 bg-richblack-800 rounded-lg border-none w-[80%]'/>
            </div>

            <button className='bg-yellow-50 px-2 py-2 rounded-xl mt-3 w-[80%] hover:bg-yellow-100' onClick={handler}>
                Reset Password
            </button>

        <div className='flex flex-row gap-1 text-white items-center cursor-pointer' onClick={()=>navigate("/login")}>
        <IoIosArrowRoundBack />
         <p className='text-sm text-richblack-25 hover:text-richblack-100'>Back To Login?</p>

         </div>

        </div>
    </div>
  )
}






