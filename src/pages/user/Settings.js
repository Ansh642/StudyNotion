import React, { useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/context';

import { toast } from 'react-toastify';

export default function Profile() {

  const {auth,setauth} = useContext(AppContext);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();


  function logoutfunction(e)
  {
    e.preventDefault();

    localStorage.removeItem("auth");
    setauth({
      ...auth,
      user:null,
      token:"",
    });
    toast.success("Logged out successfully");
    navigate("/");
  }


  return (
    <div>
      <div className="flex bg-gray-100 relative">

      {/* SideBar */}
      <nav className={`flex-shrink-0 w-56 text px-4 py-2 bg-richblack-800 border-r border-gray-200 ${show===true ? "opacity-20" : ""}`}>
        
        <h1 className="text-2xl font-bold text-richblack-200">StudyNotion Dashboard</h1>
        <ul className="mt-4">

          <li className="mb-2">
            <Link to="/dashboard/my-profile" className="text-richblack-200 hover:text-richblack-25 text-lg">My Profile</Link>
          </li>

          <li className="mb-2">

            <Link to="/dashboard/enrolled-courses" className="text-richblack-200 hover:text-richblack-25 text-lg">Enrolled Courses</Link>
          </li>

          <li className="mb-2">
            <Link to="/dashboard/all-courses" className="text-richblack-200 hover:text-richblack-25 text-lg">All Courses</Link>
          </li>

          <div className='w-full mx-auto border-[1px] border-richblack-600 mt-3'> </div>

          <li className="mb-2 mt-3">
            <Link to="/dashboard/settings" className="text-richblack-200 hover:text-richblack-25 text-lg">Settings</Link>
          </li>

          <li className="mb-2">
            <Link to="" className="text-richblack-200 hover:text-richblack-25 text-lg" onClick={()=>setshow(true)}>Log Out</Link>
          </li>

          
        </ul>
      </nav>

      {/* My Profile Section */}
      <div className={`flex ml-32 w-[60%] flex-col gap-5 py-4 px-5 place-items-start ${show===true ? `opacity-20` : ``}`}>
        <p className='text-3xl text-richblack-25'>Settings</p>
        
        <div className='w-full h-36 py-3 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-row text-richblack-5 gap-4 px-3'>

           <div className='flex flex-row items-center'>
           <img src={auth.user.image} alt="" className="rounded-full h-16 w-16 object-contain"/>
           </div>

           <div className='flex flex-col'>
              <p className='font-semibold text-lg'>Change Profile Picture</p>
              <div className='flex flex-row gap-5 mt-2'>
                <button className='bg-richblack-700 text-white font-medium rounded-lg px-3 py-1 border-b-[1px] border-white'>Select</button>
                <button className='bg-yellow-50 rounded-lg px-4 py-1 border-b-[1px] text-richblack-900 font-medium border-white'>Upload</button>
            </div>
           </div>

          </div>
          

        </div>

        <div className='w-full h-56 py-3 mt-4 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-col text-richblack-5 gap-4 px-3'>

            <div className='flex flex-row items-center'>
              <p className='text-xl font-inter font-semibold'>Personal Information</p>
            </div>

            <div className='flex flex-row gap-7 w-full'>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>Date of Birth</span>
               <input type="date" name="" id="" className='bg-richblack-700 outline-none rounded-md px-5 py-1 cursor-pointer'/>
              </div>

              <div className='flex flex-col gap-1 w-full'>
              <span className='text-sm text-richblack-200'>Gender</span>
                <select name="" id="" className='bg-richblack-700 outline-none px-4 py-[6.7px] rounded-md cursor-pointer'>
                  <option value="male" > Male</option>
                  <option value="male" > Female</option>
                  <option value="male" > Prefer Not To Say</option>
                </select>
              </div>

            </div>

            <div className='flex flex-row gap-7 w-full'>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>Contact Number</span>
               <input type="text" name="" id="" className='bg-richblack-700 px-5 rounded-md outline-none py-1 w-full' placeholder='Enter Your Contact No.'/>
              </div>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>About</span>
               <input type="text" name="" id="" className='bg-richblack-700 px-5 rounded-md outline-none py-1 w-full' placeholder='Enter about Yourself'/>
              </div>

            
            </div>


          </div>
          
        </div>

        <button className='bg-yellow-50 hover:bg-yellow-100 rounded-lg flex flex-row place-self-end px-4 py-1 border-b-[1px] text-richblack-900 font-medium border-white'>Save</button>

        <div className='w-full h-44 py-3 mt-4 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-col text-richblack-5 gap-4 px-3'>

            <div className='flex flex-row items-center'>
              <p className='text-xl font-inter font-semibold'>Password</p>
            </div>

            <div className='flex flex-row gap-7 w-full'>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>Current Password</span>
               <input type="password" name="" id="" className='bg-richblack-700 px-4 rounded-md outline-none py-1 w-full' placeholder='Enter Your Current Password'/>
              </div>

              <div className='flex flex-col gap-1 w-full'>
               <span className='text-sm text-richblack-200'>New Password</span>
               <input type="password" name="" id="" className='bg-richblack-700 px-4 rounded-md outline-none py-1 w-full' placeholder='Enter your New Password'/>
              </div>

              
            </div>


          </div>
          
        </div>

        <button className='bg-yellow-50 hover:bg-yellow-100 rounded-lg flex flex-row place-self-end px-4 py-1 border-b-[1px] text-richblack-900 font-medium border-white'>Update</button>

        <button className='bg-richblack-700 mb-7 mt-3 hover:scale-105 mx-auto transition-all duration-200 text-white font-semibold rounded-lg px-7 py-2 border-b-[1px] border-white' >Delete My Account ? </button>
        
      </div>

      {/* Log out tab */}
      <div className={`absolute left-[700px] h-44 mt-60 mx-auto w-80 bg-richblack-800 rounded-2xl flex flex-col py-4 px-4 ${show===true  ? `visible transition-all duration-100` : `invisible`}`}>

        <p className='text-richblack-5 text-2xl font-semibold'>Are You Sure ? </p>
        <p className='text-richblack-200 mt-2'>You will be logged out of your account.</p>

        <div className='flex flex-row gap-8 mt-6 w-[90%] mx-auto'>
          <button className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg px-3 py-3 border-b-[1px] border-white' onClick={logoutfunction}>Log Out</button>
          <button className='bg-richblack-700 text-white font-semibold rounded-lg px-5 py-2 border-b-[1px] border-white' onClick={()=>setshow(!show)}>Cancel</button>
        </div>

      </div>

    </div>

    
    </div>
  )
}
