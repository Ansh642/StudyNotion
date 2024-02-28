import React, { useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Profile';

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
      <div className="flex h-screen bg-gray-100 relative">

      {/* SideBar */}
      <nav className={`flex-shrink-0 w-56 text px-4 py-2 bg-richblack-800 border-r border-gray-200 ${show===true ? "opacity-20" : ""}`}>
        {/* Sidebar content */}
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
            <Link to="/dashboard/user-settings" className="text-richblack-200 hover:text-richblack-25 text-lg">Settings</Link>
          </li>

          <li className="mb-2">
            <Link to="" className="text-richblack-200 hover:text-richblack-25 text-lg" onClick={()=>setshow(true)}>Log Out</Link>
          </li>

          
        </ul>
      </nav>

      {/* My Profile Section */}
      <div className={`flex ml-32 w-[60%] flex-col gap-5 py-4 px-5 place-items-start ${show===true ? `opacity-20` : ``}`}>
        <p className='text-3xl text-richblack-25'>My Profile</p>

        <div className='w-full h-36 py-3 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-row text-richblack-5 gap-4 px-3'>

           <div className='flex flex-row items-center'>
           <img src={auth.user.image} alt="" className="rounded-full h-16 w-16 object-contain"/>
           </div>

           <div className='flex flex-col'>
              <p className='font-semibold text-lg'>{auth.user.firstName} {auth.user.lastName}</p>
              <p className='text-richblack-500 '>{auth.user.email}</p>
           </div>

           <div className='ml-[450px]'>
           <button className='bg-yellow-50 rounded-lg px-5 py-2 border-b-[1px] border-white text-black font-semibold' onClick={()=>navigate("/")}> ✍️ Edit</button>
           </div>

          </div>
          

        </div>

        <div className='w-full h-56 py-3 mt-4 rounded-xl bg-richblack-800 px-4 flex flex-row items-center'>

          <div className='flex flex-col text-richblack-5 gap-4 px-3'>

            <div className='flex flex-row items-center'>
              <p className='text-xl font-inter font-semibold'>Personal Details</p>
              <div className='ml-[540px]'>
               <button className='bg-yellow-50 rounded-lg px-5 py-2 border-b-[1px] border-white text-black font-semibold' onClick={()=>navigate("/")}> ✍️ Edit</button>
              </div>
            </div>

            <div className='flex flex-row items-center justify-start'>
              <div className='flex flex-col gap-1'>
                <p className='text-richblack-500'>First Name</p>
                <p>{auth.user.firstName}</p>
              </div>

              <div className='flex flex-col gap-1 ml-44'>
                <p className='text-richblack-500'>Last Name</p>
                <p>{auth.user.lastName}</p>
              </div>
            </div>

            <div className='flex flex-row items-center justify-start'>
              <div className='flex flex-col gap-1'>
                <p className='text-richblack-500'>E-mail</p>
                <p>{auth.user.email}</p>
              </div>

              <div className='flex flex-col gap-1 ml-28'>
                <p className='text-richblack-500'>Phone Number</p>
                <p>8171579897</p>
              </div>
            </div>


          </div>
          
        </div>

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

