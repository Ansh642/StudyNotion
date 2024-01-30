import {React ,useState}from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ChangePass() {

  const navigate= useNavigate();
  const location = useLocation();

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  async function handler(e){

    e.preventDefault();
    const token= location.pathname.split("/").at(-1);
    console.log(token);

    try{
     const { data } = await axios.post("/api/v1/auth/reset-password",{
        password,
        confirmPassword,
        token
     });

     if(data.success)
     {
        toast.success("Password reset successfully. Login again with new password");
        navigate("/login");
     }

     else{
        toast.error("An error occurred while resetting the password");
     }

    }
    catch(err){
        console.log(err.message);
        toast.error(err.message);
    }
  }

   return (
    <div className='flex flex-col justify-center h-screen items-center mx-auto '>
    <div className='flex flex-col gap-2 mb-14 mx-auto'>
        <p className='font-inter text-3xl text-white font-semibold'>Choose New Password</p>
        <p className='text-base text-richblack-400 w-[80%]'>Almost done. Enter your new password and you are done.</p>
        
        <div className='flex flex-col gap-1'>
        <p className='text-sm mt-3 text-richblack-100'>Confirm New Password</p>
        <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter Your New Password' className='pl-2 px-2 text-white py-2 bg-richblack-800 rounded-lg border-none w-[80%]'/>
        </div>

        <div className='flex flex-col gap-1'>
        <p className='text-sm mt-3 text-richblack-100'>New Password</p>
        <input type="password" name="password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}  placeholder='Enter Your New Password Again' className='pl-2 px-2 text-white py-2 bg-richblack-800 rounded-lg border-none w-[80%]'/>
        </div>

        <button className='bg-yellow-50 px-2 py-2 rounded-xl mt-5 w-[80%] hover:bg-yellow-100' onClick={handler}>
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





