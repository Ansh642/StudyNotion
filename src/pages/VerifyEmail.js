import {React,useState,useRef,useContext} from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Profile'
import {toast} from 'react-toastify'
import axios from 'axios';

export default function VerifyEmail() {

    const [otp, setOtpBlocks] = useState(['', '', '', '', '', '']);
    const {auth,setauth} = useContext(AppContext);
    const navigate = useNavigate();
    
  // Refs for each input block
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    
    const sanitizedInput = value.replace(/\D/g, '');

    setOtpBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks[index] = sanitizedInput.slice(0, 1); // Limit to one digit
      return newBlocks;
    });

    // Move to the next input block
    if (sanitizedInput.length > 0 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    // Handle backspace to remove digits
    if (sanitizedInput.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const email= auth?.signup.email;
  const password= auth.signup.password;
  const confirmPassword= auth.signup.confirmPassword;
  const firstName= auth.signup.firstName;
  const lastName= auth.signup.lastName;
  const phoneNo = auth.signup.phone;
  const accountType = auth.account;


  async function handleSumbit(e){
    e.preventDefault();
    try{
        const {data} = await axios.post("https://studynotion-2-qsjg.onrender.com/api/v1/auth/signup",{
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            accountType,
            phoneNo,
            otp,
        });

        if(data.success){
            toast.success("Signup successful");
            navigate("/login");
            setauth({
                ...auth,
                account :null,
                signup : null,
                
            });
           
        }
        else{
            toast.error("Signup failed");
        }
    }
    catch(err){
        console.log(err.message);
        toast.error("Signup failed");
    }
  }

  return (

    <div className='flex flex-col justify-center h-screen items-center mx-auto '>
        <div className='flex flex-col gap-3 mb-16 mx-auto'>
            <p className='font-inter text-3xl text-white font-semibold'>Verify E-mail</p>
            <p className='text-base text-richblack-400 w-[80%]'>A Verification code has been sent to you. Please enter the code below.</p>
            
            <div className="flex space-x-4 ">
            {otp.map((block, index) => (
                <input
                key={index}
                type="text"
                value={block}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                maxLength="1"
                className="w-10 bg-richblack-700 text-white h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                ref={inputRefs[index]}
                />
            ))}
        </div>

        <button className='bg-yellow-50 px-2 py-2 rounded-xl mt-3 w-[80%] hover:bg-yellow-200' onClick={handleSumbit}>
            Verify And Register
        </button>

        <div className='flex flex-row gap-1 text-white items-center cursor-pointer' onClick={()=>navigate("/login")}>
        <IoIosArrowRoundBack />
         <p className='text-sm text-richblack-25 hover:text-richblack-100'>Back To Login?</p>

         </div>

        </div>
    </div>

  )
}




