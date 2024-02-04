import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/context';

export default function Profile() {

  const {auth,setauth} = useContext(AppContext);

  return (

    <div style={{minHeight:"70vh"}} className='text-black'>

      <div className="flex h-screen bg-gray-100">
      <nav className="flex-shrink-0 w-56 text px-4 py-2 bg-richblack-800 border-r border-gray-200">
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
            <Link to="/dashboard/settings" className="text-richblack-200 hover:text-richblack-25 text-lg">Settings</Link>
          </li>

          <li className="mb-2">
            <Link to="" className="text-richblack-200 hover:text-richblack-25 text-lg">Log Out</Link>
          </li>

          
        </ul>
      </nav>

      
    </div>
    </div>
  )
}



